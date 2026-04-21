import type { LessonExercise, LessonItem } from '../types';
import type { LessonPath } from '../types/lesson-structure';

export const level1LessonPaths: LessonPath[] = [
  {
    "id": "zh-l1-track-alphabet",
    "name": "Alphabet (Pinyin)",
    "nameEn": "Alphabet (Pinyin)",
    "description": "Maitriser les bases du pinyin : voyelles, consonnes et tons.",
    "descriptionEn": "Maitriser les bases du pinyin : voyelles, consonnes et tons.",
    "icon": "🔤",
    "color": "#8b5cf6",
    "lessons": [
      {
        "id": "zh-l1-a01",
        "title": "Pinyin : les voyelles de base",
        "titleEn": "Pinyin : les voyelles de base",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "pronunciation",
        "difficulty": "beginner",
        "tags": [
          "pinyin",
          "prononciation",
          "zh-l1-track-alphabet"
        ],
        "introduction": {
          "title": "Pinyin : les voyelles de base",
          "titleEn": "Pinyin : les voyelles de base",
          "content": "Comprendre et prononcer les voyelles (finales) du pinyin.",
          "contentEn": "Comprendre et prononcer les voyelles (finales) du pinyin.",
          "quickIntro": "Comprendre et prononcer les voyelles (finales) du pinyin.",
          "quickIntroEn": "Comprendre et prononcer les voyelles (finales) du pinyin.",
          "lessonIntro": "Aujourd'hui, tu commences par l'outil numéro 1 pour parler mandarin : le pinyin.\nLe pinyin, ce n’est pas “de l’anglais” : c’est un système pour écrire les sons du chinois avec l’alphabet latin. Si tu sais lire le pinyin, tu peux prononcer un mot nouveau, demander une correction, et t’entraîner à l’oral.\n\nDans cette leçon, on se concentre sur les voyelles (qu’on appelle souvent les finales).\n\n## 1) Les voyelles principales\n- a, o, e\n- i, u, ü\n\nImportant : ü n’est pas “u”. C’est un son différent (comme un “u” français, mais placé comme “i”).\n\n## 2) Les finales fréquentes\nEn mandarin, une syllabe n’est presque jamais une voyelle seule : on combine souvent.\nExemples (sans tons pour l’instant) :\n- ai, ei, ao, ou\n- an, en, ang, eng\n- ia, ie, iao, ian, ing\n- ua, uo, uai, uan, ong\n- üe, üan, ün\n\n## 3) Ce qu’il faut retenir\n- On vise une prononciation claire, pas “parfaite” dès le début.\n- On apprend à reconnaître les sons, puis à les reproduire.\n- À la fin, tu sauras lire et répéter des syllabes simples comme : ma, mi, mu, lü, nai, shan, wang.\n\nObjectif : te donner une base solide pour ensuite ajouter les consonnes et surtout les tons.",
          "lessonIntroEn": "Aujourd'hui, tu commences par l'outil numéro 1 pour parler mandarin : le pinyin.\nLe pinyin, ce n’est pas “de l’anglais” : c’est un système pour écrire les sons du chinois avec l’alphabet latin. Si tu sais lire le pinyin, tu peux prononcer un mot nouveau, demander une correction, et t’entraîner à l’oral.\n\nDans cette leçon, on se concentre sur les voyelles (qu’on appelle souvent les finales).\n\n## 1) Les voyelles principales\n- a, o, e\n- i, u, ü\n\nImportant : ü n’est pas “u”. C’est un son différent (comme un “u” français, mais placé comme “i”).\n\n## 2) Les finales fréquentes\nEn mandarin, une syllabe n’est presque jamais une voyelle seule : on combine souvent.\nExemples (sans tons pour l’instant) :\n- ai, ei, ao, ou\n- an, en, ang, eng\n- ia, ie, iao, ian, ing\n- ua, uo, uai, uan, ong\n- üe, üan, ün\n\n## 3) Ce qu’il faut retenir\n- On vise une prononciation claire, pas “parfaite” dès le début.\n- On apprend à reconnaître les sons, puis à les reproduire.\n- À la fin, tu sauras lire et répéter des syllabes simples comme : ma, mi, mu, lü, nai, shan, wang.\n\nObjectif : te donner une base solide pour ensuite ajouter les consonnes et surtout les tons.",
          "objectives": [
            "En mandarin, une syllabe = (consonne) + voyelle(s) + ton.",
            "Le pinyin est une transcription en lettres latines, mais la prononciation n'est pas celle du français.",
            "ü est un son distinct de u (souvent difficile au début)."
          ],
          "objectivesEn": [
            "En mandarin, une syllabe = (consonne) + voyelle(s) + ton.",
            "Le pinyin est une transcription en lettres latines, mais la prononciation n'est pas celle du français.",
            "ü est un son distinct de u (souvent difficile au début)."
          ]
        },
        "flashcards": [
          "a",
          "o",
          "e",
          "i",
          "u",
          "ü",
          "mā / má / mǎ / mà",
          "nǐ",
          "lǜ"
        ],
        "quizQuestions": 9
      },
      {
        "id": "zh-l1-a02",
        "title": "Pinyin : les consonnes de base",
        "titleEn": "Pinyin : les consonnes de base",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "pronunciation",
        "difficulty": "beginner",
        "tags": [
          "pinyin",
          "prononciation",
          "zh-l1-track-alphabet"
        ],
        "introduction": {
          "title": "Pinyin : les consonnes de base",
          "titleEn": "Pinyin : les consonnes de base",
          "content": "Comprendre et prononcer les consonnes (initiales) du pinyin.",
          "contentEn": "Comprendre et prononcer les consonnes (initiales) du pinyin.",
          "quickIntro": "Comprendre et prononcer les consonnes (initiales) du pinyin.",
          "quickIntroEn": "Comprendre et prononcer les consonnes (initiales) du pinyin.",
          "lessonIntro": "Aujourd'hui, tu vas attaquer ce qui fait vraiment “l’accent” en mandarin : les consonnes du pinyin (les initiales).\nC’est souvent là que les francophones confondent des sons… et qu’un mot peut devenir un autre mot.\n\nDans cette leçon, on apprend les consonnes essentielles et les grandes familles de sons.\n\n## 1) Deux idées clés\n1) Beaucoup de paires se distinguent par l’aspiration (un souffle d’air), pas par la “voix” comme en français.\n- b vs p, d vs t, g vs k\nExemples : ba / pa, da / ta, ga / ka (le “p/t/k” souffle plus)\n\n2) Il y a des séries proches à ne pas mélanger :\n- z / c / s (langue plutôt “devant”)\n- zh / ch / sh (langue “rétroflexe”, plus en arrière)\n- j / q / x (devant, avec i/ü très souvent)\n\n## 2) Les sons qu’on sécurise dès maintenant\n- m, n, l (faciles, mais utiles partout)\n- f, h (attention à h, plus “soufflé”)\n- r (spécial en mandarin, on va l’apprivoiser progressivement)\n\n## 3) Mini-tests (à l’oreille)\nTu t’entraîneras sur des paires courtes, par exemple :\n- zhi / ji\n- chi / qi\n- shi / xi\n- z / zh, c / ch, s / sh\n\nObjectif : sortir de la “zone floue” et commencer à entendre les différences qui comptent.",
          "lessonIntroEn": "Aujourd'hui, tu vas attaquer ce qui fait vraiment “l’accent” en mandarin : les consonnes du pinyin (les initiales).\nC’est souvent là que les francophones confondent des sons… et qu’un mot peut devenir un autre mot.\n\nDans cette leçon, on apprend les consonnes essentielles et les grandes familles de sons.\n\n## 1) Deux idées clés\n1) Beaucoup de paires se distinguent par l’aspiration (un souffle d’air), pas par la “voix” comme en français.\n- b vs p, d vs t, g vs k\nExemples : ba / pa, da / ta, ga / ka (le “p/t/k” souffle plus)\n\n2) Il y a des séries proches à ne pas mélanger :\n- z / c / s (langue plutôt “devant”)\n- zh / ch / sh (langue “rétroflexe”, plus en arrière)\n- j / q / x (devant, avec i/ü très souvent)\n\n## 2) Les sons qu’on sécurise dès maintenant\n- m, n, l (faciles, mais utiles partout)\n- f, h (attention à h, plus “soufflé”)\n- r (spécial en mandarin, on va l’apprivoiser progressivement)\n\n## 3) Mini-tests (à l’oreille)\nTu t’entraîneras sur des paires courtes, par exemple :\n- zhi / ji\n- chi / qi\n- shi / xi\n- z / zh, c / ch, s / sh\n\nObjectif : sortir de la “zone floue” et commencer à entendre les différences qui comptent.",
          "objectives": [
            "b/d/g sont plutôt « non aspirées » (différent du français).",
            "p/t/k sont aspirées (souffle plus marqué).",
            "zh/ch/sh et z/c/s sont deux séries distinctes."
          ],
          "objectivesEn": [
            "b/d/g sont plutôt « non aspirées » (différent du français).",
            "p/t/k sont aspirées (souffle plus marqué).",
            "zh/ch/sh et z/c/s sont deux séries distinctes."
          ]
        },
        "flashcards": [
          "b / p",
          "d / t",
          "g / k",
          "zh / ch / sh",
          "z / c / s",
          "j / q / x",
          "bā / pā",
          "zhōng / zōng",
          "qù"
        ],
        "quizQuestions": 9
      },
      {
        "id": "zh-l1-a03",
        "title": "Pinyin : les tons (1–4 + ton neutre)",
        "titleEn": "Pinyin : les tons (1–4 + ton neutre)",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "pronunciation",
        "difficulty": "beginner",
        "tags": [
          "pinyin",
          "tons",
          "prononciation",
          "zh-l1-track-alphabet"
        ],
        "introduction": {
          "title": "Pinyin : les tons (1–4 + ton neutre)",
          "titleEn": "Pinyin : les tons (1–4 + ton neutre)",
          "content": "Reconnaître et produire les tons du mandarin.",
          "contentEn": "Reconnaître et produire les tons du mandarin.",
          "quickIntro": "Reconnaître et produire les tons du mandarin.",
          "quickIntroEn": "Reconnaître et produire les tons du mandarin.",
          "lessonIntro": "Aujourd'hui, on arrive au point le plus important du mandarin : les tons.\nEn mandarin, une syllabe + un ton = un mot. Si tu changes le ton, tu changes souvent le sens.\n\nLa bonne nouvelle : les tons sont un réflexe qui se construit vite avec de bonnes habitudes.\n\n## 1) Les 4 tons + ton neutre\nSur l’exemple ma :\n1. mā (1er ton) : haut et stable\n2. má (2e ton) : monte\n3. mǎ (3e ton) : descend puis remonte (souvent “bas” en pratique)\n4. mà (4e ton) : descend fortement\nTon neutre : ma (court et léger)\n\n## 2) Comment les apprendre sans se décourager\n- On commence lentement : une syllabe, un ton.\n- On privilégie la précision rythmique (monter/descendre) plutôt que “forcer la voix”.\n- On répète en séries : 1-2-3-4, puis 4-3-2-1.\n\n## 3) Les erreurs classiques\n- “Aplatir” tous les tons (tout devient pareil)\n- Mettre un ton “français” (intonation de phrase) au lieu du ton du mot\n- Ne pas distinguer 2e et 3e ton\n\nObjectif : à la fin, tu seras capable d’identifier et reproduire les tons sur des syllabes simples, et tu comprendras pourquoi ils sont indispensables.",
          "lessonIntroEn": "Aujourd'hui, on arrive au point le plus important du mandarin : les tons.\nEn mandarin, une syllabe + un ton = un mot. Si tu changes le ton, tu changes souvent le sens.\n\nLa bonne nouvelle : les tons sont un réflexe qui se construit vite avec de bonnes habitudes.\n\n## 1) Les 4 tons + ton neutre\nSur l’exemple ma :\n1. mā (1er ton) : haut et stable\n2. má (2e ton) : monte\n3. mǎ (3e ton) : descend puis remonte (souvent “bas” en pratique)\n4. mà (4e ton) : descend fortement\nTon neutre : ma (court et léger)\n\n## 2) Comment les apprendre sans se décourager\n- On commence lentement : une syllabe, un ton.\n- On privilégie la précision rythmique (monter/descendre) plutôt que “forcer la voix”.\n- On répète en séries : 1-2-3-4, puis 4-3-2-1.\n\n## 3) Les erreurs classiques\n- “Aplatir” tous les tons (tout devient pareil)\n- Mettre un ton “français” (intonation de phrase) au lieu du ton du mot\n- Ne pas distinguer 2e et 3e ton\n\nObjectif : à la fin, tu seras capable d’identifier et reproduire les tons sur des syllabes simples, et tu comprendras pourquoi ils sont indispensables.",
          "objectives": [
            "1er ton : haut et stable.",
            "2e ton : montant (comme une question).",
            "3e ton : bas puis remontant (souvent « demi-3e ton » en phrase).",
            "4e ton : descendant, bref et marqué.",
            "Ton neutre : léger, sans accent fort."
          ],
          "objectivesEn": [
            "1er ton : haut et stable.",
            "2e ton : montant (comme une question).",
            "3e ton : bas puis remontant (souvent « demi-3e ton » en phrase).",
            "4e ton : descendant, bref et marqué.",
            "Ton neutre : léger, sans accent fort."
          ]
        },
        "flashcards": [
          "mā",
          "má",
          "mǎ",
          "mà",
          "ma",
          "你好吗？",
          "我很好。"
        ],
        "quizQuestions": 7
      },
      {
        "id": "zh-l1-a04",
        "title": "Pinyin : combiner consonnes + voyelles + tons",
        "titleEn": "Pinyin : combiner consonnes + voyelles + tons",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "pronunciation",
        "difficulty": "beginner",
        "tags": [
          "pinyin",
          "prononciation",
          "lecture",
          "zh-l1-track-alphabet"
        ],
        "introduction": {
          "title": "Pinyin : combiner consonnes + voyelles + tons",
          "titleEn": "Pinyin : combiner consonnes + voyelles + tons",
          "content": "Lire et prononcer des syllabes et mots simples en pinyin.",
          "contentEn": "Lire et prononcer des syllabes et mots simples en pinyin.",
          "quickIntro": "Lire et prononcer des syllabes et mots simples en pinyin.",
          "quickIntroEn": "Lire et prononcer des syllabes et mots simples en pinyin.",
          "lessonIntro": "Aujourd'hui, tu vas assembler les pièces : consonnes + voyelles + tons, pour lire de vraies syllabes et tes premiers mots.\nC’est le moment où le pinyin devient “utilisable” : tu n’apprends plus des sons isolés, tu commences à parler.\n\n## 1) Comment se construit une syllabe\nEn général :\nInitiale (consonne) + Finale (voyelle/combinaison) + Ton\nExemple : nǐ = n + i + 3e ton ; hǎo = h + ao + 3e ton\n\n## 2) Règles d’écriture très fréquentes (simples mais utiles)\nLe pinyin a des raccourcis orthographiques :\n- iu = iou (liú = liou)\n- ui = uei (guì = guei)\n- un = uen (lún = luen)\nEt avec j/q/x : ü s’écrit souvent u (xué = xüé)\n\n## 3) Premiers mots “réels”\nTu t’entraîneras sur des classiques :\n- 你好 nǐhǎo (bonjour)\n- 谢谢 xièxie (merci)\n- 我 wǒ (moi)\n- 你 nǐ (toi)\n\nObjectif : être capable de lire, répéter, et reconnaître des syllabes complètes. Ensuite, on pourra se concentrer sur les phrases du quotidien.",
          "lessonIntroEn": "Aujourd'hui, tu vas assembler les pièces : consonnes + voyelles + tons, pour lire de vraies syllabes et tes premiers mots.\nC’est le moment où le pinyin devient “utilisable” : tu n’apprends plus des sons isolés, tu commences à parler.\n\n## 1) Comment se construit une syllabe\nEn général :\nInitiale (consonne) + Finale (voyelle/combinaison) + Ton\nExemple : nǐ = n + i + 3e ton ; hǎo = h + ao + 3e ton\n\n## 2) Règles d’écriture très fréquentes (simples mais utiles)\nLe pinyin a des raccourcis orthographiques :\n- iu = iou (liú = liou)\n- ui = uei (guì = guei)\n- un = uen (lún = luen)\nEt avec j/q/x : ü s’écrit souvent u (xué = xüé)\n\n## 3) Premiers mots “réels”\nTu t’entraîneras sur des classiques :\n- 你好 nǐhǎo (bonjour)\n- 谢谢 xièxie (merci)\n- 我 wǒ (moi)\n- 你 nǐ (toi)\n\nObjectif : être capable de lire, répéter, et reconnaître des syllabes complètes. Ensuite, on pourra se concentrer sur les phrases du quotidien.",
          "objectives": [
            "Avec j/q/x, ü s'écrit souvent « u » : ju (jü), qu (qü), xu (xü).",
            "不 (bù) devient bú devant un 4e ton (bú shì).",
            "一 (yī) change selon le ton du mot suivant (on le verra progressivement)."
          ],
          "objectivesEn": [
            "Avec j/q/x, ü s'écrit souvent « u » : ju (jü), qu (qü), xu (xü).",
            "不 (bù) devient bú devant un 4e ton (bú shì).",
            "一 (yī) change selon le ton du mot suivant (on le verra progressivement)."
          ]
        },
        "flashcards": [
          "你好",
          "谢谢",
          "不是",
          "一个",
          "你好！",
          "谢谢你。",
          "这不是我的。"
        ],
        "quizQuestions": 7
      }
    ]
  },
  {
    "id": "zh-l1-track-conversation",
    "name": "Conversation",
    "nameEn": "Conversation",
    "description": "Expressions essentielles pour les interactions du quotidien.",
    "descriptionEn": "Expressions essentielles pour les interactions du quotidien.",
    "icon": "💬",
    "color": "#ec4899",
    "lessons": [
      {
        "id": "zh-l1-c01",
        "title": "Dire Bonjour et Merci",
        "titleEn": "Dire Bonjour et Merci",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Dire Bonjour et Merci",
          "titleEn": "Dire Bonjour et Merci",
          "content": "Saluer et remercier en mandarin.",
          "contentEn": "Saluer et remercier en mandarin.",
          "quickIntro": "Saluer et remercier en mandarin.",
          "quickIntroEn": "Saluer et remercier en mandarin.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre les formules les plus utiles du quotidien : saluer et remercier.\nCe sont les premières expressions qui te permettent d’entrer dans une interaction “naturelle”, même avec un vocabulaire limité.\n\n## 1) Dire bonjour\n- 你好 (nǐhǎo) : bonjour (standard)\n- 您好 (nínhǎo) : bonjour (plus poli, pour une personne plus âgée ou contexte pro)\n- 早上好 (zǎoshang hǎo) : bon matin\n- 晚上好 (wǎnshang hǎo) : bonsoir\n\n## 2) Dire merci (et répondre)\n- 谢谢 (xièxie) : merci\n- 谢谢你 (xièxie nǐ) : merci à toi\nRéponses :\n- 不客气 (bú kèqi) : je t’en prie\n- 没关系 (méi guānxi) : ce n’est pas grave / pas de souci (utile aussi après une excuse)\n\n## 3) Mini-dialogues\n- A : 你好！B : 你好！\n- A : 谢谢！B : 不客气！\n\nObjectif : savoir saluer, remercier et répondre automatiquement, sans réfléchir au pinyin.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre les formules les plus utiles du quotidien : saluer et remercier.\nCe sont les premières expressions qui te permettent d’entrer dans une interaction “naturelle”, même avec un vocabulaire limité.\n\n## 1) Dire bonjour\n- 你好 (nǐhǎo) : bonjour (standard)\n- 您好 (nínhǎo) : bonjour (plus poli, pour une personne plus âgée ou contexte pro)\n- 早上好 (zǎoshang hǎo) : bon matin\n- 晚上好 (wǎnshang hǎo) : bonsoir\n\n## 2) Dire merci (et répondre)\n- 谢谢 (xièxie) : merci\n- 谢谢你 (xièxie nǐ) : merci à toi\nRéponses :\n- 不客气 (bú kèqi) : je t’en prie\n- 没关系 (méi guānxi) : ce n’est pas grave / pas de souci (utile aussi après une excuse)\n\n## 3) Mini-dialogues\n- A : 你好！B : 你好！\n- A : 谢谢！B : 不客气！\n\nObjectif : savoir saluer, remercier et répondre automatiquement, sans réfléchir au pinyin.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "你好",
          "早上好",
          "谢谢",
          "不客气",
          "你好！",
          "谢谢！",
          "不客气。"
        ],
        "quizQuestions": 7
      },
      {
        "id": "zh-l1-c02",
        "title": "Dire OUI et NON",
        "titleEn": "Dire OUI et NON",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Dire OUI et NON",
          "titleEn": "Dire OUI et NON",
          "content": "Exprimer l'accord ou le désaccord en mandarin.",
          "contentEn": "Exprimer l'accord ou le désaccord en mandarin.",
          "quickIntro": "Exprimer l'accord ou le désaccord en mandarin.",
          "quickIntroEn": "Exprimer l'accord ou le désaccord en mandarin.",
          "lessonIntro": "Dire “oui” et “non” en mandarin n’est pas une seule paire fixe comme en français.\nOn choisit souvent le mot qui confirme l’idée (accord) ou qui nie l’action (refus), selon la question.\n\n## 1) Les “oui” les plus utiles\n- 是 (shì) : oui / c’est ça (surtout pour confirmer “être”)\n- 对 (duì) : oui / tu as raison (accord avec ce qui est dit)\n- 好 (hǎo) : d’accord / OK\n- 可以 (kěyǐ) : ça marche / c’est possible\n\n## 2) Les “non” les plus utiles\n- 不是 (bú shì) : non (ce n’est pas…)\n- 不 (bù) : non / ne… pas (refus général)\n- 不对 (bú duì) : non, ce n’est pas correct\n- 不行 (bù xíng) : non, ça ne va pas / impossible\n\n## 3) Exemples-guides\n- 你是法国人吗？→ 是 / 不是\n- 这样对吗？→ 对 / 不对\n- 你现在方便吗？→ 好 / 不行\n\nObjectif : savoir répondre vite et “sonner naturel”, sans traduire mot à mot depuis le français.",
          "lessonIntroEn": "Dire “oui” et “non” en mandarin n’est pas une seule paire fixe comme en français.\nOn choisit souvent le mot qui confirme l’idée (accord) ou qui nie l’action (refus), selon la question.\n\n## 1) Les “oui” les plus utiles\n- 是 (shì) : oui / c’est ça (surtout pour confirmer “être”)\n- 对 (duì) : oui / tu as raison (accord avec ce qui est dit)\n- 好 (hǎo) : d’accord / OK\n- 可以 (kěyǐ) : ça marche / c’est possible\n\n## 2) Les “non” les plus utiles\n- 不是 (bú shì) : non (ce n’est pas…)\n- 不 (bù) : non / ne… pas (refus général)\n- 不对 (bú duì) : non, ce n’est pas correct\n- 不行 (bù xíng) : non, ça ne va pas / impossible\n\n## 3) Exemples-guides\n- 你是法国人吗？→ 是 / 不是\n- 这样对吗？→ 对 / 不对\n- 你现在方便吗？→ 好 / 不行\n\nObjectif : savoir répondre vite et “sonner naturel”, sans traduire mot à mot depuis le français.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "是",
          "不是",
          "对",
          "不对",
          "好",
          "你是学生吗？",
          "是。",
          "不对。"
        ],
        "quizQuestions": 8
      },
      {
        "id": "zh-l1-c03",
        "title": "Dire au revoir",
        "titleEn": "Dire au revoir",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Dire au revoir",
          "titleEn": "Dire au revoir",
          "content": "Prendre congé en mandarin.",
          "contentEn": "Prendre congé en mandarin.",
          "quickIntro": "Prendre congé en mandarin.",
          "quickIntroEn": "Prendre congé en mandarin.",
          "lessonIntro": "Aujourd'hui, tu apprends à conclure une interaction : dire au revoir et proposer une prochaine rencontre.\nC’est simple, mais ça change tout : tu peux parler quelques secondes… puis sortir proprement de la conversation.\n\n## 1) Au revoir (standard et courant)\n- 再见 (zàijiàn) : au revoir (litt. “se revoir”)\n- 拜拜 (báibái) : salut (très informel)\n\n## 2) “À bientôt” selon le contexte\n- 明天见 (míngtiān jiàn) : à demain\n- 回头见 (huítóu jiàn) : à tout à l’heure / on se revoit\n- 一会儿见 (yíhuìr jiàn) : à tout de suite\n\n## 3) Exemples rapides\n- 好的，那我先走了。再见！(D’accord, je pars. Au revoir !)\n- 拜拜，明天见！(Salut, à demain !)\n\nObjectif : savoir quitter une discussion en restant poli, même avec peu de vocabulaire.",
          "lessonIntroEn": "Aujourd'hui, tu apprends à conclure une interaction : dire au revoir et proposer une prochaine rencontre.\nC’est simple, mais ça change tout : tu peux parler quelques secondes… puis sortir proprement de la conversation.\n\n## 1) Au revoir (standard et courant)\n- 再见 (zàijiàn) : au revoir (litt. “se revoir”)\n- 拜拜 (báibái) : salut (très informel)\n\n## 2) “À bientôt” selon le contexte\n- 明天见 (míngtiān jiàn) : à demain\n- 回头见 (huítóu jiàn) : à tout à l’heure / on se revoit\n- 一会儿见 (yíhuìr jiàn) : à tout de suite\n\n## 3) Exemples rapides\n- 好的，那我先走了。再见！(D’accord, je pars. Au revoir !)\n- 拜拜，明天见！(Salut, à demain !)\n\nObjectif : savoir quitter une discussion en restant poli, même avec peu de vocabulaire.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "再见",
          "拜拜",
          "明天见",
          "回头见",
          "我先走了，再见！",
          "明天见。"
        ],
        "quizQuestions": 6
      },
      {
        "id": "zh-l1-c04",
        "title": "S'excuser et interpeller quelqu'un",
        "titleEn": "S'excuser et interpeller quelqu'un",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "S'excuser et interpeller quelqu'un",
          "titleEn": "S'excuser et interpeller quelqu'un",
          "content": "S'excuser et interpeller poliment.",
          "contentEn": "S'excuser et interpeller poliment.",
          "quickIntro": "S'excuser et interpeller poliment.",
          "quickIntroEn": "S'excuser et interpeller poliment.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre deux compétences essentielles : s’excuser et interpeller quelqu’un poliment.\nC’est le genre de phrases qu’on utilise tout le temps : dans un magasin, au restaurant, dans la rue, au téléphone.\n\n## 1) S’excuser : deux expressions très utiles\n- 对不起 (duìbuqǐ) : pardon / je suis désolé (plutôt “fort”)\n- 不好意思 (bù hǎoyìsi) : excuse-moi / désolé (plus léger, très courant)\n\nExemples :\n- 对不起，我来晚了。Je suis désolé, je suis en retard.\n- 不好意思，打扰一下。Désolé, je vous dérange un instant.\n\n## 2) Interpeller / demander poliment\n- 请问… (qǐngwèn) : excusez-moi / puis-je demander…\n- 麻烦你… (máfan nǐ) : désolé de déranger, pourrais-tu…\n- 借过一下 (jièguò yíxià) : pardon, je passe (dans la foule)\n\n## 3) Cas fréquent : au téléphone\n- 喂 (wèi) : allô\n\nObjectif : pouvoir attirer l’attention sans être brusque, et gérer les petites situations du quotidien avec naturel.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre deux compétences essentielles : s’excuser et interpeller quelqu’un poliment.\nC’est le genre de phrases qu’on utilise tout le temps : dans un magasin, au restaurant, dans la rue, au téléphone.\n\n## 1) S’excuser : deux expressions très utiles\n- 对不起 (duìbuqǐ) : pardon / je suis désolé (plutôt “fort”)\n- 不好意思 (bù hǎoyìsi) : excuse-moi / désolé (plus léger, très courant)\n\nExemples :\n- 对不起，我来晚了。Je suis désolé, je suis en retard.\n- 不好意思，打扰一下。Désolé, je vous dérange un instant.\n\n## 2) Interpeller / demander poliment\n- 请问… (qǐngwèn) : excusez-moi / puis-je demander…\n- 麻烦你… (máfan nǐ) : désolé de déranger, pourrais-tu…\n- 借过一下 (jièguò yíxià) : pardon, je passe (dans la foule)\n\n## 3) Cas fréquent : au téléphone\n- 喂 (wèi) : allô\n\nObjectif : pouvoir attirer l’attention sans être brusque, et gérer les petites situations du quotidien avec naturel.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "对不起",
          "不好意思",
          "请问",
          "麻烦你",
          "喂",
          "对不起，我迟到了。",
          "请问，厕所在哪儿？"
        ],
        "quizQuestions": 7
      },
      {
        "id": "zh-l1-c05",
        "title": "Dire « C'est… » ou « Je suis… »",
        "titleEn": "Dire « C'est… » ou « Je suis… »",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Dire « C'est… » ou « Je suis… »",
          "titleEn": "Dire « C'est… » ou « Je suis… »",
          "content": "Structures de base avec 是 (être) et se présenter.",
          "contentEn": "Structures de base avec 是 (être) et se présenter.",
          "quickIntro": "Structures de base avec 是 (être) et se présenter.",
          "quickIntroEn": "Structures de base avec 是 (être) et se présenter.",
          "lessonIntro": "Aujourd'hui, tu vas construire des phrases ultra simples du type “c’est…” et “je suis…”.\nC’est la base pour te présenter, identifier un objet, ou répondre à une question.\n\n## 1) Dire “c’est …” avec 这 / 那\n- 这是… (zhè shì…) : c’est ceci / c’est…\n- 那是… (nà shì…) : c’est cela / c’est…\n\nExemples :\n- 这是咖啡。C’est du café.\n- 那是我朋友。C’est mon ami.\n\n## 2) Dire “je suis …” / “je m’appelle …”\n- 我是… (wǒ shì…) : je suis…\n- 我叫… (wǒ jiào…) : je m’appelle…\n\nExemples :\n- 我是学生。Je suis étudiant(e).\n- 我叫丽丽。Je m’appelle Lili.\n\n## 3) Point important (débutant)\nEn mandarin, on n’utilise pas toujours 是 comme “être” en français.\nPour l’instant, retiens surtout : “identité/équivalence” → 是.\n\nObjectif : savoir faire des phrases d’identité et d’identification, sans chercher une conjugaison.",
          "lessonIntroEn": "Aujourd'hui, tu vas construire des phrases ultra simples du type “c’est…” et “je suis…”.\nC’est la base pour te présenter, identifier un objet, ou répondre à une question.\n\n## 1) Dire “c’est …” avec 这 / 那\n- 这是… (zhè shì…) : c’est ceci / c’est…\n- 那是… (nà shì…) : c’est cela / c’est…\n\nExemples :\n- 这是咖啡。C’est du café.\n- 那是我朋友。C’est mon ami.\n\n## 2) Dire “je suis …” / “je m’appelle …”\n- 我是… (wǒ shì…) : je suis…\n- 我叫… (wǒ jiào…) : je m’appelle…\n\nExemples :\n- 我是学生。Je suis étudiant(e).\n- 我叫丽丽。Je m’appelle Lili.\n\n## 3) Point important (débutant)\nEn mandarin, on n’utilise pas toujours 是 comme “être” en français.\nPour l’instant, retiens surtout : “identité/équivalence” → 是.\n\nObjectif : savoir faire des phrases d’identité et d’identification, sans chercher une conjugaison.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "我是…",
          "我叫…",
          "这是…",
          "那是…",
          "吗",
          "我是法国人。",
          "我叫Perrine。",
          "你是学生吗？"
        ],
        "quizQuestions": 8
      },
      {
        "id": "zh-l1-c06",
        "title": "Dire « C'est ceci » / « Qu'est-ce que c'est ? »",
        "titleEn": "Dire « C'est ceci » / « Qu'est-ce que c'est ? »",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Dire « C'est ceci » / « Qu'est-ce que c'est ? »",
          "titleEn": "Dire « C'est ceci » / « Qu'est-ce que c'est ? »",
          "content": "Identifier un objet : questions avec 什么.",
          "contentEn": "Identifier un objet : questions avec 什么.",
          "quickIntro": "Identifier un objet : questions avec 什么.",
          "quickIntroEn": "Identifier un objet : questions avec 什么.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à poser une question très pratique : “Qu’est-ce que c’est ?”.\nEt surtout : à répondre immédiatement.\n\n## 1) La question\n- 这是什么？(zhè shì shénme?) : qu’est-ce que c’est ?\n- 那是什么？(nà shì shénme?) : c’est quoi, ça ?\n\n## 2) Les réponses modèles\n- 这是… (zhè shì…) : c’est…\n- 那是… (nà shì…) : c’est…\n\nExemples :\n- 这是什么？→ 这是茶。(C’est du thé.)\n- 那是什么？→ 那是书。(C’est un livre.)\n\n## 3) Pour gagner en fluidité\nOn pratique en boucle “question → réponse” avec des objets du quotidien.\nL’objectif n’est pas de faire long : c’est de répondre vite et clairement.\n\nObjectif : savoir demander et identifier des objets sans bloquer, dès les premières minutes de conversation.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à poser une question très pratique : “Qu’est-ce que c’est ?”.\nEt surtout : à répondre immédiatement.\n\n## 1) La question\n- 这是什么？(zhè shì shénme?) : qu’est-ce que c’est ?\n- 那是什么？(nà shì shénme?) : c’est quoi, ça ?\n\n## 2) Les réponses modèles\n- 这是… (zhè shì…) : c’est…\n- 那是… (nà shì…) : c’est…\n\nExemples :\n- 这是什么？→ 这是茶。(C’est du thé.)\n- 那是什么？→ 那是书。(C’est un livre.)\n\n## 3) Pour gagner en fluidité\nOn pratique en boucle “question → réponse” avec des objets du quotidien.\nL’objectif n’est pas de faire long : c’est de répondre vite et clairement.\n\nObjectif : savoir demander et identifier des objets sans bloquer, dès les premières minutes de conversation.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "这是什么？",
          "那是什么？",
          "这是…",
          "那是…",
          "什么",
          "这是什么？",
          "这是咖啡。"
        ],
        "quizQuestions": 7
      },
      {
        "id": "zh-l1-c07",
        "title": "Dire « ceci », « cela », « ce truc-là »",
        "titleEn": "Dire « ceci », « cela », « ce truc-là »",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Dire « ceci », « cela », « ce truc-là »",
          "titleEn": "Dire « ceci », « cela », « ce truc-là »",
          "content": "Démonstratifs : 这 / 那, 这个 / 那个.",
          "contentEn": "Démonstratifs : 这 / 那, 这个 / 那个.",
          "quickIntro": "Démonstratifs : 这 / 那, 这个 / 那个.",
          "quickIntroEn": "Démonstratifs : 这 / 那, 这个 / 那个.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à pointer du doigt comme un natif : “ceci”, “cela”, “ce truc-là”.\nC’est tout bête, mais c’est ce qui rend une conversation facile quand on ne connaît pas encore tous les mots.\n\n## 1) Les bases : 这 et 那\n- 这 (zhè) : ceci / ce…\n- 那 (nà) : cela / ce… (plus loin, ou “déjà connu”)\n\nTrès souvent, on dit :\n- 这个 (zhège) : ceci / ce…\n- 那个 (nàge) : cela / ce…\n\n## 2) “Ici / là-bas”\n- 这里 / 这儿 : ici\n- 那里 / 那儿 : là-bas\n\n## 3) “Ce truc-là”\nQuand on ne connaît pas le mot :\n- 这个东西 / 那个东西 : ce truc / cette chose\n\nExemples :\n- 这个多少钱？Combien coûte ceci ?\n- 那个东西很好。Ce truc-là est bien.\n\nObjectif : pouvoir “désigner” et continuer à parler, même avec un vocabulaire limité.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à pointer du doigt comme un natif : “ceci”, “cela”, “ce truc-là”.\nC’est tout bête, mais c’est ce qui rend une conversation facile quand on ne connaît pas encore tous les mots.\n\n## 1) Les bases : 这 et 那\n- 这 (zhè) : ceci / ce…\n- 那 (nà) : cela / ce… (plus loin, ou “déjà connu”)\n\nTrès souvent, on dit :\n- 这个 (zhège) : ceci / ce…\n- 那个 (nàge) : cela / ce…\n\n## 2) “Ici / là-bas”\n- 这里 / 这儿 : ici\n- 那里 / 那儿 : là-bas\n\n## 3) “Ce truc-là”\nQuand on ne connaît pas le mot :\n- 这个东西 / 那个东西 : ce truc / cette chose\n\nExemples :\n- 这个多少钱？Combien coûte ceci ?\n- 那个东西很好。Ce truc-là est bien.\n\nObjectif : pouvoir “désigner” et continuer à parler, même avec un vocabulaire limité.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "这",
          "那",
          "这个",
          "那个",
          "东西",
          "这个是什么？",
          "那个东西很好。"
        ],
        "quizQuestions": 7
      },
      {
        "id": "zh-l1-c08",
        "title": "Dire que quelque chose n'est pas…",
        "titleEn": "Dire que quelque chose n'est pas…",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Dire que quelque chose n'est pas…",
          "titleEn": "Dire que quelque chose n'est pas…",
          "content": "Négation de base : 不是… et 不 + verbe/adj.",
          "contentEn": "Négation de base : 不是… et 不 + verbe/adj.",
          "quickIntro": "Négation de base : 不是… et 不 + verbe/adj.",
          "quickIntroEn": "Négation de base : 不是… et 不 + verbe/adj.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à dire “ce n’est pas…” et “pas / ne… pas”.\nC’est indispensable pour corriger, refuser, ou simplement préciser une information.\n\n## 1) “Ce n’est pas…” : 不是\n- 不是… (bú shì…) : ce n’est pas…\n\nExemples :\n- 这不是咖啡，是茶。Ce n’est pas du café, c’est du thé.\n- 我不是老师。Je ne suis pas professeur.\n\n## 2) Négation générale : 不\n- 不 + verbe / adjectif : ne… pas\n\nExemples :\n- 我不去。Je n’y vais pas.\n- 不好。Pas bien / mauvais.\n\n## 3) Ce qu’on garde en tête (niveau 1)\n- 不是 sert surtout à nier une identité/équivalence.\n- 不 sert à nier une action ou une qualité.\n\nObjectif : savoir dire non, corriger une erreur, et refuser poliment, sans te perdre dans la grammaire.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à dire “ce n’est pas…” et “pas / ne… pas”.\nC’est indispensable pour corriger, refuser, ou simplement préciser une information.\n\n## 1) “Ce n’est pas…” : 不是\n- 不是… (bú shì…) : ce n’est pas…\n\nExemples :\n- 这不是咖啡，是茶。Ce n’est pas du café, c’est du thé.\n- 我不是老师。Je ne suis pas professeur.\n\n## 2) Négation générale : 不\n- 不 + verbe / adjectif : ne… pas\n\nExemples :\n- 我不去。Je n’y vais pas.\n- 不好。Pas bien / mauvais.\n\n## 3) Ce qu’on garde en tête (niveau 1)\n- 不是 sert surtout à nier une identité/équivalence.\n- 不 sert à nier une action ou une qualité.\n\nObjectif : savoir dire non, corriger une erreur, et refuser poliment, sans te perdre dans la grammaire.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "不是…",
          "不…",
          "我不去。",
          "不好。",
          "这不是茶。",
          "我不喜欢。"
        ],
        "quizQuestions": 6
      },
      {
        "id": "zh-l1-c09",
        "title": "Dire « avoir » et « ne pas avoir » (有 / 没有)",
        "titleEn": "Dire « avoir » et « ne pas avoir » (有 / 没有)",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Dire « avoir » et « ne pas avoir » (有 / 没有)",
          "titleEn": "Dire « avoir » et « ne pas avoir » (有 / 没有)",
          "content": "Avoir / exister : 有 et 没有.",
          "contentEn": "Avoir / exister : 有 et 没有.",
          "quickIntro": "Avoir / exister : 有 et 没有.",
          "quickIntroEn": "Avoir / exister : 有 et 没有.",
          "lessonIntro": "Aujourd'hui, tu apprends “avoir / ne pas avoir” et “il y a / il n’y a pas”.\nC’est une structure extrêmement fréquente pour parler de possession, d’existence, et de disponibilité.\n\n## 1) Possession : 我有 / 我没有\n- 我有… (wǒ yǒu…) : j’ai…\n- 我没有… (wǒ méiyǒu…) : je n’ai pas…\n\nExemples :\n- 我有时间。J’ai du temps.\n- 我没有钱。Je n’ai pas d’argent.\n\n## 2) Existence : 这里有 / 这里没有\n- 这里有… : ici, il y a…\n- 这里没有… : ici, il n’y a pas…\n\nExemples :\n- 这里有洗手间吗？Y a-t-il des toilettes ici ?\n- 这里没有地铁。Il n’y a pas de métro ici.\n\n## 3) Petit repère utile : 有 vs 在\n- 书在桌子上 : le livre est sur la table (localisation)\n- 桌子上有书 : il y a un livre sur la table (existence)\n\nObjectif : savoir dire ce que tu as, ce qui existe, et poser des questions très pratiques en situation.",
          "lessonIntroEn": "Aujourd'hui, tu apprends “avoir / ne pas avoir” et “il y a / il n’y a pas”.\nC’est une structure extrêmement fréquente pour parler de possession, d’existence, et de disponibilité.\n\n## 1) Possession : 我有 / 我没有\n- 我有… (wǒ yǒu…) : j’ai…\n- 我没有… (wǒ méiyǒu…) : je n’ai pas…\n\nExemples :\n- 我有时间。J’ai du temps.\n- 我没有钱。Je n’ai pas d’argent.\n\n## 2) Existence : 这里有 / 这里没有\n- 这里有… : ici, il y a…\n- 这里没有… : ici, il n’y a pas…\n\nExemples :\n- 这里有洗手间吗？Y a-t-il des toilettes ici ?\n- 这里没有地铁。Il n’y a pas de métro ici.\n\n## 3) Petit repère utile : 有 vs 在\n- 书在桌子上 : le livre est sur la table (localisation)\n- 桌子上有书 : il y a un livre sur la table (existence)\n\nObjectif : savoir dire ce que tu as, ce qui existe, et poser des questions très pratiques en situation.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "有",
          "没有",
          "我有…",
          "这里有…",
          "你有时间吗？",
          "这里没有水。"
        ],
        "quizQuestions": 6
      },
      {
        "id": "zh-l1-c10",
        "title": "Demander si quelque chose existe et dire « Donnez-moi… »",
        "titleEn": "Demander si quelque chose existe et dire « Donnez-moi… »",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Demander si quelque chose existe et dire « Donnez-moi… »",
          "titleEn": "Demander si quelque chose existe et dire « Donnez-moi… »",
          "content": "Demander l'existence et faire une demande simple.",
          "contentEn": "Demander l'existence et faire une demande simple.",
          "quickIntro": "Demander l'existence et faire une demande simple.",
          "quickIntroEn": "Demander l'existence et faire une demande simple.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre deux choses qui vont te servir immédiatement : demander si quelque chose existe, et demander/commander poliment.\nC’est typiquement la situation “magasin / café / restaurant”.\n\n## 1) “Est-ce qu’il y a… ?”\n- 有…吗？(yǒu… ma?) : il y a… ?\n- 这里有…吗？(zhèlǐ yǒu… ma?) : ici, il y a… ?\n\nExemples :\n- 有咖啡吗？Vous avez du café ?\n- 这里有地铁吗？Il y a le métro ici ?\n\n## 2) “Donnez-moi…” / “Je prends…”\nPlusieurs niveaux (du plus neutre au plus direct) :\n- 请给我… (qǐng gěi wǒ…) : s’il vous plaît, donnez-moi…\n- 给我… (gěi wǒ…) : donnez-moi… (direct)\n- 我要… (wǒ yào…) : je veux / je prends…\n- 来一个… (lái yí ge…) : j’en prends un…\n\nExemple :\n- 请给我一杯水。S’il vous plaît, une eau.\n\nObjectif : pouvoir demander et obtenir quelque chose en quelques phrases, sans stress.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre deux choses qui vont te servir immédiatement : demander si quelque chose existe, et demander/commander poliment.\nC’est typiquement la situation “magasin / café / restaurant”.\n\n## 1) “Est-ce qu’il y a… ?”\n- 有…吗？(yǒu… ma?) : il y a… ?\n- 这里有…吗？(zhèlǐ yǒu… ma?) : ici, il y a… ?\n\nExemples :\n- 有咖啡吗？Vous avez du café ?\n- 这里有地铁吗？Il y a le métro ici ?\n\n## 2) “Donnez-moi…” / “Je prends…”\nPlusieurs niveaux (du plus neutre au plus direct) :\n- 请给我… (qǐng gěi wǒ…) : s’il vous plaît, donnez-moi…\n- 给我… (gěi wǒ…) : donnez-moi… (direct)\n- 我要… (wǒ yào…) : je veux / je prends…\n- 来一个… (lái yí ge…) : j’en prends un…\n\nExemple :\n- 请给我一杯水。S’il vous plaît, une eau.\n\nObjectif : pouvoir demander et obtenir quelque chose en quelques phrases, sans stress.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "这里有…吗？",
          "你有…吗？",
          "给我…",
          "请给我…",
          "来一个…",
          "这里有咖啡吗？",
          "请给我一杯水。"
        ],
        "quizQuestions": 7
      },
      {
        "id": "zh-l1-c11",
        "title": "Dire que c'est bon / pas bon + remercier pour le repas",
        "titleEn": "Dire que c'est bon / pas bon + remercier pour le repas",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Dire que c'est bon / pas bon + remercier pour le repas",
          "titleEn": "Dire que c'est bon / pas bon + remercier pour le repas",
          "content": "Exprimer une appréciation et remercier après un repas.",
          "contentEn": "Exprimer une appréciation et remercier après un repas.",
          "quickIntro": "Exprimer une appréciation et remercier après un repas.",
          "quickIntroEn": "Exprimer une appréciation et remercier après un repas.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à donner ton avis simple sur la nourriture (bon / pas bon) et à utiliser les phrases de politesse autour d’un repas.\nC’est une petite leçon, mais elle rend les échanges beaucoup plus naturels.\n\n## 1) Dire “c’est bon” / “c’est pas bon”\n- 好吃 (hǎochī) : bon (au goût)\n- 不好吃 (bù hǎochī) : pas bon\n- 还可以 (hái kěyǐ) : ça va / correct\n- 太…了 (tài… le) : trop… (trop épicé, trop sucré…)\n\nExemples :\n- 这个很好吃。C’est très bon.\n- 太辣了！C’est trop épicé !\n\n## 2) Phrases utiles pendant le repas\n- 我开动了。Je commence (avant de manger, assez courant)\n- 我吃饱了。J’ai assez mangé / je suis rassasié(e)\n- 谢谢。Merci (simple et passe-partout)\n\nObjectif : être capable de réagir naturellement au restaurant ou chez quelqu’un, même avec un vocabulaire limité.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à donner ton avis simple sur la nourriture (bon / pas bon) et à utiliser les phrases de politesse autour d’un repas.\nC’est une petite leçon, mais elle rend les échanges beaucoup plus naturels.\n\n## 1) Dire “c’est bon” / “c’est pas bon”\n- 好吃 (hǎochī) : bon (au goût)\n- 不好吃 (bù hǎochī) : pas bon\n- 还可以 (hái kěyǐ) : ça va / correct\n- 太…了 (tài… le) : trop… (trop épicé, trop sucré…)\n\nExemples :\n- 这个很好吃。C’est très bon.\n- 太辣了！C’est trop épicé !\n\n## 2) Phrases utiles pendant le repas\n- 我开动了。Je commence (avant de manger, assez courant)\n- 我吃饱了。J’ai assez mangé / je suis rassasié(e)\n- 谢谢。Merci (simple et passe-partout)\n\nObjectif : être capable de réagir naturellement au restaurant ou chez quelqu’un, même avec un vocabulaire limité.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "好吃",
          "不好吃",
          "真好吃",
          "谢谢你做的饭",
          "我吃饱了",
          "这个真好吃！",
          "谢谢你做的饭，我吃饱了。"
        ],
        "quizQuestions": 7
      },
      {
        "id": "zh-l1-c12",
        "title": "Dire « Je veux… »",
        "titleEn": "Dire « Je veux… »",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Dire « Je veux… »",
          "titleEn": "Dire « Je veux… »",
          "content": "Exprimer un besoin ou une envie : 要 / 想要 / 想.",
          "contentEn": "Exprimer un besoin ou une envie : 要 / 想要 / 想.",
          "quickIntro": "Exprimer un besoin ou une envie : 要 / 想要 / 想.",
          "quickIntroEn": "Exprimer un besoin ou une envie : 要 / 想要 / 想.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à exprimer “je veux…”, mais surtout à choisir la bonne nuance.\nEn mandarin, il y a plusieurs façons de dire “vouloir”, et elles ne sonnent pas toutes pareil.\n\n## 1) 我要… : décision / commande / besoin\nTrès courant pour commander ou dire ce qu’on va faire.\n- 我要一杯咖啡。Je prends un café.\n- 我要去上班。Je dois / je vais aller travailler.\n\n## 2) 我想… : envie / intention plus douce\nPlus “je voudrais / j’ai envie”.\n- 我想喝咖啡。J’ai envie de boire un café.\n- 我想休息。J’aimerais me reposer.\n\n## 3) 我想要… : vouloir obtenir quelque chose\n- 我想要这个。Je voudrais celui-ci.\n\nObjectif : savoir exprimer une envie ou une demande sans paraître trop direct, et comprendre la différence entre intention et commande.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à exprimer “je veux…”, mais surtout à choisir la bonne nuance.\nEn mandarin, il y a plusieurs façons de dire “vouloir”, et elles ne sonnent pas toutes pareil.\n\n## 1) 我要… : décision / commande / besoin\nTrès courant pour commander ou dire ce qu’on va faire.\n- 我要一杯咖啡。Je prends un café.\n- 我要去上班。Je dois / je vais aller travailler.\n\n## 2) 我想… : envie / intention plus douce\nPlus “je voudrais / j’ai envie”.\n- 我想喝咖啡。J’ai envie de boire un café.\n- 我想休息。J’aimerais me reposer.\n\n## 3) 我想要… : vouloir obtenir quelque chose\n- 我想要这个。Je voudrais celui-ci.\n\nObjectif : savoir exprimer une envie ou une demande sans paraître trop direct, et comprendre la différence entre intention et commande.",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "我要…",
          "我想要…",
          "我想…",
          "我要咖啡。",
          "我想要一个苹果。"
        ],
        "quizQuestions": 5
      },
      {
        "id": "zh-l1-c13",
        "title": "Dire ce que tu veux faire : « Je veux + verbe »",
        "titleEn": "Dire ce que tu veux faire : « Je veux + verbe »",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "conversation",
        "difficulty": "beginner",
        "tags": [
          "conversation",
          "débutant",
          "zh-l1-track-conversation"
        ],
        "introduction": {
          "title": "Dire ce que tu veux faire : « Je veux + verbe »",
          "titleEn": "Dire ce que tu veux faire : « Je veux + verbe »",
          "content": "Exprimer une intention : 我想 + verbe.",
          "contentEn": "Exprimer une intention : 我想 + verbe.",
          "quickIntro": "Exprimer une intention : 我想 + verbe.",
          "quickIntroEn": "Exprimer une intention : 我想 + verbe.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à dire ce que tu veux faire : “je veux + verbe”.\nC’est une étape importante : tu passes des mots isolés à de vraies intentions.\n\n## 1) La structure simple\n- 我想 + verbe (wǒ xiǎng + V) : je veux / j’aimerais + verbe\n\nExemples :\n- 我想学中文。Je veux apprendre le chinois.\n- 我想去北京。Je veux aller à Pékin.\n- 我想练习发音。Je veux pratiquer la prononciation.\n\n## 2) Ajouter un peu de précision\n- maintenant / plus tard : 现在 / 以后\n- avec qui : 跟谁… (on verra plus tard, mais tu peux déjà l’entendre)\n\nExemple :\n- 我以后想去中国。Plus tard, je voudrais aller en Chine.\n\nObjectif : savoir exprimer un projet très simple, et donner une direction à la conversation (ce que tu veux faire, apprendre, essayer).",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à dire ce que tu veux faire : “je veux + verbe”.\nC’est une étape importante : tu passes des mots isolés à de vraies intentions.\n\n## 1) La structure simple\n- 我想 + verbe (wǒ xiǎng + V) : je veux / j’aimerais + verbe\n\nExemples :\n- 我想学中文。Je veux apprendre le chinois.\n- 我想去北京。Je veux aller à Pékin.\n- 我想练习发音。Je veux pratiquer la prononciation.\n\n## 2) Ajouter un peu de précision\n- maintenant / plus tard : 现在 / 以后\n- avec qui : 跟谁… (on verra plus tard, mais tu peux déjà l’entendre)\n\nExemple :\n- 我以后想去中国。Plus tard, je voudrais aller en Chine.\n\nObjectif : savoir exprimer un projet très simple, et donner une direction à la conversation (ce que tu veux faire, apprendre, essayer).",
          "objectives": [],
          "objectivesEn": []
        },
        "flashcards": [
          "我想去…",
          "我想学…",
          "我想练习…",
          "我想学汉语。",
          "我想去北京。"
        ],
        "quizQuestions": 5
      }
    ]
  },
  {
    "id": "zh-l1-track-grammar",
    "name": "Grammaire",
    "nameEn": "Grammaire",
    "description": "Construire des phrases correctes avec les structures fondamentales.",
    "descriptionEn": "Construire des phrases correctes avec les structures fondamentales.",
    "icon": "📘",
    "color": "#3b82f6",
    "lessons": [
      {
        "id": "zh-l1-g01",
        "title": "Comprendre l'ordre des mots : sujet / thème",
        "titleEn": "Comprendre l'ordre des mots : sujet / thème",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "grammar",
        "difficulty": "beginner",
        "tags": [
          "grammaire",
          "débutant",
          "zh-l1-track-grammar"
        ],
        "introduction": {
          "title": "Comprendre l'ordre des mots : sujet / thème",
          "titleEn": "Comprendre l'ordre des mots : sujet / thème",
          "content": "Ordre des mots et structure thème-commentaire.",
          "contentEn": "Ordre des mots et structure thème-commentaire.",
          "quickIntro": "Ordre des mots et structure thème-commentaire.",
          "quickIntroEn": "Ordre des mots et structure thème-commentaire.",
          "lessonIntro": "Bienvenue dans une des bases les plus importantes du mandarin : l’ordre des mots.\nEn mandarin, l’ordre est très régulier. Quand on maîtrise cette logique, on peut faire des phrases correctes très tôt, même sans beaucoup de vocabulaire.\n\n## 1) La structure “par défaut”\nMandarin = souvent SVO :\nSujet + Verbe + Objet\nExemple :\n- 我喝水。Je bois de l’eau.\n\n## 2) Où placer le temps et le lieu\nSouvent, on met d’abord le cadre (quand / où), puis l’action.\nSchéma fréquent :\nTemps + Lieu + Sujet + Verbe + Objet\nExemple :\n- 今天我在家学习中文。Aujourd’hui, j’étudie le chinois à la maison.\n\n## 3) Idée clé : “donner le contexte, puis le message”\nLe mandarin aime annoncer le décor avant le détail.\nÇa rend les phrases très lisibles.\n\nObjectif : à la fin de la leçon, tu sauras construire des phrases simples et bien ordonnées, sans “traduire mot à mot” depuis le français.",
          "lessonIntroEn": "Bienvenue dans une des bases les plus importantes du mandarin : l’ordre des mots.\nEn mandarin, l’ordre est très régulier. Quand on maîtrise cette logique, on peut faire des phrases correctes très tôt, même sans beaucoup de vocabulaire.\n\n## 1) La structure “par défaut”\nMandarin = souvent SVO :\nSujet + Verbe + Objet\nExemple :\n- 我喝水。Je bois de l’eau.\n\n## 2) Où placer le temps et le lieu\nSouvent, on met d’abord le cadre (quand / où), puis l’action.\nSchéma fréquent :\nTemps + Lieu + Sujet + Verbe + Objet\nExemple :\n- 今天我在家学习中文。Aujourd’hui, j’étudie le chinois à la maison.\n\n## 3) Idée clé : “donner le contexte, puis le message”\nLe mandarin aime annoncer le décor avant le détail.\nÇa rend les phrases très lisibles.\n\nObjectif : à la fin de la leçon, tu sauras construire des phrases simples et bien ordonnées, sans “traduire mot à mot” depuis le français.",
          "objectives": [
            "SVO est la base, mais le temps/lieu se place souvent avant le verbe.",
            "Le thème (ce dont on parle) peut être placé au début.",
            "Les mots interrogatifs restent souvent à la place de l'information manquante."
          ],
          "objectivesEn": [
            "SVO est la base, mais le temps/lieu se place souvent avant le verbe.",
            "Le thème (ce dont on parle) peut être placé au début.",
            "Les mots interrogatifs restent souvent à la place de l'information manquante."
          ]
        },
        "flashcards": [
          "我喝咖啡。",
          "今天我喝咖啡。",
          "在家我学习。"
        ],
        "quizQuestions": 3
      },
      {
        "id": "zh-l1-g02",
        "title": "Dire « où / à / de / dans » : lieux (在 / 到 / 从)",
        "titleEn": "Dire « où / à / de / dans » : lieux (在 / 到 / 从)",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "grammar",
        "difficulty": "beginner",
        "tags": [
          "grammaire",
          "débutant",
          "zh-l1-track-grammar"
        ],
        "introduction": {
          "title": "Dire « où / à / de / dans » : lieux (在 / 到 / 从)",
          "titleEn": "Dire « où / à / de / dans » : lieux (在 / 到 / 从)",
          "content": "Prépositions de lieu et verbes de déplacement simples.",
          "contentEn": "Prépositions de lieu et verbes de déplacement simples.",
          "quickIntro": "Prépositions de lieu et verbes de déplacement simples.",
          "quickIntroEn": "Prépositions de lieu et verbes de déplacement simples.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à parler de lieu : “être à”, “aller à”, “venir de”, “dans / sur / sous”.\nSans ça, impossible de dire où tu es, où tu vas, ou où se trouve un objet.\n\n## 1) “Être à” : 在\n- 在 + lieu : être à / se trouver à\nExemples :\n- 我在家。Je suis à la maison.\n- 书在桌子上。Le livre est sur la table.\n\n## 2) “Aller à” / “venir à” : 去 / 来\n- 去 + lieu : aller à\n- 来 + lieu : venir à (vers la personne qui parle)\nExemples :\n- 我去学校。Je vais à l’école.\n- 他来我家。Il vient chez moi.\n\n## 3) “De… à …” : 从…到…\n- 从 + lieu + 到 + lieu\nExemple :\n- 从巴黎到北京。De Paris à Pékin.\n\nObjectif : pouvoir décrire des positions et des déplacements très simples, et comprendre la logique des verbes de mouvement.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à parler de lieu : “être à”, “aller à”, “venir de”, “dans / sur / sous”.\nSans ça, impossible de dire où tu es, où tu vas, ou où se trouve un objet.\n\n## 1) “Être à” : 在\n- 在 + lieu : être à / se trouver à\nExemples :\n- 我在家。Je suis à la maison.\n- 书在桌子上。Le livre est sur la table.\n\n## 2) “Aller à” / “venir à” : 去 / 来\n- 去 + lieu : aller à\n- 来 + lieu : venir à (vers la personne qui parle)\nExemples :\n- 我去学校。Je vais à l’école.\n- 他来我家。Il vient chez moi.\n\n## 3) “De… à …” : 从…到…\n- 从 + lieu + 到 + lieu\nExemple :\n- 从巴黎到北京。De Paris à Pékin.\n\nObjectif : pouvoir décrire des positions et des déplacements très simples, et comprendre la logique des verbes de mouvement.",
          "objectives": [
            "在 + lieu = être à/dans",
            "到 + lieu = aller jusqu'à",
            "从 + lieu = depuis / à partir de"
          ],
          "objectivesEn": [
            "在 + lieu = être à/dans",
            "到 + lieu = aller jusqu'à",
            "从 + lieu = depuis / à partir de"
          ]
        },
        "flashcards": [
          "我在家。",
          "我到学校。",
          "我从法国来。"
        ],
        "quizQuestions": 3
      },
      {
        "id": "zh-l1-g03",
        "title": "Dire « quand » : repères temporels et placement",
        "titleEn": "Dire « quand » : repères temporels et placement",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "grammar",
        "difficulty": "beginner",
        "tags": [
          "grammaire",
          "débutant",
          "zh-l1-track-grammar"
        ],
        "introduction": {
          "title": "Dire « quand » : repères temporels et placement",
          "titleEn": "Dire « quand » : repères temporels et placement",
          "content": "Exprimer le temps dans une phrase simple.",
          "contentEn": "Exprimer le temps dans une phrase simple.",
          "quickIntro": "Exprimer le temps dans une phrase simple.",
          "quickIntroEn": "Exprimer le temps dans une phrase simple.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à exprimer “quand” et à placer le temps correctement dans une phrase.\nEn mandarin, le temps se met très souvent au début : ça aide l’auditeur à comprendre tout de suite le contexte.\n\n## 1) Les repères essentiels\n- 今天 / 明天 / 昨天 : aujourd’hui / demain / hier\n- 现在 : maintenant\n- 早上 / 下午 / 晚上 : matin / après-midi / soir\n\n## 2) Où le placer dans la phrase\nSouvent :\nTemps + Sujet + Verbe + …\nExemple :\n- 明天我去学校。Demain, je vais à l’école.\n\n## 3) Bonus pratique\nPour dire “quand je…”, on utilise souvent …的时候 (on l’entendra souvent, même si on ne le maîtrise pas encore).\nExemple :\n- 上班的时候… (quand on travaille…)\n\nObjectif : savoir donner un repère temporel simple et rendre tes phrases immédiatement plus claires.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à exprimer “quand” et à placer le temps correctement dans une phrase.\nEn mandarin, le temps se met très souvent au début : ça aide l’auditeur à comprendre tout de suite le contexte.\n\n## 1) Les repères essentiels\n- 今天 / 明天 / 昨天 : aujourd’hui / demain / hier\n- 现在 : maintenant\n- 早上 / 下午 / 晚上 : matin / après-midi / soir\n\n## 2) Où le placer dans la phrase\nSouvent :\nTemps + Sujet + Verbe + …\nExemple :\n- 明天我去学校。Demain, je vais à l’école.\n\n## 3) Bonus pratique\nPour dire “quand je…”, on utilise souvent …的时候 (on l’entendra souvent, même si on ne le maîtrise pas encore).\nExemple :\n- 上班的时候… (quand on travaille…)\n\nObjectif : savoir donner un repère temporel simple et rendre tes phrases immédiatement plus claires.",
          "objectives": [
            "Les repères temporels se placent souvent avant le verbe (souvent en début de phrase).",
            "On peut cumuler : « demain matin », « ce soir », etc.",
            "Question « quand » : 什么时候 (niveau 1, usage simple)."
          ],
          "objectivesEn": [
            "Les repères temporels se placent souvent avant le verbe (souvent en début de phrase).",
            "On peut cumuler : « demain matin », « ce soir », etc.",
            "Question « quand » : 什么时候 (niveau 1, usage simple)."
          ]
        },
        "flashcards": [
          "我今天很忙。",
          "明天我去学校。",
          "你什么时候来？"
        ],
        "quizQuestions": 3
      },
      {
        "id": "zh-l1-g04",
        "title": "Dire « ne pas » : négation 不 vs 没",
        "titleEn": "Dire « ne pas » : négation 不 vs 没",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "grammar",
        "difficulty": "beginner",
        "tags": [
          "grammaire",
          "débutant",
          "zh-l1-track-grammar"
        ],
        "introduction": {
          "title": "Dire « ne pas » : négation 不 vs 没",
          "titleEn": "Dire « ne pas » : négation 不 vs 没",
          "content": "Choisir entre 不 et 没(有).",
          "contentEn": "Choisir entre 不 et 没(有).",
          "quickIntro": "Choisir entre 不 et 没(有).",
          "quickIntroEn": "Choisir entre 不 et 没(有).",
          "lessonIntro": "Bienvenue dans une leçon clé : la négation en mandarin.\nBeaucoup de débutants mélangent 不 et 没… et pourtant la règle de base est très logique.\n\n## 1) 不 (bù) : “ne… pas” pour le présent / futur / habitude\n- 我不喝咖啡。Je ne bois pas de café.\n- 他不去。Il n’y va pas.\n\n## 2) 没 (méi) / 没有 (méiyǒu) : “ne… pas” pour le passé / absence\n- 我没去。Je n’y suis pas allé(e).\n- 我没有时间。Je n’ai pas le temps.\n\n## 3) Une structure très fréquente : “pas encore”\n- 还没… (hái méi…) : pas encore…\nExemple :\n- 我还没吃饭。Je n’ai pas encore mangé.\n\nObjectif : savoir nier correctement une action ou une situation, et comprendre rapidement ce que tu entends dans des phrases réelles.",
          "lessonIntroEn": "Bienvenue dans une leçon clé : la négation en mandarin.\nBeaucoup de débutants mélangent 不 et 没… et pourtant la règle de base est très logique.\n\n## 1) 不 (bù) : “ne… pas” pour le présent / futur / habitude\n- 我不喝咖啡。Je ne bois pas de café.\n- 他不去。Il n’y va pas.\n\n## 2) 没 (méi) / 没有 (méiyǒu) : “ne… pas” pour le passé / absence\n- 我没去。Je n’y suis pas allé(e).\n- 我没有时间。Je n’ai pas le temps.\n\n## 3) Une structure très fréquente : “pas encore”\n- 还没… (hái méi…) : pas encore…\nExemple :\n- 我还没吃饭。Je n’ai pas encore mangé.\n\nObjectif : savoir nier correctement une action ou une situation, et comprendre rapidement ce que tu entends dans des phrases réelles.",
          "objectives": [
            "不 + verbe/adj : ne… pas (présent/habitude)",
            "没(有) : ne pas avoir / ne pas (avoir fait)",
            "还没 : pas encore"
          ],
          "objectivesEn": [
            "不 + verbe/adj : ne… pas (présent/habitude)",
            "没(有) : ne pas avoir / ne pas (avoir fait)",
            "还没 : pas encore"
          ]
        },
        "flashcards": [
          "我不去。",
          "我没去。",
          "我还没吃。"
        ],
        "quizQuestions": 3
      },
      {
        "id": "zh-l1-g05",
        "title": "Comment dire « Qui ? » (谁)",
        "titleEn": "Comment dire « Qui ? » (谁)",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "grammar",
        "difficulty": "beginner",
        "tags": [
          "grammaire",
          "débutant",
          "zh-l1-track-grammar"
        ],
        "introduction": {
          "title": "Comment dire « Qui ? » (谁)",
          "titleEn": "Comment dire « Qui ? » (谁)",
          "content": "Questions avec 谁.",
          "contentEn": "Questions avec 谁.",
          "quickIntro": "Questions avec 谁.",
          "quickIntroEn": "Questions avec 谁.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à poser des questions avec “qui ?”.\nC’est indispensable pour rencontrer quelqu’un, demander une information, ou comprendre une situation.\n\n## 1) Le mot question : 谁 (shéi / shuí)\n- 谁 : qui ?\n\nExemples :\n- 你是谁？Qui es-tu ?\n- 他是谁？Qui est-ce ?\n- 你找谁？Tu cherches qui ?\n\n## 2) Questions fréquentes “qui + verbe”\nLe mandarin garde souvent le mot question à la place normale de l’élément.\nExemple :\n- 你喜欢谁？Tu aimes qui ? (qui aimes-tu ?)\n\n## 3) Variante plus polie\n- 哪位 (nǎ wèi) : “quelle personne / qui” (plus poli, souvent au téléphone)\n\nObjectif : savoir demander et comprendre “qui”, et produire des questions simples sans inverser l’ordre des mots comme en français.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à poser des questions avec “qui ?”.\nC’est indispensable pour rencontrer quelqu’un, demander une information, ou comprendre une situation.\n\n## 1) Le mot question : 谁 (shéi / shuí)\n- 谁 : qui ?\n\nExemples :\n- 你是谁？Qui es-tu ?\n- 他是谁？Qui est-ce ?\n- 你找谁？Tu cherches qui ?\n\n## 2) Questions fréquentes “qui + verbe”\nLe mandarin garde souvent le mot question à la place normale de l’élément.\nExemple :\n- 你喜欢谁？Tu aimes qui ? (qui aimes-tu ?)\n\n## 3) Variante plus polie\n- 哪位 (nǎ wèi) : “quelle personne / qui” (plus poli, souvent au téléphone)\n\nObjectif : savoir demander et comprendre “qui”, et produire des questions simples sans inverser l’ordre des mots comme en français.",
          "objectives": [
            "谁 = qui",
            "En mandarin, « qui » reste généralement à la place du sujet/objet attendu.",
            "On peut répondre directement avec un nom/pronom."
          ],
          "objectivesEn": [
            "谁 = qui",
            "En mandarin, « qui » reste généralement à la place du sujet/objet attendu.",
            "On peut répondre directement avec un nom/pronom."
          ]
        },
        "flashcards": [
          "你是谁？",
          "谁是老师？",
          "那是谁？"
        ],
        "quizQuestions": 3
      },
      {
        "id": "zh-l1-g06",
        "title": "Dire « Comment ? Pourquoi ? Combien ? » (怎么 / 为什么 / 多少 / 几)",
        "titleEn": "Dire « Comment ? Pourquoi ? Combien ? » (怎么 / 为什么 / 多少 / 几)",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "grammar",
        "difficulty": "beginner",
        "tags": [
          "grammaire",
          "débutant",
          "zh-l1-track-grammar"
        ],
        "introduction": {
          "title": "Dire « Comment ? Pourquoi ? Combien ? » (怎么 / 为什么 / 多少 / 几)",
          "titleEn": "Dire « Comment ? Pourquoi ? Combien ? » (怎么 / 为什么 / 多少 / 几)",
          "content": "Questions : comment / pourquoi / combien.",
          "contentEn": "Questions : comment / pourquoi / combien.",
          "quickIntro": "Questions : comment / pourquoi / combien.",
          "quickIntroEn": "Questions : comment / pourquoi / combien.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre les questions les plus fréquentes après “qui” : comment, pourquoi, combien.\nCes mots te permettent de débloquer énormément de situations, même avec peu de vocabulaire.\n\n## 1) 怎么 (zěnme) : comment ? / de quelle manière ?\n- 你怎么去？Comment tu y vas ?\n- 这个怎么说？Comment on dit ça ?\n\n## 2) 为什么 (wèishénme) : pourquoi ?\n- 你为什么不去？Pourquoi tu n’y vas pas ?\n\n## 3) 多少 vs 几 : combien ?\n- 多少 : combien (souvent quantité “ouverte”, prix, volume)\n- 几 : combien (petits nombres, souvent quand on s’attend à 1–10 environ)\n\nExemples :\n- 多少钱？Ça coûte combien ?\n- 你几岁？Tu as quel âge ?\n\nObjectif : savoir poser des questions utiles et comprendre les réponses de base, sans te perdre dans la structure des phrases.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre les questions les plus fréquentes après “qui” : comment, pourquoi, combien.\nCes mots te permettent de débloquer énormément de situations, même avec peu de vocabulaire.\n\n## 1) 怎么 (zěnme) : comment ? / de quelle manière ?\n- 你怎么去？Comment tu y vas ?\n- 这个怎么说？Comment on dit ça ?\n\n## 2) 为什么 (wèishénme) : pourquoi ?\n- 你为什么不去？Pourquoi tu n’y vas pas ?\n\n## 3) 多少 vs 几 : combien ?\n- 多少 : combien (souvent quantité “ouverte”, prix, volume)\n- 几 : combien (petits nombres, souvent quand on s’attend à 1–10 environ)\n\nExemples :\n- 多少钱？Ça coûte combien ?\n- 你几岁？Tu as quel âge ?\n\nObjectif : savoir poser des questions utiles et comprendre les réponses de base, sans te perdre dans la structure des phrases.",
          "objectives": [
            "怎么 = comment (manière)",
            "为什么 = pourquoi",
            "多少 = combien (quantité, souvent ouverte)",
            "几 = combien (petits nombres, souvent 1–10)"
          ],
          "objectivesEn": [
            "怎么 = comment (manière)",
            "为什么 = pourquoi",
            "多少 = combien (quantité, souvent ouverte)",
            "几 = combien (petits nombres, souvent 1–10)"
          ]
        },
        "flashcards": [
          "你怎么去？",
          "你为什么不去？",
          "你几岁？"
        ],
        "quizQuestions": 3
      },
      {
        "id": "zh-l1-g07",
        "title": "De A à B : lieux et temps (从…到…, 来/去)",
        "titleEn": "De A à B : lieux et temps (从…到…, 来/去)",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "grammar",
        "difficulty": "beginner",
        "tags": [
          "grammaire",
          "débutant",
          "zh-l1-track-grammar"
        ],
        "introduction": {
          "title": "De A à B : lieux et temps (从…到…, 来/去)",
          "titleEn": "De A à B : lieux et temps (从…到…, 来/去)",
          "content": "Exprimer un trajet : de… à… ; venir/aller.",
          "contentEn": "Exprimer un trajet : de… à… ; venir/aller.",
          "quickIntro": "Exprimer un trajet : de… à… ; venir/aller.",
          "quickIntroEn": "Exprimer un trajet : de… à… ; venir/aller.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à exprimer “de A à B” (lieu ou temps) et à clarifier la direction avec “venir / aller”.\nC’est très utile pour voyager, raconter un trajet, ou parler d’une durée.\n\n## 1) De A à B : 从…到…\n- 从 + A + 到 + B\nExemples :\n- 从家到学校。De la maison à l’école.\n- 从三点到五点。De 3h à 5h.\n\n## 2) Aller / venir : 去 / 来\n- 去 : mouvement qui s’éloigne de la personne qui parle\n- 来 : mouvement vers la personne qui parle\n\nExemples :\n- 我去你家。Je vais chez toi.\n- 你来我家。Tu viens chez moi.\n\n## 3) Petit automatisme à construire\nQuand tu hésites : demande-toi “vers moi ou pas ?”. Ça suffit au niveau 1.\n\nObjectif : être capable de décrire un déplacement simple et d’éviter l’erreur classique “venir/aller”.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à exprimer “de A à B” (lieu ou temps) et à clarifier la direction avec “venir / aller”.\nC’est très utile pour voyager, raconter un trajet, ou parler d’une durée.\n\n## 1) De A à B : 从…到…\n- 从 + A + 到 + B\nExemples :\n- 从家到学校。De la maison à l’école.\n- 从三点到五点。De 3h à 5h.\n\n## 2) Aller / venir : 去 / 来\n- 去 : mouvement qui s’éloigne de la personne qui parle\n- 来 : mouvement vers la personne qui parle\n\nExemples :\n- 我去你家。Je vais chez toi.\n- 你来我家。Tu viens chez moi.\n\n## 3) Petit automatisme à construire\nQuand tu hésites : demande-toi “vers moi ou pas ?”. Ça suffit au niveau 1.\n\nObjectif : être capable de décrire un déplacement simple et d’éviter l’erreur classique “venir/aller”.",
          "objectives": [
            "从…到… = de… à…",
            "来 = venir (vers le locuteur)",
            "去 = aller (s'éloigner du locuteur)"
          ],
          "objectivesEn": [
            "从…到… = de… à…",
            "来 = venir (vers le locuteur)",
            "去 = aller (s'éloigner du locuteur)"
          ]
        },
        "flashcards": [
          "我从家到学校。",
          "你来吗？",
          "我去北京。"
        ],
        "quizQuestions": 3
      }
    ]
  },
  {
    "id": "zh-l1-track-numbers",
    "name": "Nombres",
    "nameEn": "Nombres",
    "description": "Compter, donner l heure, l age et les dates.",
    "descriptionEn": "Compter, donner l heure, l age et les dates.",
    "icon": "🔢",
    "color": "#f59e0b",
    "lessons": [
      {
        "id": "zh-l1-n01",
        "title": "Les nombres chinois jusqu'à 1000",
        "titleEn": "Les nombres chinois jusqu'à 1000",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "vocabulary",
        "difficulty": "beginner",
        "tags": [
          "nombres",
          "débutant",
          "zh-l1-track-numbers"
        ],
        "introduction": {
          "title": "Les nombres chinois jusqu'à 1000",
          "titleEn": "Les nombres chinois jusqu'à 1000",
          "content": "Compter et lire des nombres jusqu'à 1000.",
          "contentEn": "Compter et lire des nombres jusqu'à 1000.",
          "quickIntro": "Compter et lire des nombres jusqu'à 1000.",
          "quickIntroEn": "Compter et lire des nombres jusqu'à 1000.",
          "lessonIntro": "Introduction aux nombres en mandarin\nAujourd'hui, on attaque un des fondements du chinois : les chiffres.\n\nCe n’est pas forcément la partie la plus fun… mais sans les nombres, tu ne peux ni donner un prix, ni lire une date, ni comprendre une heure, ni même épeler un numéro.\n\nLa bonne nouvelle ? Le système est très logique et se construit comme des Lego.\n\n## 1) À quoi servent les nombres dès le niveau 1 ?\nTu vas les utiliser pour :\n- Les prix et quantités (un café, deux billets…)\n- Les dates (2026年3月…)\n- L’heure (3点10分…)\n- Les numéros (chambres, bus, etc.)\n\n## 2) Les nombres de 0 à 10\n零 (líng) → 0\n一 (yī) → 1\n二 (èr) → 2\n三 (sān) → 3\n四 (sì) → 4\n五 (wǔ) → 5\n六 (liù) → 6\n七 (qī) → 7\n八 (bā) → 8\n九 (jiǔ) → 9\n十 (shí) → 10\n\n## 3) Construire les autres nombres (logique “Lego”)\n11 = 十一 → 10 + 1\n15 = 十五 → 10 + 5\n20 = 二十 → 2 + 10\n99 = 九十九 → 9 + 10 + 9\n\nExemples :\n12 → 十二 (shí’èr)\n30 → 三十 (sānshí)\n33 → 三十三 (sānshísān)\n\n## 4) Les centaines et les milliers\n100 → 一百 (yìbǎi)\n1 000 → 一千 (yìqiān)\n\nExemples :\n200 → 二百\n350 → 三百五十\n512 → 五百一十二\n1 234 → 一千二百三十四\n\nImportant : en chinois, on dit bien 一百 / 一千 (contrairement à certaines langues qui omettent “un”).\n\nRésumé rapide :\n- 十 = 10, 百 = 100, 千 = 1 000\n- Construction : [milliers] + [centaines] + [dizaines] + [unités]\nAvec ça, tu peux déjà lire beaucoup de choses en mandarin. Le secret : répétition + automatisme.",
          "lessonIntroEn": "Introduction aux nombres en mandarin\nAujourd'hui, on attaque un des fondements du chinois : les chiffres.\n\nCe n’est pas forcément la partie la plus fun… mais sans les nombres, tu ne peux ni donner un prix, ni lire une date, ni comprendre une heure, ni même épeler un numéro.\n\nLa bonne nouvelle ? Le système est très logique et se construit comme des Lego.\n\n## 1) À quoi servent les nombres dès le niveau 1 ?\nTu vas les utiliser pour :\n- Les prix et quantités (un café, deux billets…)\n- Les dates (2026年3月…)\n- L’heure (3点10分…)\n- Les numéros (chambres, bus, etc.)\n\n## 2) Les nombres de 0 à 10\n零 (líng) → 0\n一 (yī) → 1\n二 (èr) → 2\n三 (sān) → 3\n四 (sì) → 4\n五 (wǔ) → 5\n六 (liù) → 6\n七 (qī) → 7\n八 (bā) → 8\n九 (jiǔ) → 9\n十 (shí) → 10\n\n## 3) Construire les autres nombres (logique “Lego”)\n11 = 十一 → 10 + 1\n15 = 十五 → 10 + 5\n20 = 二十 → 2 + 10\n99 = 九十九 → 9 + 10 + 9\n\nExemples :\n12 → 十二 (shí’èr)\n30 → 三十 (sānshí)\n33 → 三十三 (sānshísān)\n\n## 4) Les centaines et les milliers\n100 → 一百 (yìbǎi)\n1 000 → 一千 (yìqiān)\n\nExemples :\n200 → 二百\n350 → 三百五十\n512 → 五百一十二\n1 234 → 一千二百三十四\n\nImportant : en chinois, on dit bien 一百 / 一千 (contrairement à certaines langues qui omettent “un”).\n\nRésumé rapide :\n- 十 = 10, 百 = 100, 千 = 1 000\n- Construction : [milliers] + [centaines] + [dizaines] + [unités]\nAvec ça, tu peux déjà lire beaucoup de choses en mandarin. Le secret : répétition + automatisme.",
          "objectives": [
            "11 = 十一, 20 = 二十, 34 = 三十四",
            "105 = 一百零五 (零 sert de « zéro de liaison »)",
            "200 = 两百 est très fréquent à l'oral"
          ],
          "objectivesEn": [
            "11 = 十一, 20 = 二十, 34 = 三十四",
            "105 = 一百零五 (零 sert de « zéro de liaison »)",
            "200 = 两百 est très fréquent à l'oral"
          ]
        },
        "flashcards": [
          "零",
          "十",
          "百",
          "千",
          "一百零五",
          "两百",
          "我有三十块。",
          "一共一百零五。"
        ],
        "quizQuestions": 8
      },
      {
        "id": "zh-l1-n02",
        "title": "Dire l'âge, la date et l'heure (et 两 vs 二)",
        "titleEn": "Dire l'âge, la date et l'heure (et 两 vs 二)",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "vocabulary",
        "difficulty": "beginner",
        "tags": [
          "nombres",
          "temps",
          "débutant",
          "zh-l1-track-numbers"
        ],
        "introduction": {
          "title": "Dire l'âge, la date et l'heure (et 两 vs 二)",
          "titleEn": "Dire l'âge, la date et l'heure (et 两 vs 二)",
          "content": "Exprimer âge, date et heure ; choisir 两 vs 二.",
          "contentEn": "Exprimer âge, date et heure ; choisir 两 vs 二.",
          "quickIntro": "Exprimer âge, date et heure ; choisir 两 vs 二.",
          "quickIntroEn": "Exprimer âge, date et heure ; choisir 两 vs 二.",
          "lessonIntro": "Aujourd'hui, tu vas rendre les nombres “utiles” : dire ton âge, donner une date, lire l’heure, et comprendre pourquoi “2” a parfois deux formes (二 et 两).\n\nC’est le pack indispensable pour voyager, se présenter, réserver, acheter, ou simplement comprendre la vie quotidienne.\n\n## 1) Dire l’âge\nStructure :\n- 我 + nombre + 岁 (suì)\n\nExemples :\n- 我二十岁。J’ai 20 ans.\n- 他十八岁。Il a 18 ans.\n\n## 2) Dire la date\nOn enchaîne “année + mois + jour” :\n- 2026年3月3号 (ou 3日)\n\nExemples :\n- 今天是三月三号。Nous sommes le 3 mars.\n- 我五月去中国。Je vais en Chine en mai.\n\n## 3) Dire l’heure\n- …点 (diǎn) : heure\n- …分 (fēn) : minutes\n\nExemples :\n- 三点。3 heures.\n- 三点十分。3h10.\n- 三点半。3h30 (très fréquent)\n\n## 4) 二 (èr) vs 两 (liǎng)\nRègle simple (niveau 1) :\n- 二 : le chiffre “2” (compter, lire un nombre)\n- 两 : “deux” devant un classificateur ou dans certaines quantités naturelles\n\nExemples :\n- 二十 (20) mais 两个人 (deux personnes)\n- 二百 (200) est possible, mais 两百 est très courant à l’oral\n\nObjectif : être capable de dire âge/date/heure sans réfléchir, et commencer à entendre naturellement 二 vs 两.",
          "lessonIntroEn": "Aujourd'hui, tu vas rendre les nombres “utiles” : dire ton âge, donner une date, lire l’heure, et comprendre pourquoi “2” a parfois deux formes (二 et 两).\n\nC’est le pack indispensable pour voyager, se présenter, réserver, acheter, ou simplement comprendre la vie quotidienne.\n\n## 1) Dire l’âge\nStructure :\n- 我 + nombre + 岁 (suì)\n\nExemples :\n- 我二十岁。J’ai 20 ans.\n- 他十八岁。Il a 18 ans.\n\n## 2) Dire la date\nOn enchaîne “année + mois + jour” :\n- 2026年3月3号 (ou 3日)\n\nExemples :\n- 今天是三月三号。Nous sommes le 3 mars.\n- 我五月去中国。Je vais en Chine en mai.\n\n## 3) Dire l’heure\n- …点 (diǎn) : heure\n- …分 (fēn) : minutes\n\nExemples :\n- 三点。3 heures.\n- 三点十分。3h10.\n- 三点半。3h30 (très fréquent)\n\n## 4) 二 (èr) vs 两 (liǎng)\nRègle simple (niveau 1) :\n- 二 : le chiffre “2” (compter, lire un nombre)\n- 两 : “deux” devant un classificateur ou dans certaines quantités naturelles\n\nExemples :\n- 二十 (20) mais 两个人 (deux personnes)\n- 二百 (200) est possible, mais 两百 est très courant à l’oral\n\nObjectif : être capable de dire âge/date/heure sans réfléchir, et commencer à entendre naturellement 二 vs 两.",
          "objectives": [
            "Âge : …岁 (suì)",
            "Date : …年…月…日",
            "Heure : …点…分",
            "两 s'utilise très souvent devant un classificateur (两个人, 两点)."
          ],
          "objectivesEn": [
            "Âge : …岁 (suì)",
            "Date : …年…月…日",
            "Heure : …点…分",
            "两 s'utilise très souvent devant un classificateur (两个人, 两点)."
          ]
        },
        "flashcards": [
          "岁",
          "年 / 月 / 日",
          "点 / 分",
          "我二十五岁。",
          "今天是三月三号。",
          "两点半",
          "你几岁？",
          "现在几点？",
          "我明天两点来。"
        ],
        "quizQuestions": 9
      }
    ]
  },
  {
    "id": "zh-l1-track-verbs",
    "name": "Verbes & temps (équivalent « conjugaison »)",
    "nameEn": "Verbes & temps (équivalent « conjugaison »)",
    "description": "Exprimer present, passe et futur avec les verbes et modaux.",
    "descriptionEn": "Exprimer present, passe et futur avec les verbes et modaux.",
    "icon": "⚙️",
    "color": "#10b981",
    "lessons": [
      {
        "id": "zh-l1-v01",
        "title": "Exprimer le « présent » : phrases verbales + action en cours (在/正在)",
        "titleEn": "Exprimer le « présent » : phrases verbales + action en cours (在/正在)",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "grammar",
        "difficulty": "beginner",
        "tags": [
          "verbes",
          "aspect",
          "débutant",
          "zh-l1-track-verbs"
        ],
        "introduction": {
          "title": "Exprimer le « présent » : phrases verbales + action en cours (在/正在)",
          "titleEn": "Exprimer le « présent » : phrases verbales + action en cours (在/正在)",
          "content": "Présent et progressif : phrases simples, 在/正在.",
          "contentEn": "Présent et progressif : phrases simples, 在/正在.",
          "quickIntro": "Présent et progressif : phrases simples, 在/正在.",
          "quickIntroEn": "Présent et progressif : phrases simples, 在/正在.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à parler au “présent” en mandarin, et surtout à exprimer une action en cours.\nEn chinois, il n’y a pas de conjugaison comme en français : on garde la même forme verbale, et on ajoute des petits marqueurs quand on en a besoin.\n\n## 1) Le présent “simple”\nSouvent, on dit juste :\nSujet + verbe + objet\nExemple :\n- 我学习中文。J’étudie le chinois.\n\n## 2) “Être en train de” : 在 / 正在\n- 我在学习。Je suis en train d’étudier.\n- 我正在学习。Je suis vraiment en train d’étudier (insistance)\n\nAttention : 在 peut aussi vouloir dire “être à” (lieu). Le contexte aide :\n- 我在家。Je suis à la maison.\n- 我在学中文。Je suis en train d’étudier le chinois.\n\n## 3) Expressions très utiles\n- 现在… : maintenant…\n- 今天… : aujourd’hui…\n\nObjectif : savoir décrire ce que tu fais, maintenant ou en général, sans chercher une terminaison verbale.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à parler au “présent” en mandarin, et surtout à exprimer une action en cours.\nEn chinois, il n’y a pas de conjugaison comme en français : on garde la même forme verbale, et on ajoute des petits marqueurs quand on en a besoin.\n\n## 1) Le présent “simple”\nSouvent, on dit juste :\nSujet + verbe + objet\nExemple :\n- 我学习中文。J’étudie le chinois.\n\n## 2) “Être en train de” : 在 / 正在\n- 我在学习。Je suis en train d’étudier.\n- 我正在学习。Je suis vraiment en train d’étudier (insistance)\n\nAttention : 在 peut aussi vouloir dire “être à” (lieu). Le contexte aide :\n- 我在家。Je suis à la maison.\n- 我在学中文。Je suis en train d’étudier le chinois.\n\n## 3) Expressions très utiles\n- 现在… : maintenant…\n- 今天… : aujourd’hui…\n\nObjectif : savoir décrire ce que tu fais, maintenant ou en général, sans chercher une terminaison verbale.",
          "objectives": [
            "Phrase de base : Sujet + Verbe + Objet",
            "在 / 正在 + verbe = action en cours",
            "En mandarin, on ne conjugue pas le verbe comme en français : on ajoute des marqueurs."
          ],
          "objectivesEn": [
            "Phrase de base : Sujet + Verbe + Objet",
            "在 / 正在 + verbe = action en cours",
            "En mandarin, on ne conjugue pas le verbe comme en français : on ajoute des marqueurs."
          ]
        },
        "flashcards": [
          "我吃饭。",
          "我在吃饭。",
          "我正在学习。",
          "你在做什么？",
          "我在工作。"
        ],
        "quizQuestions": 5
      },
      {
        "id": "zh-l1-v02",
        "title": "Parler du passé : 了 (base) + « ne pas » au passé (没)",
        "titleEn": "Parler du passé : 了 (base) + « ne pas » au passé (没)",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "grammar",
        "difficulty": "beginner",
        "tags": [
          "verbes",
          "passé",
          "aspect",
          "débutant",
          "zh-l1-track-verbs"
        ],
        "introduction": {
          "title": "Parler du passé : 了 (base) + « ne pas » au passé (没)",
          "titleEn": "Parler du passé : 了 (base) + « ne pas » au passé (没)",
          "content": "Passé (aspect accompli) : 了 ; négation au passé : 没.",
          "contentEn": "Passé (aspect accompli) : 了 ; négation au passé : 没.",
          "quickIntro": "Passé (aspect accompli) : 了 ; négation au passé : 没.",
          "quickIntroEn": "Passé (aspect accompli) : 了 ; négation au passé : 没.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à parler du passé au niveau débutant : “j’ai fait… / je n’ai pas fait…”.\nEn mandarin, on n’utilise pas une conjugaison du passé : on ajoute surtout 了, et on nie souvent avec 没.\n\n## 1) 了 : action accomplie (base)\nSouvent :\nVerbe + 了\nExemples :\n- 我吃了。J’ai mangé.\n- 我买了一个咖啡。J’ai acheté un café.\n\nTrès fréquent aussi :\n…了 en fin de phrase pour annoncer un changement / une information nouvelle.\nExemple :\n- 我吃饭了。J’ai mangé (c’est fait).\n\n## 2) Négation au passé : 没(有)\n- 我没去。Je ne suis pas allé(e).\n- 我没有吃。Je n’ai pas mangé.\n\n## 3) “Pas encore”\n- 我还没吃饭。Je n’ai pas encore mangé.\n\nObjectif : pouvoir raconter une action simple au passé et comprendre le duo 了 / 没, sans entrer dans les détails avancés.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à parler du passé au niveau débutant : “j’ai fait… / je n’ai pas fait…”.\nEn mandarin, on n’utilise pas une conjugaison du passé : on ajoute surtout 了, et on nie souvent avec 没.\n\n## 1) 了 : action accomplie (base)\nSouvent :\nVerbe + 了\nExemples :\n- 我吃了。J’ai mangé.\n- 我买了一个咖啡。J’ai acheté un café.\n\nTrès fréquent aussi :\n…了 en fin de phrase pour annoncer un changement / une information nouvelle.\nExemple :\n- 我吃饭了。J’ai mangé (c’est fait).\n\n## 2) Négation au passé : 没(有)\n- 我没去。Je ne suis pas allé(e).\n- 我没有吃。Je n’ai pas mangé.\n\n## 3) “Pas encore”\n- 我还没吃饭。Je n’ai pas encore mangé.\n\nObjectif : pouvoir raconter une action simple au passé et comprendre le duo 了 / 没, sans entrer dans les détails avancés.",
          "objectives": [
            "Verbe + 了 = action accomplie (souvent).",
            "没 + verbe = ne pas (avoir) fait.",
            "On avance progressivement : 了 a plusieurs usages, ici on garde le plus simple."
          ],
          "objectivesEn": [
            "Verbe + 了 = action accomplie (souvent).",
            "没 + verbe = ne pas (avoir) fait.",
            "On avance progressivement : 了 a plusieurs usages, ici on garde le plus simple."
          ]
        },
        "flashcards": [
          "我吃了。",
          "我看了电影。",
          "我没去。",
          "你吃了吗？",
          "我还没吃。"
        ],
        "quizQuestions": 5
      },
      {
        "id": "zh-l1-v03",
        "title": "Parler du futur / intentions : 要 / 会 / 想 / 可以 / 能",
        "titleEn": "Parler du futur / intentions : 要 / 会 / 想 / 可以 / 能",
        "duration": 15,
        "completed": false,
        "locked": false,
        "hskLevel": 1,
        "category": "grammar",
        "difficulty": "beginner",
        "tags": [
          "verbes",
          "futur",
          "modal",
          "débutant",
          "zh-l1-track-verbs"
        ],
        "introduction": {
          "title": "Parler du futur / intentions : 要 / 会 / 想 / 可以 / 能",
          "titleEn": "Parler du futur / intentions : 要 / 会 / 想 / 可以 / 能",
          "content": "Modaux et intention : 要, 会, 想, 可以, 能.",
          "contentEn": "Modaux et intention : 要, 会, 想, 可以, 能.",
          "quickIntro": "Modaux et intention : 要, 会, 想, 可以, 能.",
          "quickIntroEn": "Modaux et intention : 要, 会, 想, 可以, 能.",
          "lessonIntro": "Aujourd'hui, tu vas apprendre à parler du futur et des intentions : “je vais…”, “je veux…”, “je peux…”.\nEn mandarin, on utilise beaucoup de verbes/modaux pour exprimer l’intention, la possibilité ou la capacité.\n\n## 1) 要 (yào) : intention forte / “je vais…”\n- 我要去。Je vais y aller / je veux y aller.\n- 明天我要上班。Demain, je vais travailler.\n\n## 2) 会 (huì) : “savoir / être susceptible de”\n- 我会说中文。Je sais parler chinois.\n- 明天会下雨。Demain, il va probablement pleuvoir.\n\n## 3) 可以 / 能 : “pouvoir”\n- 可以 : permission / possibilité\n- 能 : capacité (physique/technique), “être capable de”\n\nExemples :\n- 我可以坐这里吗？Je peux m’asseoir ici ?\n- 我能听懂一点。Je peux (je suis capable de) comprendre un peu.\n\n## 4) 想 (xiǎng) : envie / plan\n- 我想去。J’aimerais y aller.\n\nObjectif : exprimer un futur simple, demander la permission, et parler de ce que tu sais/pas encore faire, avec des phrases très naturelles.",
          "lessonIntroEn": "Aujourd'hui, tu vas apprendre à parler du futur et des intentions : “je vais…”, “je veux…”, “je peux…”.\nEn mandarin, on utilise beaucoup de verbes/modaux pour exprimer l’intention, la possibilité ou la capacité.\n\n## 1) 要 (yào) : intention forte / “je vais…”\n- 我要去。Je vais y aller / je veux y aller.\n- 明天我要上班。Demain, je vais travailler.\n\n## 2) 会 (huì) : “savoir / être susceptible de”\n- 我会说中文。Je sais parler chinois.\n- 明天会下雨。Demain, il va probablement pleuvoir.\n\n## 3) 可以 / 能 : “pouvoir”\n- 可以 : permission / possibilité\n- 能 : capacité (physique/technique), “être capable de”\n\nExemples :\n- 我可以坐这里吗？Je peux m’asseoir ici ?\n- 我能听懂一点。Je peux (je suis capable de) comprendre un peu.\n\n## 4) 想 (xiǎng) : envie / plan\n- 我想去。J’aimerais y aller.\n\nObjectif : exprimer un futur simple, demander la permission, et parler de ce que tu sais/pas encore faire, avec des phrases très naturelles.",
          "objectives": [
            "想 = envie/intention (plutôt doux)",
            "要 = volonté forte / imminence (selon contexte)",
            "会 = savoir faire / probabilité, 能 = capacité, 可以 = permission"
          ],
          "objectivesEn": [
            "想 = envie/intention (plutôt doux)",
            "要 = volonté forte / imminence (selon contexte)",
            "会 = savoir faire / probabilité, 能 = capacité, 可以 = permission"
          ]
        },
        "flashcards": [
          "我要去。",
          "我想去。",
          "我会说中文。",
          "我能来。",
          "我可以进吗？",
          "明天我会来。",
          "我今天不能来。"
        ],
        "quizQuestions": 7
      }
    ]
  }
];

export const level1LessonWordBank: Record<string, LessonItem[]> = {
  "zh-l1-a01": [
    {
      "id": "zh-l1-a01-w01",
      "level": "hsk1",
      "hanzi": "a",
      "pinyin": "a",
      "translation": "son « a » ouvert",
      "translationFr": "son « a » ouvert",
      "category": "pronunciation",
      "explanation": "Ex. mā (mère)",
      "examples": [
        {
          "hanzi": "a",
          "pinyin": "a",
          "translation": "son « a » ouvert",
          "translationFr": "son « a » ouvert"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « a »",
        "choices": [
          "son « a » ouvert",
          "son proche de « o »",
          "son central, différent du « é »",
          "son « i »"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a01"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a01-w02",
      "level": "hsk1",
      "hanzi": "o",
      "pinyin": "o",
      "translation": "son proche de « o »",
      "translationFr": "son proche de « o »",
      "category": "pronunciation",
      "explanation": "Ex. wǒ (je/moi)",
      "examples": [
        {
          "hanzi": "o",
          "pinyin": "o",
          "translation": "son proche de « o »",
          "translationFr": "son proche de « o »"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « o »",
        "choices": [
          "son proche de « o »",
          "son « a » ouvert",
          "son central, différent du « é »",
          "son « i »"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a01"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a01-w03",
      "level": "hsk1",
      "hanzi": "e",
      "pinyin": "e",
      "translation": "son central, différent du « é »",
      "translationFr": "son central, différent du « é »",
      "category": "pronunciation",
      "explanation": "Ex. è (affamé)",
      "examples": [
        {
          "hanzi": "e",
          "pinyin": "e",
          "translation": "son central, différent du « é »",
          "translationFr": "son central, différent du « é »"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « e »",
        "choices": [
          "son central, différent du « é »",
          "son « a » ouvert",
          "son proche de « o »",
          "son « i »"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a01"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a01-w04",
      "level": "hsk1",
      "hanzi": "i",
      "pinyin": "i",
      "translation": "son « i »",
      "translationFr": "son « i »",
      "category": "pronunciation",
      "explanation": "Ex. nǐ (toi)",
      "examples": [
        {
          "hanzi": "i",
          "pinyin": "i",
          "translation": "son « i »",
          "translationFr": "son « i »"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « i »",
        "choices": [
          "son « i »",
          "son « a » ouvert",
          "son proche de « o »",
          "son central, différent du « é »"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a01"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a01-w05",
      "level": "hsk1",
      "hanzi": "u",
      "pinyin": "u",
      "translation": "son « ou »",
      "translationFr": "son « ou »",
      "category": "pronunciation",
      "explanation": "Ex. bù (ne… pas)",
      "examples": [
        {
          "hanzi": "u",
          "pinyin": "u",
          "translation": "son « ou »",
          "translationFr": "son « ou »"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « u »",
        "choices": [
          "son « ou »",
          "son « a » ouvert",
          "son proche de « o »",
          "son central, différent du « é »"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a01"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a01-w06",
      "level": "hsk1",
      "hanzi": "ü",
      "pinyin": "ü",
      "translation": "son « u » (comme en français)",
      "translationFr": "son « u » (comme en français)",
      "category": "pronunciation",
      "explanation": "Ex. lǜ (vert)",
      "examples": [
        {
          "hanzi": "ü",
          "pinyin": "ü",
          "translation": "son « u » (comme en français)",
          "translationFr": "son « u » (comme en français)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « ü »",
        "choices": [
          "son « u » (comme en français)",
          "son « a » ouvert",
          "son proche de « o »",
          "son central, différent du « é »"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a01"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a01-w07",
      "level": "hsk1",
      "hanzi": "mā / má / mǎ / mà",
      "pinyin": "mā / má / mǎ / mà",
      "translation": "La même syllabe avec 4 tons (on verra les tons ensuite).",
      "translationFr": "La même syllabe avec 4 tons (on verra les tons ensuite).",
      "category": "pronunciation",
      "examples": [
        {
          "hanzi": "mā / má / mǎ / mà",
          "pinyin": "mā / má / mǎ / mà",
          "translation": "La même syllabe avec 4 tons (on verra les tons ensuite).",
          "translationFr": "La même syllabe avec 4 tons (on verra les tons ensuite)."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « mā / má / mǎ / mà »",
        "choices": [
          "La même syllabe avec 4 tons (on verra les tons ensuite).",
          "son « a » ouvert",
          "son proche de « o »",
          "son central, différent du « é »"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a01"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a01-w08",
      "level": "hsk1",
      "hanzi": "nǐ",
      "pinyin": "nǐ",
      "translation": "toi",
      "translationFr": "toi",
      "category": "pronunciation",
      "explanation": "Exemple de syllabe simple avec i.",
      "examples": [
        {
          "hanzi": "nǐ",
          "pinyin": "nǐ",
          "translation": "toi",
          "translationFr": "toi"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « nǐ »",
        "choices": [
          "toi",
          "son « a » ouvert",
          "son proche de « o »",
          "son central, différent du « é »"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a01"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a01-w09",
      "level": "hsk1",
      "hanzi": "lǜ",
      "pinyin": "lǜ",
      "translation": "vert",
      "translationFr": "vert",
      "category": "pronunciation",
      "explanation": "Exemple avec ü.",
      "examples": [
        {
          "hanzi": "lǜ",
          "pinyin": "lǜ",
          "translation": "vert",
          "translationFr": "vert"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « lǜ »",
        "choices": [
          "vert",
          "son « a » ouvert",
          "son proche de « o »",
          "son central, différent du « é »"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a01"
      ],
      "theme": "Alphabet (Pinyin)"
    }
  ],
  "zh-l1-a02": [
    {
      "id": "zh-l1-a02-w01",
      "level": "hsk1",
      "hanzi": "b / p",
      "pinyin": "b / p",
      "translation": "paires non aspirée / aspirée",
      "translationFr": "paires non aspirée / aspirée",
      "category": "pronunciation",
      "explanation": "Ex. bā vs pā",
      "examples": [
        {
          "hanzi": "b / p",
          "pinyin": "b / p",
          "translation": "paires non aspirée / aspirée",
          "translationFr": "paires non aspirée / aspirée"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « b / p »",
        "choices": [
          "paires non aspirée / aspirée",
          "série rétroflexe",
          "série alvéolaire",
          "série palatale"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a02"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a02-w02",
      "level": "hsk1",
      "hanzi": "d / t",
      "pinyin": "d / t",
      "translation": "paires non aspirée / aspirée",
      "translationFr": "paires non aspirée / aspirée",
      "category": "pronunciation",
      "explanation": "Ex. dà vs tà (rare)",
      "examples": [
        {
          "hanzi": "d / t",
          "pinyin": "d / t",
          "translation": "paires non aspirée / aspirée",
          "translationFr": "paires non aspirée / aspirée"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « d / t »",
        "choices": [
          "paires non aspirée / aspirée",
          "série rétroflexe",
          "série alvéolaire",
          "série palatale"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a02"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a02-w03",
      "level": "hsk1",
      "hanzi": "g / k",
      "pinyin": "g / k",
      "translation": "paires non aspirée / aspirée",
      "translationFr": "paires non aspirée / aspirée",
      "category": "pronunciation",
      "explanation": "Ex. gē vs kē",
      "examples": [
        {
          "hanzi": "g / k",
          "pinyin": "g / k",
          "translation": "paires non aspirée / aspirée",
          "translationFr": "paires non aspirée / aspirée"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « g / k »",
        "choices": [
          "paires non aspirée / aspirée",
          "série rétroflexe",
          "série alvéolaire",
          "série palatale"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a02"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a02-w04",
      "level": "hsk1",
      "hanzi": "zh / ch / sh",
      "pinyin": "zh / ch / sh",
      "translation": "série rétroflexe",
      "translationFr": "série rétroflexe",
      "category": "pronunciation",
      "explanation": "Ex. zhōng, chī, shì",
      "examples": [
        {
          "hanzi": "zh / ch / sh",
          "pinyin": "zh / ch / sh",
          "translation": "série rétroflexe",
          "translationFr": "série rétroflexe"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « zh / ch / sh »",
        "choices": [
          "série rétroflexe",
          "paires non aspirée / aspirée",
          "série alvéolaire",
          "série palatale"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a02"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a02-w05",
      "level": "hsk1",
      "hanzi": "z / c / s",
      "pinyin": "z / c / s",
      "translation": "série alvéolaire",
      "translationFr": "série alvéolaire",
      "category": "pronunciation",
      "explanation": "Ex. zài, cì, sān",
      "examples": [
        {
          "hanzi": "z / c / s",
          "pinyin": "z / c / s",
          "translation": "série alvéolaire",
          "translationFr": "série alvéolaire"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « z / c / s »",
        "choices": [
          "série alvéolaire",
          "paires non aspirée / aspirée",
          "série rétroflexe",
          "série palatale"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a02"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a02-w06",
      "level": "hsk1",
      "hanzi": "j / q / x",
      "pinyin": "j / q / x",
      "translation": "série palatale",
      "translationFr": "série palatale",
      "category": "pronunciation",
      "explanation": "Ex. jiā, qù, xiè",
      "examples": [
        {
          "hanzi": "j / q / x",
          "pinyin": "j / q / x",
          "translation": "série palatale",
          "translationFr": "série palatale"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « j / q / x »",
        "choices": [
          "série palatale",
          "paires non aspirée / aspirée",
          "série rétroflexe",
          "série alvéolaire"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a02"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a02-w07",
      "level": "hsk1",
      "hanzi": "bā / pā",
      "pinyin": "bā / pā",
      "translation": "ba / pa (différence surtout sur le souffle).",
      "translationFr": "ba / pa (différence surtout sur le souffle).",
      "category": "pronunciation",
      "examples": [
        {
          "hanzi": "bā / pā",
          "pinyin": "bā / pā",
          "translation": "ba / pa (différence surtout sur le souffle).",
          "translationFr": "ba / pa (différence surtout sur le souffle)."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « bā / pā »",
        "choices": [
          "ba / pa (différence surtout sur le souffle).",
          "paires non aspirée / aspirée",
          "série rétroflexe",
          "série alvéolaire"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a02"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a02-w08",
      "level": "hsk1",
      "hanzi": "zhōng / zōng",
      "pinyin": "zhōng / zōng",
      "translation": "zh vs z : deux sons différents.",
      "translationFr": "zh vs z : deux sons différents.",
      "category": "pronunciation",
      "examples": [
        {
          "hanzi": "zhōng / zōng",
          "pinyin": "zhōng / zōng",
          "translation": "zh vs z : deux sons différents.",
          "translationFr": "zh vs z : deux sons différents."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « zhōng / zōng »",
        "choices": [
          "zh vs z : deux sons différents.",
          "paires non aspirée / aspirée",
          "série rétroflexe",
          "série alvéolaire"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a02"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a02-w09",
      "level": "hsk1",
      "hanzi": "qù",
      "pinyin": "qù",
      "translation": "aller",
      "translationFr": "aller",
      "category": "pronunciation",
      "explanation": "q est aspiré.",
      "examples": [
        {
          "hanzi": "qù",
          "pinyin": "qù",
          "translation": "aller",
          "translationFr": "aller"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « qù »",
        "choices": [
          "aller",
          "paires non aspirée / aspirée",
          "série rétroflexe",
          "série alvéolaire"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a02"
      ],
      "theme": "Alphabet (Pinyin)"
    }
  ],
  "zh-l1-a03": [
    {
      "id": "zh-l1-a03-w01",
      "level": "hsk1",
      "hanzi": "mā",
      "pinyin": "mā",
      "translation": "mère",
      "translationFr": "mère",
      "category": "pronunciation",
      "explanation": "1er ton",
      "examples": [
        {
          "hanzi": "mā",
          "pinyin": "mā",
          "translation": "mère",
          "translationFr": "mère"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « mā »",
        "choices": [
          "mère",
          "chanvre",
          "cheval",
          "gronder"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "tons",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a03"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a03-w02",
      "level": "hsk1",
      "hanzi": "má",
      "pinyin": "má",
      "translation": "chanvre",
      "translationFr": "chanvre",
      "category": "pronunciation",
      "explanation": "2e ton",
      "examples": [
        {
          "hanzi": "má",
          "pinyin": "má",
          "translation": "chanvre",
          "translationFr": "chanvre"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « má »",
        "choices": [
          "chanvre",
          "mère",
          "cheval",
          "gronder"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "tons",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a03"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a03-w03",
      "level": "hsk1",
      "hanzi": "mǎ",
      "pinyin": "mǎ",
      "translation": "cheval",
      "translationFr": "cheval",
      "category": "pronunciation",
      "explanation": "3e ton",
      "examples": [
        {
          "hanzi": "mǎ",
          "pinyin": "mǎ",
          "translation": "cheval",
          "translationFr": "cheval"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « mǎ »",
        "choices": [
          "cheval",
          "mère",
          "chanvre",
          "gronder"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "tons",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a03"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a03-w04",
      "level": "hsk1",
      "hanzi": "mà",
      "pinyin": "mà",
      "translation": "gronder",
      "translationFr": "gronder",
      "category": "pronunciation",
      "explanation": "4e ton",
      "examples": [
        {
          "hanzi": "mà",
          "pinyin": "mà",
          "translation": "gronder",
          "translationFr": "gronder"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « mà »",
        "choices": [
          "gronder",
          "mère",
          "chanvre",
          "cheval"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "tons",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a03"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a03-w05",
      "level": "hsk1",
      "hanzi": "ma",
      "pinyin": "ma",
      "translation": "particule de question (souvent neutre)",
      "translationFr": "particule de question (souvent neutre)",
      "category": "pronunciation",
      "explanation": "ton neutre",
      "examples": [
        {
          "hanzi": "ma",
          "pinyin": "ma",
          "translation": "particule de question (souvent neutre)",
          "translationFr": "particule de question (souvent neutre)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « ma »",
        "choices": [
          "particule de question (souvent neutre)",
          "mère",
          "chanvre",
          "cheval"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "tons",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a03"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a03-w06",
      "level": "hsk1",
      "hanzi": "你好吗？",
      "pinyin": "nǐ hǎo ma?",
      "translation": "Ça va ? / Comment ça va ?",
      "translationFr": "Ça va ? / Comment ça va ?",
      "category": "pronunciation",
      "explanation": "ma est souvent léger/neutre.",
      "examples": [
        {
          "hanzi": "你好吗？",
          "pinyin": "nǐ hǎo ma?",
          "translation": "Ça va ? / Comment ça va ?",
          "translationFr": "Ça va ? / Comment ça va ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你好吗？ »",
        "choices": [
          "Ça va ? / Comment ça va ?",
          "mère",
          "chanvre",
          "cheval"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "tons",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a03"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a03-w07",
      "level": "hsk1",
      "hanzi": "我很好。",
      "pinyin": "wǒ hěn hǎo.",
      "translation": "Je vais très bien.",
      "translationFr": "Je vais très bien.",
      "category": "pronunciation",
      "explanation": "hěn sert souvent à relier sujet + adjectif.",
      "examples": [
        {
          "hanzi": "我很好。",
          "pinyin": "wǒ hěn hǎo.",
          "translation": "Je vais très bien.",
          "translationFr": "Je vais très bien."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我很好。 »",
        "choices": [
          "Je vais très bien.",
          "mère",
          "chanvre",
          "cheval"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "tons",
        "prononciation",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a03"
      ],
      "theme": "Alphabet (Pinyin)"
    }
  ],
  "zh-l1-a04": [
    {
      "id": "zh-l1-a04-w01",
      "level": "hsk1",
      "hanzi": "你好",
      "pinyin": "nǐ hǎo",
      "translation": "bonjour",
      "translationFr": "bonjour",
      "category": "pronunciation",
      "explanation": "Première expression complète.",
      "examples": [
        {
          "hanzi": "你好",
          "pinyin": "nǐ hǎo",
          "translation": "bonjour",
          "translationFr": "bonjour"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你好 »",
        "choices": [
          "bonjour",
          "merci",
          "ce n'est pas",
          "un (classificateur général)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "lecture",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a04"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a04-w02",
      "level": "hsk1",
      "hanzi": "谢谢",
      "pinyin": "xièxie",
      "translation": "merci",
      "translationFr": "merci",
      "category": "pronunciation",
      "explanation": "Le 2e « xie » est souvent plus léger.",
      "examples": [
        {
          "hanzi": "谢谢",
          "pinyin": "xièxie",
          "translation": "merci",
          "translationFr": "merci"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 谢谢 »",
        "choices": [
          "merci",
          "bonjour",
          "ce n'est pas",
          "un (classificateur général)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "lecture",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a04"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a04-w03",
      "level": "hsk1",
      "hanzi": "不是",
      "pinyin": "bú shì",
      "translation": "ce n'est pas",
      "translationFr": "ce n'est pas",
      "category": "pronunciation",
      "explanation": "Ton de 不 change devant shì (4e ton).",
      "examples": [
        {
          "hanzi": "不是",
          "pinyin": "bú shì",
          "translation": "ce n'est pas",
          "translationFr": "ce n'est pas"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 不是 »",
        "choices": [
          "ce n'est pas",
          "bonjour",
          "merci",
          "un (classificateur général)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "lecture",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a04"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a04-w04",
      "level": "hsk1",
      "hanzi": "一个",
      "pinyin": "yí ge",
      "translation": "un (classificateur général)",
      "translationFr": "un (classificateur général)",
      "category": "pronunciation",
      "explanation": "Dans la parole, on entend souvent « yí ge ».",
      "examples": [
        {
          "hanzi": "一个",
          "pinyin": "yí ge",
          "translation": "un (classificateur général)",
          "translationFr": "un (classificateur général)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 一个 »",
        "choices": [
          "un (classificateur général)",
          "bonjour",
          "merci",
          "ce n'est pas"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "lecture",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a04"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a04-w05",
      "level": "hsk1",
      "hanzi": "你好！",
      "pinyin": "nǐ hǎo!",
      "translation": "Bonjour !",
      "translationFr": "Bonjour !",
      "category": "pronunciation",
      "examples": [
        {
          "hanzi": "你好！",
          "pinyin": "nǐ hǎo!",
          "translation": "Bonjour !",
          "translationFr": "Bonjour !"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你好！ »",
        "choices": [
          "Bonjour !",
          "bonjour",
          "merci",
          "ce n'est pas"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "lecture",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a04"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a04-w06",
      "level": "hsk1",
      "hanzi": "谢谢你。",
      "pinyin": "xièxie nǐ.",
      "translation": "Merci à toi.",
      "translationFr": "Merci à toi.",
      "category": "pronunciation",
      "examples": [
        {
          "hanzi": "谢谢你。",
          "pinyin": "xièxie nǐ.",
          "translation": "Merci à toi.",
          "translationFr": "Merci à toi."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 谢谢你。 »",
        "choices": [
          "Merci à toi.",
          "bonjour",
          "merci",
          "ce n'est pas"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "lecture",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a04"
      ],
      "theme": "Alphabet (Pinyin)"
    },
    {
      "id": "zh-l1-a04-w07",
      "level": "hsk1",
      "hanzi": "这不是我的。",
      "pinyin": "zhè bú shì wǒ de.",
      "translation": "Ce n'est pas à moi.",
      "translationFr": "Ce n'est pas à moi.",
      "category": "pronunciation",
      "examples": [
        {
          "hanzi": "这不是我的。",
          "pinyin": "zhè bú shì wǒ de.",
          "translation": "Ce n'est pas à moi.",
          "translationFr": "Ce n'est pas à moi."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这不是我的。 »",
        "choices": [
          "Ce n'est pas à moi.",
          "bonjour",
          "merci",
          "ce n'est pas"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "pinyin",
        "prononciation",
        "lecture",
        "zh-l1-track-alphabet",
        "lesson:zh-l1-a04"
      ],
      "theme": "Alphabet (Pinyin)"
    }
  ],
  "zh-l1-c01": [
    {
      "id": "zh-l1-c01-w01",
      "level": "hsk1",
      "hanzi": "你好",
      "pinyin": "nǐ hǎo",
      "translation": "Bonjour",
      "translationFr": "Bonjour",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "你好",
          "pinyin": "nǐ hǎo",
          "translation": "Bonjour",
          "translationFr": "Bonjour"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你好 »",
        "choices": [
          "Bonjour",
          "Bonjour (matin)",
          "Merci",
          "De rien / Je t'en prie"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c01"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c01-w02",
      "level": "hsk1",
      "hanzi": "早上好",
      "pinyin": "zǎoshang hǎo",
      "translation": "Bonjour (matin)",
      "translationFr": "Bonjour (matin)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "早上好",
          "pinyin": "zǎoshang hǎo",
          "translation": "Bonjour (matin)",
          "translationFr": "Bonjour (matin)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 早上好 »",
        "choices": [
          "Bonjour (matin)",
          "Bonjour",
          "Merci",
          "De rien / Je t'en prie"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c01"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c01-w03",
      "level": "hsk1",
      "hanzi": "谢谢",
      "pinyin": "xièxie",
      "translation": "Merci",
      "translationFr": "Merci",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "谢谢",
          "pinyin": "xièxie",
          "translation": "Merci",
          "translationFr": "Merci"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 谢谢 »",
        "choices": [
          "Merci",
          "Bonjour",
          "Bonjour (matin)",
          "De rien / Je t'en prie"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c01"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c01-w04",
      "level": "hsk1",
      "hanzi": "不客气",
      "pinyin": "bú kèqi",
      "translation": "De rien / Je t'en prie",
      "translationFr": "De rien / Je t'en prie",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "不客气",
          "pinyin": "bú kèqi",
          "translation": "De rien / Je t'en prie",
          "translationFr": "De rien / Je t'en prie"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 不客气 »",
        "choices": [
          "De rien / Je t'en prie",
          "Bonjour",
          "Bonjour (matin)",
          "Merci"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c01"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c01-w05",
      "level": "hsk1",
      "hanzi": "你好！",
      "pinyin": "nǐ hǎo!",
      "translation": "Bonjour !",
      "translationFr": "Bonjour !",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "你好！",
          "pinyin": "nǐ hǎo!",
          "translation": "Bonjour !",
          "translationFr": "Bonjour !"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你好！ »",
        "choices": [
          "Bonjour !",
          "Bonjour",
          "Bonjour (matin)",
          "Merci"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c01"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c01-w06",
      "level": "hsk1",
      "hanzi": "谢谢！",
      "pinyin": "xièxie!",
      "translation": "Merci !",
      "translationFr": "Merci !",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "谢谢！",
          "pinyin": "xièxie!",
          "translation": "Merci !",
          "translationFr": "Merci !"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 谢谢！ »",
        "choices": [
          "Merci !",
          "Bonjour",
          "Bonjour (matin)",
          "Merci"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c01"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c01-w07",
      "level": "hsk1",
      "hanzi": "不客气。",
      "pinyin": "bú kèqi.",
      "translation": "De rien.",
      "translationFr": "De rien.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "不客气。",
          "pinyin": "bú kèqi.",
          "translation": "De rien.",
          "translationFr": "De rien."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 不客气。 »",
        "choices": [
          "De rien.",
          "Bonjour",
          "Bonjour (matin)",
          "Merci"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c01"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c02": [
    {
      "id": "zh-l1-c02-w01",
      "level": "hsk1",
      "hanzi": "是",
      "pinyin": "shì",
      "translation": "Oui / C'est ça (affirmation)",
      "translationFr": "Oui / C'est ça (affirmation)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "是",
          "pinyin": "shì",
          "translation": "Oui / C'est ça (affirmation)",
          "translationFr": "Oui / C'est ça (affirmation)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 是 »",
        "choices": [
          "Oui / C'est ça (affirmation)",
          "Non / Ce n'est pas",
          "Oui / C'est correct",
          "Non / Ce n'est pas correct"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c02"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c02-w02",
      "level": "hsk1",
      "hanzi": "不是",
      "pinyin": "bú shì",
      "translation": "Non / Ce n'est pas",
      "translationFr": "Non / Ce n'est pas",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "不是",
          "pinyin": "bú shì",
          "translation": "Non / Ce n'est pas",
          "translationFr": "Non / Ce n'est pas"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 不是 »",
        "choices": [
          "Non / Ce n'est pas",
          "Oui / C'est ça (affirmation)",
          "Oui / C'est correct",
          "Non / Ce n'est pas correct"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c02"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c02-w03",
      "level": "hsk1",
      "hanzi": "对",
      "pinyin": "duì",
      "translation": "Oui / C'est correct",
      "translationFr": "Oui / C'est correct",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "对",
          "pinyin": "duì",
          "translation": "Oui / C'est correct",
          "translationFr": "Oui / C'est correct"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 对 »",
        "choices": [
          "Oui / C'est correct",
          "Oui / C'est ça (affirmation)",
          "Non / Ce n'est pas",
          "Non / Ce n'est pas correct"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c02"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c02-w04",
      "level": "hsk1",
      "hanzi": "不对",
      "pinyin": "bú duì",
      "translation": "Non / Ce n'est pas correct",
      "translationFr": "Non / Ce n'est pas correct",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "不对",
          "pinyin": "bú duì",
          "translation": "Non / Ce n'est pas correct",
          "translationFr": "Non / Ce n'est pas correct"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 不对 »",
        "choices": [
          "Non / Ce n'est pas correct",
          "Oui / C'est ça (affirmation)",
          "Non / Ce n'est pas",
          "Oui / C'est correct"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c02"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c02-w05",
      "level": "hsk1",
      "hanzi": "好",
      "pinyin": "hǎo",
      "translation": "D'accord / OK",
      "translationFr": "D'accord / OK",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "好",
          "pinyin": "hǎo",
          "translation": "D'accord / OK",
          "translationFr": "D'accord / OK"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 好 »",
        "choices": [
          "D'accord / OK",
          "Oui / C'est ça (affirmation)",
          "Non / Ce n'est pas",
          "Oui / C'est correct"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c02"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c02-w06",
      "level": "hsk1",
      "hanzi": "你是学生吗？",
      "pinyin": "nǐ shì xuéshēng ma?",
      "translation": "Tu es étudiant(e) ?",
      "translationFr": "Tu es étudiant(e) ?",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "你是学生吗？",
          "pinyin": "nǐ shì xuéshēng ma?",
          "translation": "Tu es étudiant(e) ?",
          "translationFr": "Tu es étudiant(e) ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你是学生吗？ »",
        "choices": [
          "Tu es étudiant(e) ?",
          "Oui / C'est ça (affirmation)",
          "Non / Ce n'est pas",
          "Oui / C'est correct"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c02"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c02-w07",
      "level": "hsk1",
      "hanzi": "是。",
      "pinyin": "shì.",
      "translation": "Oui.",
      "translationFr": "Oui.",
      "category": "conversation",
      "explanation": "Réponse courte",
      "examples": [
        {
          "hanzi": "是。",
          "pinyin": "shì.",
          "translation": "Oui.",
          "translationFr": "Oui."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 是。 »",
        "choices": [
          "Oui.",
          "Oui / C'est ça (affirmation)",
          "Non / Ce n'est pas",
          "Oui / C'est correct"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c02"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c02-w08",
      "level": "hsk1",
      "hanzi": "不对。",
      "pinyin": "bú duì.",
      "translation": "Ce n'est pas correct.",
      "translationFr": "Ce n'est pas correct.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "不对。",
          "pinyin": "bú duì.",
          "translation": "Ce n'est pas correct.",
          "translationFr": "Ce n'est pas correct."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 不对。 »",
        "choices": [
          "Ce n'est pas correct.",
          "Oui / C'est ça (affirmation)",
          "Non / Ce n'est pas",
          "Oui / C'est correct"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c02"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c03": [
    {
      "id": "zh-l1-c03-w01",
      "level": "hsk1",
      "hanzi": "再见",
      "pinyin": "zàijiàn",
      "translation": "Au revoir",
      "translationFr": "Au revoir",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "再见",
          "pinyin": "zàijiàn",
          "translation": "Au revoir",
          "translationFr": "Au revoir"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 再见 »",
        "choices": [
          "Au revoir",
          "Bye bye (familier)",
          "À demain",
          "À plus tard"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c03"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c03-w02",
      "level": "hsk1",
      "hanzi": "拜拜",
      "pinyin": "báibái",
      "translation": "Bye bye (familier)",
      "translationFr": "Bye bye (familier)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "拜拜",
          "pinyin": "báibái",
          "translation": "Bye bye (familier)",
          "translationFr": "Bye bye (familier)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 拜拜 »",
        "choices": [
          "Bye bye (familier)",
          "Au revoir",
          "À demain",
          "À plus tard"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c03"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c03-w03",
      "level": "hsk1",
      "hanzi": "明天见",
      "pinyin": "míngtiān jiàn",
      "translation": "À demain",
      "translationFr": "À demain",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "明天见",
          "pinyin": "míngtiān jiàn",
          "translation": "À demain",
          "translationFr": "À demain"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 明天见 »",
        "choices": [
          "À demain",
          "Au revoir",
          "Bye bye (familier)",
          "À plus tard"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c03"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c03-w04",
      "level": "hsk1",
      "hanzi": "回头见",
      "pinyin": "huítóu jiàn",
      "translation": "À plus tard",
      "translationFr": "À plus tard",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "回头见",
          "pinyin": "huítóu jiàn",
          "translation": "À plus tard",
          "translationFr": "À plus tard"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 回头见 »",
        "choices": [
          "À plus tard",
          "Au revoir",
          "Bye bye (familier)",
          "À demain"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c03"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c03-w05",
      "level": "hsk1",
      "hanzi": "我先走了，再见！",
      "pinyin": "wǒ xiān zǒu le, zàijiàn!",
      "translation": "Je dois y aller, au revoir !",
      "translationFr": "Je dois y aller, au revoir !",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我先走了，再见！",
          "pinyin": "wǒ xiān zǒu le, zàijiàn!",
          "translation": "Je dois y aller, au revoir !",
          "translationFr": "Je dois y aller, au revoir !"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我先走了，再见！ »",
        "choices": [
          "Je dois y aller, au revoir !",
          "Au revoir",
          "Bye bye (familier)",
          "À demain"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c03"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c03-w06",
      "level": "hsk1",
      "hanzi": "明天见。",
      "pinyin": "míngtiān jiàn.",
      "translation": "À demain.",
      "translationFr": "À demain.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "明天见。",
          "pinyin": "míngtiān jiàn.",
          "translation": "À demain.",
          "translationFr": "À demain."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 明天见。 »",
        "choices": [
          "À demain.",
          "Au revoir",
          "Bye bye (familier)",
          "À demain"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c03"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c04": [
    {
      "id": "zh-l1-c04-w01",
      "level": "hsk1",
      "hanzi": "对不起",
      "pinyin": "duìbuqǐ",
      "translation": "Désolé(e) / Pardon (excuse)",
      "translationFr": "Désolé(e) / Pardon (excuse)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "对不起",
          "pinyin": "duìbuqǐ",
          "translation": "Désolé(e) / Pardon (excuse)",
          "translationFr": "Désolé(e) / Pardon (excuse)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 对不起 »",
        "choices": [
          "Désolé(e) / Pardon (excuse)",
          "Désolé(e) / Pardon (gêne)",
          "Excusez-moi, puis-je demander…",
          "Désolé de te déranger / Je te sollicite"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c04"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c04-w02",
      "level": "hsk1",
      "hanzi": "不好意思",
      "pinyin": "bù hǎoyìsi",
      "translation": "Désolé(e) / Pardon (gêne)",
      "translationFr": "Désolé(e) / Pardon (gêne)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "不好意思",
          "pinyin": "bù hǎoyìsi",
          "translation": "Désolé(e) / Pardon (gêne)",
          "translationFr": "Désolé(e) / Pardon (gêne)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 不好意思 »",
        "choices": [
          "Désolé(e) / Pardon (gêne)",
          "Désolé(e) / Pardon (excuse)",
          "Excusez-moi, puis-je demander…",
          "Désolé de te déranger / Je te sollicite"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c04"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c04-w03",
      "level": "hsk1",
      "hanzi": "请问",
      "pinyin": "qǐngwèn",
      "translation": "Excusez-moi, puis-je demander…",
      "translationFr": "Excusez-moi, puis-je demander…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "请问",
          "pinyin": "qǐngwèn",
          "translation": "Excusez-moi, puis-je demander…",
          "translationFr": "Excusez-moi, puis-je demander…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 请问 »",
        "choices": [
          "Excusez-moi, puis-je demander…",
          "Désolé(e) / Pardon (excuse)",
          "Désolé(e) / Pardon (gêne)",
          "Désolé de te déranger / Je te sollicite"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c04"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c04-w04",
      "level": "hsk1",
      "hanzi": "麻烦你",
      "pinyin": "máfan nǐ",
      "translation": "Désolé de te déranger / Je te sollicite",
      "translationFr": "Désolé de te déranger / Je te sollicite",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "麻烦你",
          "pinyin": "máfan nǐ",
          "translation": "Désolé de te déranger / Je te sollicite",
          "translationFr": "Désolé de te déranger / Je te sollicite"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 麻烦你 »",
        "choices": [
          "Désolé de te déranger / Je te sollicite",
          "Désolé(e) / Pardon (excuse)",
          "Désolé(e) / Pardon (gêne)",
          "Excusez-moi, puis-je demander…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c04"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c04-w05",
      "level": "hsk1",
      "hanzi": "喂",
      "pinyin": "wèi",
      "translation": "Allô (téléphone)",
      "translationFr": "Allô (téléphone)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "喂",
          "pinyin": "wèi",
          "translation": "Allô (téléphone)",
          "translationFr": "Allô (téléphone)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 喂 »",
        "choices": [
          "Allô (téléphone)",
          "Désolé(e) / Pardon (excuse)",
          "Désolé(e) / Pardon (gêne)",
          "Excusez-moi, puis-je demander…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c04"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c04-w06",
      "level": "hsk1",
      "hanzi": "对不起，我迟到了。",
      "pinyin": "duìbuqǐ, wǒ chídào le.",
      "translation": "Désolé, je suis en retard.",
      "translationFr": "Désolé, je suis en retard.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "对不起，我迟到了。",
          "pinyin": "duìbuqǐ, wǒ chídào le.",
          "translation": "Désolé, je suis en retard.",
          "translationFr": "Désolé, je suis en retard."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 对不起，我迟到了。 »",
        "choices": [
          "Désolé, je suis en retard.",
          "Désolé(e) / Pardon (excuse)",
          "Désolé(e) / Pardon (gêne)",
          "Excusez-moi, puis-je demander…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c04"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c04-w07",
      "level": "hsk1",
      "hanzi": "请问，厕所在哪儿？",
      "pinyin": "qǐngwèn, cèsuǒ zài nǎr?",
      "translation": "Excusez-moi, où sont les toilettes ?",
      "translationFr": "Excusez-moi, où sont les toilettes ?",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "请问，厕所在哪儿？",
          "pinyin": "qǐngwèn, cèsuǒ zài nǎr?",
          "translation": "Excusez-moi, où sont les toilettes ?",
          "translationFr": "Excusez-moi, où sont les toilettes ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 请问，厕所在哪儿？ »",
        "choices": [
          "Excusez-moi, où sont les toilettes ?",
          "Désolé(e) / Pardon (excuse)",
          "Désolé(e) / Pardon (gêne)",
          "Excusez-moi, puis-je demander…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c04"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c05": [
    {
      "id": "zh-l1-c05-w01",
      "level": "hsk1",
      "hanzi": "我是…",
      "pinyin": "wǒ shì …",
      "translation": "Je suis…",
      "translationFr": "Je suis…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我是…",
          "pinyin": "wǒ shì …",
          "translation": "Je suis…",
          "translationFr": "Je suis…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我是… »",
        "choices": [
          "Je suis…",
          "Je m'appelle…",
          "C'est… (ceci)",
          "C'est… (cela)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c05"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c05-w02",
      "level": "hsk1",
      "hanzi": "我叫…",
      "pinyin": "wǒ jiào …",
      "translation": "Je m'appelle…",
      "translationFr": "Je m'appelle…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我叫…",
          "pinyin": "wǒ jiào …",
          "translation": "Je m'appelle…",
          "translationFr": "Je m'appelle…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我叫… »",
        "choices": [
          "Je m'appelle…",
          "Je suis…",
          "C'est… (ceci)",
          "C'est… (cela)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c05"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c05-w03",
      "level": "hsk1",
      "hanzi": "这是…",
      "pinyin": "zhè shì …",
      "translation": "C'est… (ceci)",
      "translationFr": "C'est… (ceci)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这是…",
          "pinyin": "zhè shì …",
          "translation": "C'est… (ceci)",
          "translationFr": "C'est… (ceci)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这是… »",
        "choices": [
          "C'est… (ceci)",
          "Je suis…",
          "Je m'appelle…",
          "C'est… (cela)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c05"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c05-w04",
      "level": "hsk1",
      "hanzi": "那是…",
      "pinyin": "nà shì …",
      "translation": "C'est… (cela)",
      "translationFr": "C'est… (cela)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "那是…",
          "pinyin": "nà shì …",
          "translation": "C'est… (cela)",
          "translationFr": "C'est… (cela)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 那是… »",
        "choices": [
          "C'est… (cela)",
          "Je suis…",
          "Je m'appelle…",
          "C'est… (ceci)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c05"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c05-w05",
      "level": "hsk1",
      "hanzi": "吗",
      "pinyin": "ma",
      "translation": "particule de question oui/non",
      "translationFr": "particule de question oui/non",
      "category": "conversation",
      "explanation": "À placer en fin de phrase.",
      "examples": [
        {
          "hanzi": "吗",
          "pinyin": "ma",
          "translation": "particule de question oui/non",
          "translationFr": "particule de question oui/non"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 吗 »",
        "choices": [
          "particule de question oui/non",
          "Je suis…",
          "Je m'appelle…",
          "C'est… (ceci)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c05"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c05-w06",
      "level": "hsk1",
      "hanzi": "我是法国人。",
      "pinyin": "wǒ shì Fǎguórén.",
      "translation": "Je suis Français(e).",
      "translationFr": "Je suis Français(e).",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我是法国人。",
          "pinyin": "wǒ shì Fǎguórén.",
          "translation": "Je suis Français(e).",
          "translationFr": "Je suis Français(e)."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我是法国人。 »",
        "choices": [
          "Je suis Français(e).",
          "Je suis…",
          "Je m'appelle…",
          "C'est… (ceci)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c05"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c05-w07",
      "level": "hsk1",
      "hanzi": "我叫Perrine。",
      "pinyin": "wǒ jiào Perrine.",
      "translation": "Je m'appelle Perrine.",
      "translationFr": "Je m'appelle Perrine.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我叫Perrine。",
          "pinyin": "wǒ jiào Perrine.",
          "translation": "Je m'appelle Perrine.",
          "translationFr": "Je m'appelle Perrine."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我叫Perrine。 »",
        "choices": [
          "Je m'appelle Perrine.",
          "Je suis…",
          "Je m'appelle…",
          "C'est… (ceci)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c05"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c05-w08",
      "level": "hsk1",
      "hanzi": "你是学生吗？",
      "pinyin": "nǐ shì xuéshēng ma?",
      "translation": "Tu es étudiant(e) ?",
      "translationFr": "Tu es étudiant(e) ?",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "你是学生吗？",
          "pinyin": "nǐ shì xuéshēng ma?",
          "translation": "Tu es étudiant(e) ?",
          "translationFr": "Tu es étudiant(e) ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你是学生吗？ »",
        "choices": [
          "Tu es étudiant(e) ?",
          "Je suis…",
          "Je m'appelle…",
          "C'est… (ceci)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c05"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c06": [
    {
      "id": "zh-l1-c06-w01",
      "level": "hsk1",
      "hanzi": "这是什么？",
      "pinyin": "zhè shì shénme?",
      "translation": "Qu'est-ce que c'est ? (ceci)",
      "translationFr": "Qu'est-ce que c'est ? (ceci)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这是什么？",
          "pinyin": "zhè shì shénme?",
          "translation": "Qu'est-ce que c'est ? (ceci)",
          "translationFr": "Qu'est-ce que c'est ? (ceci)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这是什么？ »",
        "choices": [
          "Qu'est-ce que c'est ? (ceci)",
          "Qu'est-ce que c'est ? (cela)",
          "C'est… (ceci)",
          "C'est… (cela)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c06"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c06-w02",
      "level": "hsk1",
      "hanzi": "那是什么？",
      "pinyin": "nà shì shénme?",
      "translation": "Qu'est-ce que c'est ? (cela)",
      "translationFr": "Qu'est-ce que c'est ? (cela)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "那是什么？",
          "pinyin": "nà shì shénme?",
          "translation": "Qu'est-ce que c'est ? (cela)",
          "translationFr": "Qu'est-ce que c'est ? (cela)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 那是什么？ »",
        "choices": [
          "Qu'est-ce que c'est ? (cela)",
          "Qu'est-ce que c'est ? (ceci)",
          "C'est… (ceci)",
          "C'est… (cela)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c06"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c06-w03",
      "level": "hsk1",
      "hanzi": "这是…",
      "pinyin": "zhè shì …",
      "translation": "C'est… (ceci)",
      "translationFr": "C'est… (ceci)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这是…",
          "pinyin": "zhè shì …",
          "translation": "C'est… (ceci)",
          "translationFr": "C'est… (ceci)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这是… »",
        "choices": [
          "C'est… (ceci)",
          "Qu'est-ce que c'est ? (ceci)",
          "Qu'est-ce que c'est ? (cela)",
          "C'est… (cela)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c06"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c06-w04",
      "level": "hsk1",
      "hanzi": "那是…",
      "pinyin": "nà shì …",
      "translation": "C'est… (cela)",
      "translationFr": "C'est… (cela)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "那是…",
          "pinyin": "nà shì …",
          "translation": "C'est… (cela)",
          "translationFr": "C'est… (cela)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 那是… »",
        "choices": [
          "C'est… (cela)",
          "Qu'est-ce que c'est ? (ceci)",
          "Qu'est-ce que c'est ? (cela)",
          "C'est… (ceci)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c06"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c06-w05",
      "level": "hsk1",
      "hanzi": "什么",
      "pinyin": "shénme",
      "translation": "quoi / quel(le)",
      "translationFr": "quoi / quel(le)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "什么",
          "pinyin": "shénme",
          "translation": "quoi / quel(le)",
          "translationFr": "quoi / quel(le)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 什么 »",
        "choices": [
          "quoi / quel(le)",
          "Qu'est-ce que c'est ? (ceci)",
          "Qu'est-ce que c'est ? (cela)",
          "C'est… (ceci)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c06"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c06-w06",
      "level": "hsk1",
      "hanzi": "这是什么？",
      "pinyin": "zhè shì shénme?",
      "translation": "Qu'est-ce que c'est ?",
      "translationFr": "Qu'est-ce que c'est ?",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这是什么？",
          "pinyin": "zhè shì shénme?",
          "translation": "Qu'est-ce que c'est ?",
          "translationFr": "Qu'est-ce que c'est ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这是什么？ »",
        "choices": [
          "Qu'est-ce que c'est ?",
          "Qu'est-ce que c'est ? (ceci)",
          "Qu'est-ce que c'est ? (cela)",
          "C'est… (ceci)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c06"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c06-w07",
      "level": "hsk1",
      "hanzi": "这是咖啡。",
      "pinyin": "zhè shì kāfēi.",
      "translation": "C'est du café.",
      "translationFr": "C'est du café.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这是咖啡。",
          "pinyin": "zhè shì kāfēi.",
          "translation": "C'est du café.",
          "translationFr": "C'est du café."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这是咖啡。 »",
        "choices": [
          "C'est du café.",
          "Qu'est-ce que c'est ? (ceci)",
          "Qu'est-ce que c'est ? (cela)",
          "C'est… (ceci)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c06"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c07": [
    {
      "id": "zh-l1-c07-w01",
      "level": "hsk1",
      "hanzi": "这",
      "pinyin": "zhè",
      "translation": "ceci / ce…",
      "translationFr": "ceci / ce…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这",
          "pinyin": "zhè",
          "translation": "ceci / ce…",
          "translationFr": "ceci / ce…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这 »",
        "choices": [
          "ceci / ce…",
          "cela / ce… (là-bas)",
          "ceci / ce… (avec classificateur)",
          "cela / ce… (avec classificateur)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c07"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c07-w02",
      "level": "hsk1",
      "hanzi": "那",
      "pinyin": "nà",
      "translation": "cela / ce… (là-bas)",
      "translationFr": "cela / ce… (là-bas)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "那",
          "pinyin": "nà",
          "translation": "cela / ce… (là-bas)",
          "translationFr": "cela / ce… (là-bas)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 那 »",
        "choices": [
          "cela / ce… (là-bas)",
          "ceci / ce…",
          "ceci / ce… (avec classificateur)",
          "cela / ce… (avec classificateur)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c07"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c07-w03",
      "level": "hsk1",
      "hanzi": "这个",
      "pinyin": "zhège",
      "translation": "ceci / ce… (avec classificateur)",
      "translationFr": "ceci / ce… (avec classificateur)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这个",
          "pinyin": "zhège",
          "translation": "ceci / ce… (avec classificateur)",
          "translationFr": "ceci / ce… (avec classificateur)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这个 »",
        "choices": [
          "ceci / ce… (avec classificateur)",
          "ceci / ce…",
          "cela / ce… (là-bas)",
          "cela / ce… (avec classificateur)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c07"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c07-w04",
      "level": "hsk1",
      "hanzi": "那个",
      "pinyin": "nàge",
      "translation": "cela / ce… (avec classificateur)",
      "translationFr": "cela / ce… (avec classificateur)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "那个",
          "pinyin": "nàge",
          "translation": "cela / ce… (avec classificateur)",
          "translationFr": "cela / ce… (avec classificateur)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 那个 »",
        "choices": [
          "cela / ce… (avec classificateur)",
          "ceci / ce…",
          "cela / ce… (là-bas)",
          "ceci / ce… (avec classificateur)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c07"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c07-w05",
      "level": "hsk1",
      "hanzi": "东西",
      "pinyin": "dōngxi",
      "translation": "chose / truc",
      "translationFr": "chose / truc",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "东西",
          "pinyin": "dōngxi",
          "translation": "chose / truc",
          "translationFr": "chose / truc"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 东西 »",
        "choices": [
          "chose / truc",
          "ceci / ce…",
          "cela / ce… (là-bas)",
          "ceci / ce… (avec classificateur)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c07"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c07-w06",
      "level": "hsk1",
      "hanzi": "这个是什么？",
      "pinyin": "zhège shì shénme?",
      "translation": "C'est quoi, ça ?",
      "translationFr": "C'est quoi, ça ?",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这个是什么？",
          "pinyin": "zhège shì shénme?",
          "translation": "C'est quoi, ça ?",
          "translationFr": "C'est quoi, ça ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这个是什么？ »",
        "choices": [
          "C'est quoi, ça ?",
          "ceci / ce…",
          "cela / ce… (là-bas)",
          "ceci / ce… (avec classificateur)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c07"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c07-w07",
      "level": "hsk1",
      "hanzi": "那个东西很好。",
      "pinyin": "nàge dōngxi hěn hǎo.",
      "translation": "Ce truc-là est très bien.",
      "translationFr": "Ce truc-là est très bien.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "那个东西很好。",
          "pinyin": "nàge dōngxi hěn hǎo.",
          "translation": "Ce truc-là est très bien.",
          "translationFr": "Ce truc-là est très bien."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 那个东西很好。 »",
        "choices": [
          "Ce truc-là est très bien.",
          "ceci / ce…",
          "cela / ce… (là-bas)",
          "ceci / ce… (avec classificateur)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c07"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c08": [
    {
      "id": "zh-l1-c08-w01",
      "level": "hsk1",
      "hanzi": "不是…",
      "pinyin": "bú shì …",
      "translation": "Ce n'est pas…",
      "translationFr": "Ce n'est pas…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "不是…",
          "pinyin": "bú shì …",
          "translation": "Ce n'est pas…",
          "translationFr": "Ce n'est pas…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 不是… »",
        "choices": [
          "Ce n'est pas…",
          "Ne… pas (présent / habitude)",
          "Je n'y vais pas.",
          "Pas bien / Pas bon."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c08"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c08-w02",
      "level": "hsk1",
      "hanzi": "不…",
      "pinyin": "bù …",
      "translation": "Ne… pas (présent / habitude)",
      "translationFr": "Ne… pas (présent / habitude)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "不…",
          "pinyin": "bù …",
          "translation": "Ne… pas (présent / habitude)",
          "translationFr": "Ne… pas (présent / habitude)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 不… »",
        "choices": [
          "Ne… pas (présent / habitude)",
          "Ce n'est pas…",
          "Je n'y vais pas.",
          "Pas bien / Pas bon."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c08"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c08-w03",
      "level": "hsk1",
      "hanzi": "我不去。",
      "pinyin": "wǒ bù qù.",
      "translation": "Je n'y vais pas.",
      "translationFr": "Je n'y vais pas.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我不去。",
          "pinyin": "wǒ bù qù.",
          "translation": "Je n'y vais pas.",
          "translationFr": "Je n'y vais pas."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我不去。 »",
        "choices": [
          "Je n'y vais pas.",
          "Ce n'est pas…",
          "Ne… pas (présent / habitude)",
          "Pas bien / Pas bon."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c08"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c08-w04",
      "level": "hsk1",
      "hanzi": "不好。",
      "pinyin": "bù hǎo.",
      "translation": "Pas bien / Pas bon.",
      "translationFr": "Pas bien / Pas bon.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "不好。",
          "pinyin": "bù hǎo.",
          "translation": "Pas bien / Pas bon.",
          "translationFr": "Pas bien / Pas bon."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 不好。 »",
        "choices": [
          "Pas bien / Pas bon.",
          "Ce n'est pas…",
          "Ne… pas (présent / habitude)",
          "Je n'y vais pas."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c08"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c08-w05",
      "level": "hsk1",
      "hanzi": "这不是茶。",
      "pinyin": "zhè bú shì chá.",
      "translation": "Ce n'est pas du thé.",
      "translationFr": "Ce n'est pas du thé.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这不是茶。",
          "pinyin": "zhè bú shì chá.",
          "translation": "Ce n'est pas du thé.",
          "translationFr": "Ce n'est pas du thé."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这不是茶。 »",
        "choices": [
          "Ce n'est pas du thé.",
          "Ce n'est pas…",
          "Ne… pas (présent / habitude)",
          "Je n'y vais pas."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c08"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c08-w06",
      "level": "hsk1",
      "hanzi": "我不喜欢。",
      "pinyin": "wǒ bù xǐhuān.",
      "translation": "Je n'aime pas.",
      "translationFr": "Je n'aime pas.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我不喜欢。",
          "pinyin": "wǒ bù xǐhuān.",
          "translation": "Je n'aime pas.",
          "translationFr": "Je n'aime pas."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我不喜欢。 »",
        "choices": [
          "Je n'aime pas.",
          "Ce n'est pas…",
          "Ne… pas (présent / habitude)",
          "Je n'y vais pas."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c08"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c09": [
    {
      "id": "zh-l1-c09-w01",
      "level": "hsk1",
      "hanzi": "有",
      "pinyin": "yǒu",
      "translation": "avoir / il y a",
      "translationFr": "avoir / il y a",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "有",
          "pinyin": "yǒu",
          "translation": "avoir / il y a",
          "translationFr": "avoir / il y a"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 有 »",
        "choices": [
          "avoir / il y a",
          "ne pas avoir / il n'y a pas",
          "J'ai…",
          "Ici, il y a…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c09"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c09-w02",
      "level": "hsk1",
      "hanzi": "没有",
      "pinyin": "méiyǒu",
      "translation": "ne pas avoir / il n'y a pas",
      "translationFr": "ne pas avoir / il n'y a pas",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "没有",
          "pinyin": "méiyǒu",
          "translation": "ne pas avoir / il n'y a pas",
          "translationFr": "ne pas avoir / il n'y a pas"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 没有 »",
        "choices": [
          "ne pas avoir / il n'y a pas",
          "avoir / il y a",
          "J'ai…",
          "Ici, il y a…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c09"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c09-w03",
      "level": "hsk1",
      "hanzi": "我有…",
      "pinyin": "wǒ yǒu …",
      "translation": "J'ai…",
      "translationFr": "J'ai…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我有…",
          "pinyin": "wǒ yǒu …",
          "translation": "J'ai…",
          "translationFr": "J'ai…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我有… »",
        "choices": [
          "J'ai…",
          "avoir / il y a",
          "ne pas avoir / il n'y a pas",
          "Ici, il y a…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c09"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c09-w04",
      "level": "hsk1",
      "hanzi": "这里有…",
      "pinyin": "zhèlǐ yǒu …",
      "translation": "Ici, il y a…",
      "translationFr": "Ici, il y a…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这里有…",
          "pinyin": "zhèlǐ yǒu …",
          "translation": "Ici, il y a…",
          "translationFr": "Ici, il y a…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这里有… »",
        "choices": [
          "Ici, il y a…",
          "avoir / il y a",
          "ne pas avoir / il n'y a pas",
          "J'ai…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c09"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c09-w05",
      "level": "hsk1",
      "hanzi": "你有时间吗？",
      "pinyin": "nǐ yǒu shíjiān ma?",
      "translation": "Tu as du temps ?",
      "translationFr": "Tu as du temps ?",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "你有时间吗？",
          "pinyin": "nǐ yǒu shíjiān ma?",
          "translation": "Tu as du temps ?",
          "translationFr": "Tu as du temps ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你有时间吗？ »",
        "choices": [
          "Tu as du temps ?",
          "avoir / il y a",
          "ne pas avoir / il n'y a pas",
          "J'ai…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c09"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c09-w06",
      "level": "hsk1",
      "hanzi": "这里没有水。",
      "pinyin": "zhèlǐ méiyǒu shuǐ.",
      "translation": "Il n'y a pas d'eau ici.",
      "translationFr": "Il n'y a pas d'eau ici.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这里没有水。",
          "pinyin": "zhèlǐ méiyǒu shuǐ.",
          "translation": "Il n'y a pas d'eau ici.",
          "translationFr": "Il n'y a pas d'eau ici."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这里没有水。 »",
        "choices": [
          "Il n'y a pas d'eau ici.",
          "avoir / il y a",
          "ne pas avoir / il n'y a pas",
          "J'ai…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c09"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c10": [
    {
      "id": "zh-l1-c10-w01",
      "level": "hsk1",
      "hanzi": "这里有…吗？",
      "pinyin": "zhèlǐ yǒu … ma?",
      "translation": "Est-ce qu'il y a… ici ?",
      "translationFr": "Est-ce qu'il y a… ici ?",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这里有…吗？",
          "pinyin": "zhèlǐ yǒu … ma?",
          "translation": "Est-ce qu'il y a… ici ?",
          "translationFr": "Est-ce qu'il y a… ici ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这里有…吗？ »",
        "choices": [
          "Est-ce qu'il y a… ici ?",
          "Tu as… ?",
          "Donne-moi…",
          "S'il vous plaît, donnez-moi…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c10"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c10-w02",
      "level": "hsk1",
      "hanzi": "你有…吗？",
      "pinyin": "nǐ yǒu … ma?",
      "translation": "Tu as… ?",
      "translationFr": "Tu as… ?",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "你有…吗？",
          "pinyin": "nǐ yǒu … ma?",
          "translation": "Tu as… ?",
          "translationFr": "Tu as… ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你有…吗？ »",
        "choices": [
          "Tu as… ?",
          "Est-ce qu'il y a… ici ?",
          "Donne-moi…",
          "S'il vous plaît, donnez-moi…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c10"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c10-w03",
      "level": "hsk1",
      "hanzi": "给我…",
      "pinyin": "gěi wǒ …",
      "translation": "Donne-moi…",
      "translationFr": "Donne-moi…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "给我…",
          "pinyin": "gěi wǒ …",
          "translation": "Donne-moi…",
          "translationFr": "Donne-moi…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 给我… »",
        "choices": [
          "Donne-moi…",
          "Est-ce qu'il y a… ici ?",
          "Tu as… ?",
          "S'il vous plaît, donnez-moi…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c10"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c10-w04",
      "level": "hsk1",
      "hanzi": "请给我…",
      "pinyin": "qǐng gěi wǒ …",
      "translation": "S'il vous plaît, donnez-moi…",
      "translationFr": "S'il vous plaît, donnez-moi…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "请给我…",
          "pinyin": "qǐng gěi wǒ …",
          "translation": "S'il vous plaît, donnez-moi…",
          "translationFr": "S'il vous plaît, donnez-moi…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 请给我… »",
        "choices": [
          "S'il vous plaît, donnez-moi…",
          "Est-ce qu'il y a… ici ?",
          "Tu as… ?",
          "Donne-moi…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c10"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c10-w05",
      "level": "hsk1",
      "hanzi": "来一个…",
      "pinyin": "lái yí ge …",
      "translation": "Je prends un(e)…",
      "translationFr": "Je prends un(e)…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "来一个…",
          "pinyin": "lái yí ge …",
          "translation": "Je prends un(e)…",
          "translationFr": "Je prends un(e)…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 来一个… »",
        "choices": [
          "Je prends un(e)…",
          "Est-ce qu'il y a… ici ?",
          "Tu as… ?",
          "Donne-moi…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c10"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c10-w06",
      "level": "hsk1",
      "hanzi": "这里有咖啡吗？",
      "pinyin": "zhèlǐ yǒu kāfēi ma?",
      "translation": "Est-ce qu'il y a du café ici ?",
      "translationFr": "Est-ce qu'il y a du café ici ?",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这里有咖啡吗？",
          "pinyin": "zhèlǐ yǒu kāfēi ma?",
          "translation": "Est-ce qu'il y a du café ici ?",
          "translationFr": "Est-ce qu'il y a du café ici ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这里有咖啡吗？ »",
        "choices": [
          "Est-ce qu'il y a du café ici ?",
          "Est-ce qu'il y a… ici ?",
          "Tu as… ?",
          "Donne-moi…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c10"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c10-w07",
      "level": "hsk1",
      "hanzi": "请给我一杯水。",
      "pinyin": "qǐng gěi wǒ yì bēi shuǐ.",
      "translation": "S'il vous plaît, donnez-moi un verre d'eau.",
      "translationFr": "S'il vous plaît, donnez-moi un verre d'eau.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "请给我一杯水。",
          "pinyin": "qǐng gěi wǒ yì bēi shuǐ.",
          "translation": "S'il vous plaît, donnez-moi un verre d'eau.",
          "translationFr": "S'il vous plaît, donnez-moi un verre d'eau."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 请给我一杯水。 »",
        "choices": [
          "S'il vous plaît, donnez-moi un verre d'eau.",
          "Est-ce qu'il y a… ici ?",
          "Tu as… ?",
          "Donne-moi…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c10"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c11": [
    {
      "id": "zh-l1-c11-w01",
      "level": "hsk1",
      "hanzi": "好吃",
      "pinyin": "hǎochī",
      "translation": "C'est bon (à manger)",
      "translationFr": "C'est bon (à manger)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "好吃",
          "pinyin": "hǎochī",
          "translation": "C'est bon (à manger)",
          "translationFr": "C'est bon (à manger)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 好吃 »",
        "choices": [
          "C'est bon (à manger)",
          "Ce n'est pas bon",
          "C'est vraiment bon",
          "Merci pour le repas"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c11"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c11-w02",
      "level": "hsk1",
      "hanzi": "不好吃",
      "pinyin": "bù hǎochī",
      "translation": "Ce n'est pas bon",
      "translationFr": "Ce n'est pas bon",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "不好吃",
          "pinyin": "bù hǎochī",
          "translation": "Ce n'est pas bon",
          "translationFr": "Ce n'est pas bon"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 不好吃 »",
        "choices": [
          "Ce n'est pas bon",
          "C'est bon (à manger)",
          "C'est vraiment bon",
          "Merci pour le repas"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c11"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c11-w03",
      "level": "hsk1",
      "hanzi": "真好吃",
      "pinyin": "zhēn hǎochī",
      "translation": "C'est vraiment bon",
      "translationFr": "C'est vraiment bon",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "真好吃",
          "pinyin": "zhēn hǎochī",
          "translation": "C'est vraiment bon",
          "translationFr": "C'est vraiment bon"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 真好吃 »",
        "choices": [
          "C'est vraiment bon",
          "C'est bon (à manger)",
          "Ce n'est pas bon",
          "Merci pour le repas"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c11"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c11-w04",
      "level": "hsk1",
      "hanzi": "谢谢你做的饭",
      "pinyin": "xièxie nǐ zuò de fàn",
      "translation": "Merci pour le repas",
      "translationFr": "Merci pour le repas",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "谢谢你做的饭",
          "pinyin": "xièxie nǐ zuò de fàn",
          "translation": "Merci pour le repas",
          "translationFr": "Merci pour le repas"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 谢谢你做的饭 »",
        "choices": [
          "Merci pour le repas",
          "C'est bon (à manger)",
          "Ce n'est pas bon",
          "C'est vraiment bon"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c11"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c11-w05",
      "level": "hsk1",
      "hanzi": "我吃饱了",
      "pinyin": "wǒ chī bǎo le",
      "translation": "J'ai bien mangé / Je suis rassasié(e)",
      "translationFr": "J'ai bien mangé / Je suis rassasié(e)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我吃饱了",
          "pinyin": "wǒ chī bǎo le",
          "translation": "J'ai bien mangé / Je suis rassasié(e)",
          "translationFr": "J'ai bien mangé / Je suis rassasié(e)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我吃饱了 »",
        "choices": [
          "J'ai bien mangé / Je suis rassasié(e)",
          "C'est bon (à manger)",
          "Ce n'est pas bon",
          "C'est vraiment bon"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c11"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c11-w06",
      "level": "hsk1",
      "hanzi": "这个真好吃！",
      "pinyin": "zhège zhēn hǎochī!",
      "translation": "C'est vraiment bon !",
      "translationFr": "C'est vraiment bon !",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "这个真好吃！",
          "pinyin": "zhège zhēn hǎochī!",
          "translation": "C'est vraiment bon !",
          "translationFr": "C'est vraiment bon !"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 这个真好吃！ »",
        "choices": [
          "C'est vraiment bon !",
          "C'est bon (à manger)",
          "Ce n'est pas bon",
          "C'est vraiment bon"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c11"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c11-w07",
      "level": "hsk1",
      "hanzi": "谢谢你做的饭，我吃饱了。",
      "pinyin": "xièxie nǐ zuò de fàn, wǒ chī bǎo le.",
      "translation": "Merci pour le repas, j'ai bien mangé.",
      "translationFr": "Merci pour le repas, j'ai bien mangé.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "谢谢你做的饭，我吃饱了。",
          "pinyin": "xièxie nǐ zuò de fàn, wǒ chī bǎo le.",
          "translation": "Merci pour le repas, j'ai bien mangé.",
          "translationFr": "Merci pour le repas, j'ai bien mangé."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 谢谢你做的饭，我吃饱了。 »",
        "choices": [
          "Merci pour le repas, j'ai bien mangé.",
          "C'est bon (à manger)",
          "Ce n'est pas bon",
          "C'est vraiment bon"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c11"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c12": [
    {
      "id": "zh-l1-c12-w01",
      "level": "hsk1",
      "hanzi": "我要…",
      "pinyin": "wǒ yào …",
      "translation": "Je veux / Je prends… (direct)",
      "translationFr": "Je veux / Je prends… (direct)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我要…",
          "pinyin": "wǒ yào …",
          "translation": "Je veux / Je prends… (direct)",
          "translationFr": "Je veux / Je prends… (direct)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我要… »",
        "choices": [
          "Je veux / Je prends… (direct)",
          "J'aimerais / J'ai envie de…",
          "Je veux / Je pense… (selon contexte)",
          "Je prends un café."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c12"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c12-w02",
      "level": "hsk1",
      "hanzi": "我想要…",
      "pinyin": "wǒ xiǎng yào …",
      "translation": "J'aimerais / J'ai envie de…",
      "translationFr": "J'aimerais / J'ai envie de…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我想要…",
          "pinyin": "wǒ xiǎng yào …",
          "translation": "J'aimerais / J'ai envie de…",
          "translationFr": "J'aimerais / J'ai envie de…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我想要… »",
        "choices": [
          "J'aimerais / J'ai envie de…",
          "Je veux / Je prends… (direct)",
          "Je veux / Je pense… (selon contexte)",
          "Je prends un café."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c12"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c12-w03",
      "level": "hsk1",
      "hanzi": "我想…",
      "pinyin": "wǒ xiǎng …",
      "translation": "Je veux / Je pense… (selon contexte)",
      "translationFr": "Je veux / Je pense… (selon contexte)",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我想…",
          "pinyin": "wǒ xiǎng …",
          "translation": "Je veux / Je pense… (selon contexte)",
          "translationFr": "Je veux / Je pense… (selon contexte)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我想… »",
        "choices": [
          "Je veux / Je pense… (selon contexte)",
          "Je veux / Je prends… (direct)",
          "J'aimerais / J'ai envie de…",
          "Je prends un café."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c12"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c12-w04",
      "level": "hsk1",
      "hanzi": "我要咖啡。",
      "pinyin": "wǒ yào kāfēi.",
      "translation": "Je prends un café.",
      "translationFr": "Je prends un café.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我要咖啡。",
          "pinyin": "wǒ yào kāfēi.",
          "translation": "Je prends un café.",
          "translationFr": "Je prends un café."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我要咖啡。 »",
        "choices": [
          "Je prends un café.",
          "Je veux / Je prends… (direct)",
          "J'aimerais / J'ai envie de…",
          "Je veux / Je pense… (selon contexte)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c12"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c12-w05",
      "level": "hsk1",
      "hanzi": "我想要一个苹果。",
      "pinyin": "wǒ xiǎng yào yí ge píngguǒ.",
      "translation": "J'aimerais une pomme.",
      "translationFr": "J'aimerais une pomme.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我想要一个苹果。",
          "pinyin": "wǒ xiǎng yào yí ge píngguǒ.",
          "translation": "J'aimerais une pomme.",
          "translationFr": "J'aimerais une pomme."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我想要一个苹果。 »",
        "choices": [
          "J'aimerais une pomme.",
          "Je veux / Je prends… (direct)",
          "J'aimerais / J'ai envie de…",
          "Je veux / Je pense… (selon contexte)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c12"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-c13": [
    {
      "id": "zh-l1-c13-w01",
      "level": "hsk1",
      "hanzi": "我想去…",
      "pinyin": "wǒ xiǎng qù …",
      "translation": "Je veux aller à…",
      "translationFr": "Je veux aller à…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我想去…",
          "pinyin": "wǒ xiǎng qù …",
          "translation": "Je veux aller à…",
          "translationFr": "Je veux aller à…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我想去… »",
        "choices": [
          "Je veux aller à…",
          "Je veux apprendre…",
          "Je veux pratiquer…",
          "Je veux apprendre le chinois."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c13"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c13-w02",
      "level": "hsk1",
      "hanzi": "我想学…",
      "pinyin": "wǒ xiǎng xué …",
      "translation": "Je veux apprendre…",
      "translationFr": "Je veux apprendre…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我想学…",
          "pinyin": "wǒ xiǎng xué …",
          "translation": "Je veux apprendre…",
          "translationFr": "Je veux apprendre…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我想学… »",
        "choices": [
          "Je veux apprendre…",
          "Je veux aller à…",
          "Je veux pratiquer…",
          "Je veux apprendre le chinois."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c13"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c13-w03",
      "level": "hsk1",
      "hanzi": "我想练习…",
      "pinyin": "wǒ xiǎng liànxí …",
      "translation": "Je veux pratiquer…",
      "translationFr": "Je veux pratiquer…",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我想练习…",
          "pinyin": "wǒ xiǎng liànxí …",
          "translation": "Je veux pratiquer…",
          "translationFr": "Je veux pratiquer…"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我想练习… »",
        "choices": [
          "Je veux pratiquer…",
          "Je veux aller à…",
          "Je veux apprendre…",
          "Je veux apprendre le chinois."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c13"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c13-w04",
      "level": "hsk1",
      "hanzi": "我想学汉语。",
      "pinyin": "wǒ xiǎng xué Hànyǔ.",
      "translation": "Je veux apprendre le chinois.",
      "translationFr": "Je veux apprendre le chinois.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我想学汉语。",
          "pinyin": "wǒ xiǎng xué Hànyǔ.",
          "translation": "Je veux apprendre le chinois.",
          "translationFr": "Je veux apprendre le chinois."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我想学汉语。 »",
        "choices": [
          "Je veux apprendre le chinois.",
          "Je veux aller à…",
          "Je veux apprendre…",
          "Je veux pratiquer…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c13"
      ],
      "theme": "Conversation"
    },
    {
      "id": "zh-l1-c13-w05",
      "level": "hsk1",
      "hanzi": "我想去北京。",
      "pinyin": "wǒ xiǎng qù Běijīng.",
      "translation": "Je veux aller à Pékin.",
      "translationFr": "Je veux aller à Pékin.",
      "category": "conversation",
      "examples": [
        {
          "hanzi": "我想去北京。",
          "pinyin": "wǒ xiǎng qù Běijīng.",
          "translation": "Je veux aller à Pékin.",
          "translationFr": "Je veux aller à Pékin."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我想去北京。 »",
        "choices": [
          "Je veux aller à Pékin.",
          "Je veux aller à…",
          "Je veux apprendre…",
          "Je veux pratiquer…"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "conversation",
        "débutant",
        "zh-l1-track-conversation",
        "lesson:zh-l1-c13"
      ],
      "theme": "Conversation"
    }
  ],
  "zh-l1-g01": [
    {
      "id": "zh-l1-g01-w01",
      "level": "hsk1",
      "hanzi": "我喝咖啡。",
      "pinyin": "wǒ hē kāfēi.",
      "translation": "Je bois du café.",
      "translationFr": "Je bois du café.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我喝咖啡。",
          "pinyin": "wǒ hē kāfēi.",
          "translation": "Je bois du café.",
          "translationFr": "Je bois du café."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我喝咖啡。 »",
        "choices": [
          "Je bois du café.",
          "Aujourd'hui, je bois du café.",
          "À la maison, j'étudie."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g01"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g01-w02",
      "level": "hsk1",
      "hanzi": "今天我喝咖啡。",
      "pinyin": "jīntiān wǒ hē kāfēi.",
      "translation": "Aujourd'hui, je bois du café.",
      "translationFr": "Aujourd'hui, je bois du café.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "今天我喝咖啡。",
          "pinyin": "jīntiān wǒ hē kāfēi.",
          "translation": "Aujourd'hui, je bois du café.",
          "translationFr": "Aujourd'hui, je bois du café."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 今天我喝咖啡。 »",
        "choices": [
          "Aujourd'hui, je bois du café.",
          "Je bois du café.",
          "À la maison, j'étudie."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g01"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g01-w03",
      "level": "hsk1",
      "hanzi": "在家我学习。",
      "pinyin": "zài jiā wǒ xuéxí.",
      "translation": "À la maison, j'étudie.",
      "translationFr": "À la maison, j'étudie.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "在家我学习。",
          "pinyin": "zài jiā wǒ xuéxí.",
          "translation": "À la maison, j'étudie.",
          "translationFr": "À la maison, j'étudie."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 在家我学习。 »",
        "choices": [
          "À la maison, j'étudie.",
          "Je bois du café.",
          "Aujourd'hui, je bois du café."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g01"
      ],
      "theme": "Grammaire"
    }
  ],
  "zh-l1-g02": [
    {
      "id": "zh-l1-g02-w01",
      "level": "hsk1",
      "hanzi": "我在家。",
      "pinyin": "wǒ zài jiā.",
      "translation": "Je suis à la maison.",
      "translationFr": "Je suis à la maison.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我在家。",
          "pinyin": "wǒ zài jiā.",
          "translation": "Je suis à la maison.",
          "translationFr": "Je suis à la maison."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我在家。 »",
        "choices": [
          "Je suis à la maison.",
          "Je vais à l'école.",
          "Je viens de France."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g02"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g02-w02",
      "level": "hsk1",
      "hanzi": "我到学校。",
      "pinyin": "wǒ dào xuéxiào.",
      "translation": "Je vais à l'école.",
      "translationFr": "Je vais à l'école.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我到学校。",
          "pinyin": "wǒ dào xuéxiào.",
          "translation": "Je vais à l'école.",
          "translationFr": "Je vais à l'école."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我到学校。 »",
        "choices": [
          "Je vais à l'école.",
          "Je suis à la maison.",
          "Je viens de France."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g02"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g02-w03",
      "level": "hsk1",
      "hanzi": "我从法国来。",
      "pinyin": "wǒ cóng Fǎguó lái.",
      "translation": "Je viens de France.",
      "translationFr": "Je viens de France.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我从法国来。",
          "pinyin": "wǒ cóng Fǎguó lái.",
          "translation": "Je viens de France.",
          "translationFr": "Je viens de France."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我从法国来。 »",
        "choices": [
          "Je viens de France.",
          "Je suis à la maison.",
          "Je vais à l'école."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g02"
      ],
      "theme": "Grammaire"
    }
  ],
  "zh-l1-g03": [
    {
      "id": "zh-l1-g03-w01",
      "level": "hsk1",
      "hanzi": "我今天很忙。",
      "pinyin": "wǒ jīntiān hěn máng.",
      "translation": "Aujourd'hui je suis très occupé(e).",
      "translationFr": "Aujourd'hui je suis très occupé(e).",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我今天很忙。",
          "pinyin": "wǒ jīntiān hěn máng.",
          "translation": "Aujourd'hui je suis très occupé(e).",
          "translationFr": "Aujourd'hui je suis très occupé(e)."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我今天很忙。 »",
        "choices": [
          "Aujourd'hui je suis très occupé(e).",
          "Demain, je vais à l'école.",
          "Tu viens quand ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g03"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g03-w02",
      "level": "hsk1",
      "hanzi": "明天我去学校。",
      "pinyin": "míngtiān wǒ qù xuéxiào.",
      "translation": "Demain, je vais à l'école.",
      "translationFr": "Demain, je vais à l'école.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "明天我去学校。",
          "pinyin": "míngtiān wǒ qù xuéxiào.",
          "translation": "Demain, je vais à l'école.",
          "translationFr": "Demain, je vais à l'école."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 明天我去学校。 »",
        "choices": [
          "Demain, je vais à l'école.",
          "Aujourd'hui je suis très occupé(e).",
          "Tu viens quand ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g03"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g03-w03",
      "level": "hsk1",
      "hanzi": "你什么时候来？",
      "pinyin": "nǐ shénme shíhou lái?",
      "translation": "Tu viens quand ?",
      "translationFr": "Tu viens quand ?",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "你什么时候来？",
          "pinyin": "nǐ shénme shíhou lái?",
          "translation": "Tu viens quand ?",
          "translationFr": "Tu viens quand ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你什么时候来？ »",
        "choices": [
          "Tu viens quand ?",
          "Aujourd'hui je suis très occupé(e).",
          "Demain, je vais à l'école."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g03"
      ],
      "theme": "Grammaire"
    }
  ],
  "zh-l1-g04": [
    {
      "id": "zh-l1-g04-w01",
      "level": "hsk1",
      "hanzi": "我不去。",
      "pinyin": "wǒ bù qù.",
      "translation": "Je n'y vais pas.",
      "translationFr": "Je n'y vais pas.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我不去。",
          "pinyin": "wǒ bù qù.",
          "translation": "Je n'y vais pas.",
          "translationFr": "Je n'y vais pas."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我不去。 »",
        "choices": [
          "Je n'y vais pas.",
          "Je n'y suis pas allé(e).",
          "Je n'ai pas encore mangé."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g04"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g04-w02",
      "level": "hsk1",
      "hanzi": "我没去。",
      "pinyin": "wǒ méi qù.",
      "translation": "Je n'y suis pas allé(e).",
      "translationFr": "Je n'y suis pas allé(e).",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我没去。",
          "pinyin": "wǒ méi qù.",
          "translation": "Je n'y suis pas allé(e).",
          "translationFr": "Je n'y suis pas allé(e)."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我没去。 »",
        "choices": [
          "Je n'y suis pas allé(e).",
          "Je n'y vais pas.",
          "Je n'ai pas encore mangé."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g04"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g04-w03",
      "level": "hsk1",
      "hanzi": "我还没吃。",
      "pinyin": "wǒ hái méi chī.",
      "translation": "Je n'ai pas encore mangé.",
      "translationFr": "Je n'ai pas encore mangé.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我还没吃。",
          "pinyin": "wǒ hái méi chī.",
          "translation": "Je n'ai pas encore mangé.",
          "translationFr": "Je n'ai pas encore mangé."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我还没吃。 »",
        "choices": [
          "Je n'ai pas encore mangé.",
          "Je n'y vais pas.",
          "Je n'y suis pas allé(e)."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g04"
      ],
      "theme": "Grammaire"
    }
  ],
  "zh-l1-g05": [
    {
      "id": "zh-l1-g05-w01",
      "level": "hsk1",
      "hanzi": "你是谁？",
      "pinyin": "nǐ shì shéi?",
      "translation": "Tu es qui ?",
      "translationFr": "Tu es qui ?",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "你是谁？",
          "pinyin": "nǐ shì shéi?",
          "translation": "Tu es qui ?",
          "translationFr": "Tu es qui ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你是谁？ »",
        "choices": [
          "Tu es qui ?",
          "Qui est le professeur ?",
          "C'est qui, ça ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g05"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g05-w02",
      "level": "hsk1",
      "hanzi": "谁是老师？",
      "pinyin": "shéi shì lǎoshī?",
      "translation": "Qui est le professeur ?",
      "translationFr": "Qui est le professeur ?",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "谁是老师？",
          "pinyin": "shéi shì lǎoshī?",
          "translation": "Qui est le professeur ?",
          "translationFr": "Qui est le professeur ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 谁是老师？ »",
        "choices": [
          "Qui est le professeur ?",
          "Tu es qui ?",
          "C'est qui, ça ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g05"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g05-w03",
      "level": "hsk1",
      "hanzi": "那是谁？",
      "pinyin": "nà shì shéi?",
      "translation": "C'est qui, ça ?",
      "translationFr": "C'est qui, ça ?",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "那是谁？",
          "pinyin": "nà shì shéi?",
          "translation": "C'est qui, ça ?",
          "translationFr": "C'est qui, ça ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 那是谁？ »",
        "choices": [
          "C'est qui, ça ?",
          "Tu es qui ?",
          "Qui est le professeur ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g05"
      ],
      "theme": "Grammaire"
    }
  ],
  "zh-l1-g06": [
    {
      "id": "zh-l1-g06-w01",
      "level": "hsk1",
      "hanzi": "你怎么去？",
      "pinyin": "nǐ zěnme qù?",
      "translation": "Tu y vas comment ?",
      "translationFr": "Tu y vas comment ?",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "你怎么去？",
          "pinyin": "nǐ zěnme qù?",
          "translation": "Tu y vas comment ?",
          "translationFr": "Tu y vas comment ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你怎么去？ »",
        "choices": [
          "Tu y vas comment ?",
          "Pourquoi tu n'y vas pas ?",
          "Tu as quel âge ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g06"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g06-w02",
      "level": "hsk1",
      "hanzi": "你为什么不去？",
      "pinyin": "nǐ wèishénme bù qù?",
      "translation": "Pourquoi tu n'y vas pas ?",
      "translationFr": "Pourquoi tu n'y vas pas ?",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "你为什么不去？",
          "pinyin": "nǐ wèishénme bù qù?",
          "translation": "Pourquoi tu n'y vas pas ?",
          "translationFr": "Pourquoi tu n'y vas pas ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你为什么不去？ »",
        "choices": [
          "Pourquoi tu n'y vas pas ?",
          "Tu y vas comment ?",
          "Tu as quel âge ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g06"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g06-w03",
      "level": "hsk1",
      "hanzi": "你几岁？",
      "pinyin": "nǐ jǐ suì?",
      "translation": "Tu as quel âge ?",
      "translationFr": "Tu as quel âge ?",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "你几岁？",
          "pinyin": "nǐ jǐ suì?",
          "translation": "Tu as quel âge ?",
          "translationFr": "Tu as quel âge ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你几岁？ »",
        "choices": [
          "Tu as quel âge ?",
          "Tu y vas comment ?",
          "Pourquoi tu n'y vas pas ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g06"
      ],
      "theme": "Grammaire"
    }
  ],
  "zh-l1-g07": [
    {
      "id": "zh-l1-g07-w01",
      "level": "hsk1",
      "hanzi": "我从家到学校。",
      "pinyin": "wǒ cóng jiā dào xuéxiào.",
      "translation": "Je vais de la maison à l'école.",
      "translationFr": "Je vais de la maison à l'école.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我从家到学校。",
          "pinyin": "wǒ cóng jiā dào xuéxiào.",
          "translation": "Je vais de la maison à l'école.",
          "translationFr": "Je vais de la maison à l'école."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我从家到学校。 »",
        "choices": [
          "Je vais de la maison à l'école.",
          "Tu viens ?",
          "Je vais à Pékin."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g07"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g07-w02",
      "level": "hsk1",
      "hanzi": "你来吗？",
      "pinyin": "nǐ lái ma?",
      "translation": "Tu viens ?",
      "translationFr": "Tu viens ?",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "你来吗？",
          "pinyin": "nǐ lái ma?",
          "translation": "Tu viens ?",
          "translationFr": "Tu viens ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你来吗？ »",
        "choices": [
          "Tu viens ?",
          "Je vais de la maison à l'école.",
          "Je vais à Pékin."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g07"
      ],
      "theme": "Grammaire"
    },
    {
      "id": "zh-l1-g07-w03",
      "level": "hsk1",
      "hanzi": "我去北京。",
      "pinyin": "wǒ qù Běijīng.",
      "translation": "Je vais à Pékin.",
      "translationFr": "Je vais à Pékin.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我去北京。",
          "pinyin": "wǒ qù Běijīng.",
          "translation": "Je vais à Pékin.",
          "translationFr": "Je vais à Pékin."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我去北京。 »",
        "choices": [
          "Je vais à Pékin.",
          "Je vais de la maison à l'école.",
          "Tu viens ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "grammaire",
        "débutant",
        "zh-l1-track-grammar",
        "lesson:zh-l1-g07"
      ],
      "theme": "Grammaire"
    }
  ],
  "zh-l1-n01": [
    {
      "id": "zh-l1-n01-w01",
      "level": "hsk1",
      "hanzi": "零",
      "pinyin": "líng",
      "translation": "0",
      "translationFr": "0",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "零",
          "pinyin": "líng",
          "translation": "0",
          "translationFr": "0"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 零 »",
        "choices": [
          "0",
          "10",
          "100",
          "1000"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n01"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n01-w02",
      "level": "hsk1",
      "hanzi": "十",
      "pinyin": "shí",
      "translation": "10",
      "translationFr": "10",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "十",
          "pinyin": "shí",
          "translation": "10",
          "translationFr": "10"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 十 »",
        "choices": [
          "10",
          "0",
          "100",
          "1000"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n01"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n01-w03",
      "level": "hsk1",
      "hanzi": "百",
      "pinyin": "bǎi",
      "translation": "100",
      "translationFr": "100",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "百",
          "pinyin": "bǎi",
          "translation": "100",
          "translationFr": "100"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 百 »",
        "choices": [
          "100",
          "0",
          "10",
          "1000"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n01"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n01-w04",
      "level": "hsk1",
      "hanzi": "千",
      "pinyin": "qiān",
      "translation": "1000",
      "translationFr": "1000",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "千",
          "pinyin": "qiān",
          "translation": "1000",
          "translationFr": "1000"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 千 »",
        "choices": [
          "1000",
          "0",
          "10",
          "100"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n01"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n01-w05",
      "level": "hsk1",
      "hanzi": "一百零五",
      "pinyin": "yì bǎi líng wǔ",
      "translation": "105",
      "translationFr": "105",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "一百零五",
          "pinyin": "yì bǎi líng wǔ",
          "translation": "105",
          "translationFr": "105"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 一百零五 »",
        "choices": [
          "105",
          "0",
          "10",
          "100"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n01"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n01-w06",
      "level": "hsk1",
      "hanzi": "两百",
      "pinyin": "liǎng bǎi",
      "translation": "200 (forme courante)",
      "translationFr": "200 (forme courante)",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "两百",
          "pinyin": "liǎng bǎi",
          "translation": "200 (forme courante)",
          "translationFr": "200 (forme courante)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 两百 »",
        "choices": [
          "200 (forme courante)",
          "0",
          "10",
          "100"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n01"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n01-w07",
      "level": "hsk1",
      "hanzi": "我有三十块。",
      "pinyin": "wǒ yǒu sānshí kuài.",
      "translation": "J'ai 30 yuans.",
      "translationFr": "J'ai 30 yuans.",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "我有三十块。",
          "pinyin": "wǒ yǒu sānshí kuài.",
          "translation": "J'ai 30 yuans.",
          "translationFr": "J'ai 30 yuans."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我有三十块。 »",
        "choices": [
          "J'ai 30 yuans.",
          "0",
          "10",
          "100"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n01"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n01-w08",
      "level": "hsk1",
      "hanzi": "一共一百零五。",
      "pinyin": "yígòng yì bǎi líng wǔ.",
      "translation": "Ça fait 105 au total.",
      "translationFr": "Ça fait 105 au total.",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "一共一百零五。",
          "pinyin": "yígòng yì bǎi líng wǔ.",
          "translation": "Ça fait 105 au total.",
          "translationFr": "Ça fait 105 au total."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 一共一百零五。 »",
        "choices": [
          "Ça fait 105 au total.",
          "0",
          "10",
          "100"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n01"
      ],
      "theme": "Nombres"
    }
  ],
  "zh-l1-n02": [
    {
      "id": "zh-l1-n02-w01",
      "level": "hsk1",
      "hanzi": "岁",
      "pinyin": "suì",
      "translation": "ans (âge)",
      "translationFr": "ans (âge)",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "岁",
          "pinyin": "suì",
          "translation": "ans (âge)",
          "translationFr": "ans (âge)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 岁 »",
        "choices": [
          "ans (âge)",
          "année / mois / jour",
          "heure / minute",
          "J'ai 25 ans."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "temps",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n02"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n02-w02",
      "level": "hsk1",
      "hanzi": "年 / 月 / 日",
      "pinyin": "nián / yuè / rì",
      "translation": "année / mois / jour",
      "translationFr": "année / mois / jour",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "年 / 月 / 日",
          "pinyin": "nián / yuè / rì",
          "translation": "année / mois / jour",
          "translationFr": "année / mois / jour"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 年 / 月 / 日 »",
        "choices": [
          "année / mois / jour",
          "ans (âge)",
          "heure / minute",
          "J'ai 25 ans."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "temps",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n02"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n02-w03",
      "level": "hsk1",
      "hanzi": "点 / 分",
      "pinyin": "diǎn / fēn",
      "translation": "heure / minute",
      "translationFr": "heure / minute",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "点 / 分",
          "pinyin": "diǎn / fēn",
          "translation": "heure / minute",
          "translationFr": "heure / minute"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 点 / 分 »",
        "choices": [
          "heure / minute",
          "ans (âge)",
          "année / mois / jour",
          "J'ai 25 ans."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "temps",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n02"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n02-w04",
      "level": "hsk1",
      "hanzi": "我二十五岁。",
      "pinyin": "wǒ èrshíwǔ suì.",
      "translation": "J'ai 25 ans.",
      "translationFr": "J'ai 25 ans.",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "我二十五岁。",
          "pinyin": "wǒ èrshíwǔ suì.",
          "translation": "J'ai 25 ans.",
          "translationFr": "J'ai 25 ans."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我二十五岁。 »",
        "choices": [
          "J'ai 25 ans.",
          "ans (âge)",
          "année / mois / jour",
          "heure / minute"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "temps",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n02"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n02-w05",
      "level": "hsk1",
      "hanzi": "今天是三月三号。",
      "pinyin": "jīntiān shì sānyuè sān hào.",
      "translation": "Nous sommes le 3 mars.",
      "translationFr": "Nous sommes le 3 mars.",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "今天是三月三号。",
          "pinyin": "jīntiān shì sānyuè sān hào.",
          "translation": "Nous sommes le 3 mars.",
          "translationFr": "Nous sommes le 3 mars."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 今天是三月三号。 »",
        "choices": [
          "Nous sommes le 3 mars.",
          "ans (âge)",
          "année / mois / jour",
          "heure / minute"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "temps",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n02"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n02-w06",
      "level": "hsk1",
      "hanzi": "两点半",
      "pinyin": "liǎng diǎn bàn",
      "translation": "2h30",
      "translationFr": "2h30",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "两点半",
          "pinyin": "liǎng diǎn bàn",
          "translation": "2h30",
          "translationFr": "2h30"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 两点半 »",
        "choices": [
          "2h30",
          "ans (âge)",
          "année / mois / jour",
          "heure / minute"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "temps",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n02"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n02-w07",
      "level": "hsk1",
      "hanzi": "你几岁？",
      "pinyin": "nǐ jǐ suì?",
      "translation": "Tu as quel âge ?",
      "translationFr": "Tu as quel âge ?",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "你几岁？",
          "pinyin": "nǐ jǐ suì?",
          "translation": "Tu as quel âge ?",
          "translationFr": "Tu as quel âge ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你几岁？ »",
        "choices": [
          "Tu as quel âge ?",
          "ans (âge)",
          "année / mois / jour",
          "heure / minute"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "temps",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n02"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n02-w08",
      "level": "hsk1",
      "hanzi": "现在几点？",
      "pinyin": "xiànzài jǐ diǎn?",
      "translation": "Il est quelle heure ?",
      "translationFr": "Il est quelle heure ?",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "现在几点？",
          "pinyin": "xiànzài jǐ diǎn?",
          "translation": "Il est quelle heure ?",
          "translationFr": "Il est quelle heure ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 现在几点？ »",
        "choices": [
          "Il est quelle heure ?",
          "ans (âge)",
          "année / mois / jour",
          "heure / minute"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "temps",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n02"
      ],
      "theme": "Nombres"
    },
    {
      "id": "zh-l1-n02-w09",
      "level": "hsk1",
      "hanzi": "我明天两点来。",
      "pinyin": "wǒ míngtiān liǎng diǎn lái.",
      "translation": "Je viens demain à 2h.",
      "translationFr": "Je viens demain à 2h.",
      "category": "vocabulary",
      "examples": [
        {
          "hanzi": "我明天两点来。",
          "pinyin": "wǒ míngtiān liǎng diǎn lái.",
          "translation": "Je viens demain à 2h.",
          "translationFr": "Je viens demain à 2h."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我明天两点来。 »",
        "choices": [
          "Je viens demain à 2h.",
          "ans (âge)",
          "année / mois / jour",
          "heure / minute"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "nombres",
        "temps",
        "débutant",
        "zh-l1-track-numbers",
        "lesson:zh-l1-n02"
      ],
      "theme": "Nombres"
    }
  ],
  "zh-l1-v01": [
    {
      "id": "zh-l1-v01-w01",
      "level": "hsk1",
      "hanzi": "我吃饭。",
      "pinyin": "wǒ chī fàn.",
      "translation": "Je mange.",
      "translationFr": "Je mange.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我吃饭。",
          "pinyin": "wǒ chī fàn.",
          "translation": "Je mange.",
          "translationFr": "Je mange."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我吃饭。 »",
        "choices": [
          "Je mange.",
          "Je suis en train de manger.",
          "Je suis en train d'étudier (insistance).",
          "Tu fais quoi (là) ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "aspect",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v01"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v01-w02",
      "level": "hsk1",
      "hanzi": "我在吃饭。",
      "pinyin": "wǒ zài chī fàn.",
      "translation": "Je suis en train de manger.",
      "translationFr": "Je suis en train de manger.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我在吃饭。",
          "pinyin": "wǒ zài chī fàn.",
          "translation": "Je suis en train de manger.",
          "translationFr": "Je suis en train de manger."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我在吃饭。 »",
        "choices": [
          "Je suis en train de manger.",
          "Je mange.",
          "Je suis en train d'étudier (insistance).",
          "Tu fais quoi (là) ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "aspect",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v01"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v01-w03",
      "level": "hsk1",
      "hanzi": "我正在学习。",
      "pinyin": "wǒ zhèngzài xuéxí.",
      "translation": "Je suis en train d'étudier (insistance).",
      "translationFr": "Je suis en train d'étudier (insistance).",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我正在学习。",
          "pinyin": "wǒ zhèngzài xuéxí.",
          "translation": "Je suis en train d'étudier (insistance).",
          "translationFr": "Je suis en train d'étudier (insistance)."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我正在学习。 »",
        "choices": [
          "Je suis en train d'étudier (insistance).",
          "Je mange.",
          "Je suis en train de manger.",
          "Tu fais quoi (là) ?"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "aspect",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v01"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v01-w04",
      "level": "hsk1",
      "hanzi": "你在做什么？",
      "pinyin": "nǐ zài zuò shénme?",
      "translation": "Tu fais quoi (là) ?",
      "translationFr": "Tu fais quoi (là) ?",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "你在做什么？",
          "pinyin": "nǐ zài zuò shénme?",
          "translation": "Tu fais quoi (là) ?",
          "translationFr": "Tu fais quoi (là) ?"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你在做什么？ »",
        "choices": [
          "Tu fais quoi (là) ?",
          "Je mange.",
          "Je suis en train de manger.",
          "Je suis en train d'étudier (insistance)."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "aspect",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v01"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v01-w05",
      "level": "hsk1",
      "hanzi": "我在工作。",
      "pinyin": "wǒ zài gōngzuò.",
      "translation": "Je travaille (en ce moment).",
      "translationFr": "Je travaille (en ce moment).",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我在工作。",
          "pinyin": "wǒ zài gōngzuò.",
          "translation": "Je travaille (en ce moment).",
          "translationFr": "Je travaille (en ce moment)."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我在工作。 »",
        "choices": [
          "Je travaille (en ce moment).",
          "Je mange.",
          "Je suis en train de manger.",
          "Je suis en train d'étudier (insistance)."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "aspect",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v01"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    }
  ],
  "zh-l1-v02": [
    {
      "id": "zh-l1-v02-w01",
      "level": "hsk1",
      "hanzi": "我吃了。",
      "pinyin": "wǒ chī le.",
      "translation": "J'ai mangé.",
      "translationFr": "J'ai mangé.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我吃了。",
          "pinyin": "wǒ chī le.",
          "translation": "J'ai mangé.",
          "translationFr": "J'ai mangé."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我吃了。 »",
        "choices": [
          "J'ai mangé.",
          "J'ai regardé un film.",
          "Je ne suis pas allé(e).",
          "Tu as mangé ? (salutation courante)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "passé",
        "aspect",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v02"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v02-w02",
      "level": "hsk1",
      "hanzi": "我看了电影。",
      "pinyin": "wǒ kàn le diànyǐng.",
      "translation": "J'ai regardé un film.",
      "translationFr": "J'ai regardé un film.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我看了电影。",
          "pinyin": "wǒ kàn le diànyǐng.",
          "translation": "J'ai regardé un film.",
          "translationFr": "J'ai regardé un film."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我看了电影。 »",
        "choices": [
          "J'ai regardé un film.",
          "J'ai mangé.",
          "Je ne suis pas allé(e).",
          "Tu as mangé ? (salutation courante)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "passé",
        "aspect",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v02"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v02-w03",
      "level": "hsk1",
      "hanzi": "我没去。",
      "pinyin": "wǒ méi qù.",
      "translation": "Je ne suis pas allé(e).",
      "translationFr": "Je ne suis pas allé(e).",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我没去。",
          "pinyin": "wǒ méi qù.",
          "translation": "Je ne suis pas allé(e).",
          "translationFr": "Je ne suis pas allé(e)."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我没去。 »",
        "choices": [
          "Je ne suis pas allé(e).",
          "J'ai mangé.",
          "J'ai regardé un film.",
          "Tu as mangé ? (salutation courante)"
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "passé",
        "aspect",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v02"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v02-w04",
      "level": "hsk1",
      "hanzi": "你吃了吗？",
      "pinyin": "nǐ chī le ma?",
      "translation": "Tu as mangé ? (salutation courante)",
      "translationFr": "Tu as mangé ? (salutation courante)",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "你吃了吗？",
          "pinyin": "nǐ chī le ma?",
          "translation": "Tu as mangé ? (salutation courante)",
          "translationFr": "Tu as mangé ? (salutation courante)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 你吃了吗？ »",
        "choices": [
          "Tu as mangé ? (salutation courante)",
          "J'ai mangé.",
          "J'ai regardé un film.",
          "Je ne suis pas allé(e)."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "passé",
        "aspect",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v02"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v02-w05",
      "level": "hsk1",
      "hanzi": "我还没吃。",
      "pinyin": "wǒ hái méi chī.",
      "translation": "Je n'ai pas encore mangé.",
      "translationFr": "Je n'ai pas encore mangé.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我还没吃。",
          "pinyin": "wǒ hái méi chī.",
          "translation": "Je n'ai pas encore mangé.",
          "translationFr": "Je n'ai pas encore mangé."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我还没吃。 »",
        "choices": [
          "Je n'ai pas encore mangé.",
          "J'ai mangé.",
          "J'ai regardé un film.",
          "Je ne suis pas allé(e)."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "passé",
        "aspect",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v02"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    }
  ],
  "zh-l1-v03": [
    {
      "id": "zh-l1-v03-w01",
      "level": "hsk1",
      "hanzi": "我要去。",
      "pinyin": "wǒ yào qù.",
      "translation": "Je veux y aller / Je vais y aller.",
      "translationFr": "Je veux y aller / Je vais y aller.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我要去。",
          "pinyin": "wǒ yào qù.",
          "translation": "Je veux y aller / Je vais y aller.",
          "translationFr": "Je veux y aller / Je vais y aller."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我要去。 »",
        "choices": [
          "Je veux y aller / Je vais y aller.",
          "J'ai envie d'y aller.",
          "Je sais parler chinois.",
          "Je peux venir (capacité)."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "futur",
        "modal",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v03"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v03-w02",
      "level": "hsk1",
      "hanzi": "我想去。",
      "pinyin": "wǒ xiǎng qù.",
      "translation": "J'ai envie d'y aller.",
      "translationFr": "J'ai envie d'y aller.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我想去。",
          "pinyin": "wǒ xiǎng qù.",
          "translation": "J'ai envie d'y aller.",
          "translationFr": "J'ai envie d'y aller."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我想去。 »",
        "choices": [
          "J'ai envie d'y aller.",
          "Je veux y aller / Je vais y aller.",
          "Je sais parler chinois.",
          "Je peux venir (capacité)."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "futur",
        "modal",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v03"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v03-w03",
      "level": "hsk1",
      "hanzi": "我会说中文。",
      "pinyin": "wǒ huì shuō Zhōngwén.",
      "translation": "Je sais parler chinois.",
      "translationFr": "Je sais parler chinois.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我会说中文。",
          "pinyin": "wǒ huì shuō Zhōngwén.",
          "translation": "Je sais parler chinois.",
          "translationFr": "Je sais parler chinois."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我会说中文。 »",
        "choices": [
          "Je sais parler chinois.",
          "Je veux y aller / Je vais y aller.",
          "J'ai envie d'y aller.",
          "Je peux venir (capacité)."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "futur",
        "modal",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v03"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v03-w04",
      "level": "hsk1",
      "hanzi": "我能来。",
      "pinyin": "wǒ néng lái.",
      "translation": "Je peux venir (capacité).",
      "translationFr": "Je peux venir (capacité).",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我能来。",
          "pinyin": "wǒ néng lái.",
          "translation": "Je peux venir (capacité).",
          "translationFr": "Je peux venir (capacité)."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我能来。 »",
        "choices": [
          "Je peux venir (capacité).",
          "Je veux y aller / Je vais y aller.",
          "J'ai envie d'y aller.",
          "Je sais parler chinois."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "futur",
        "modal",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v03"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v03-w05",
      "level": "hsk1",
      "hanzi": "我可以进吗？",
      "pinyin": "wǒ kěyǐ jìn ma?",
      "translation": "Je peux entrer ? (permission)",
      "translationFr": "Je peux entrer ? (permission)",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我可以进吗？",
          "pinyin": "wǒ kěyǐ jìn ma?",
          "translation": "Je peux entrer ? (permission)",
          "translationFr": "Je peux entrer ? (permission)"
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我可以进吗？ »",
        "choices": [
          "Je peux entrer ? (permission)",
          "Je veux y aller / Je vais y aller.",
          "J'ai envie d'y aller.",
          "Je sais parler chinois."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "futur",
        "modal",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v03"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v03-w06",
      "level": "hsk1",
      "hanzi": "明天我会来。",
      "pinyin": "míngtiān wǒ huì lái.",
      "translation": "Demain je viendrai (probable).",
      "translationFr": "Demain je viendrai (probable).",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "明天我会来。",
          "pinyin": "míngtiān wǒ huì lái.",
          "translation": "Demain je viendrai (probable).",
          "translationFr": "Demain je viendrai (probable)."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 明天我会来。 »",
        "choices": [
          "Demain je viendrai (probable).",
          "Je veux y aller / Je vais y aller.",
          "J'ai envie d'y aller.",
          "Je sais parler chinois."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "futur",
        "modal",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v03"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    },
    {
      "id": "zh-l1-v03-w07",
      "level": "hsk1",
      "hanzi": "我今天不能来。",
      "pinyin": "wǒ jīntiān bù néng lái.",
      "translation": "Je ne peux pas venir aujourd'hui.",
      "translationFr": "Je ne peux pas venir aujourd'hui.",
      "category": "grammar",
      "examples": [
        {
          "hanzi": "我今天不能来。",
          "pinyin": "wǒ jīntiān bù néng lái.",
          "translation": "Je ne peux pas venir aujourd'hui.",
          "translationFr": "Je ne peux pas venir aujourd'hui."
        }
      ],
      "quiz": {
        "prompt": "Selectionne la bonne traduction pour « 我今天不能来。 »",
        "choices": [
          "Je ne peux pas venir aujourd'hui.",
          "Je veux y aller / Je vais y aller.",
          "J'ai envie d'y aller.",
          "Je sais parler chinois."
        ],
        "correctChoiceIndex": 0
      },
      "tags": [
        "verbes",
        "futur",
        "modal",
        "débutant",
        "zh-l1-track-verbs",
        "lesson:zh-l1-v03"
      ],
      "theme": "Verbes & temps (équivalent « conjugaison »)"
    }
  ]
};

export const level1LessonExercises: Record<string, LessonExercise[]> = {
  "zh-l1-a01": [
    {
      "id": "zh-l1-a01-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « a » ?",
      "promptEn": "What does \"a\" mean?",
      "choices": [
        "son « a » ouvert",
        "son proche de « o »",
        "son central, différent du « é »",
        "son « i »"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« a » signifie « son « a » ouvert » .",
      "explanationEn": "\"a\" means \"son « a » ouvert\"."
    },
    {
      "id": "zh-l1-a01-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « son proche de « o » » ?",
      "promptEn": "Which expression matches \"son proche de « o »\"?",
      "choices": [
        "o",
        "a",
        "e",
        "i"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « o » .",
      "explanationEn": "The correct answer is \"o\"."
    },
    {
      "id": "zh-l1-a01-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "La même syllabe avec 4 tons (on verra les tons ensuite).",
        "translationEn": "La même syllabe avec 4 tons (on verra les tons ensuite).",
        "words": [
          "mā",
          "/",
          "má",
          "/",
          "mǎ",
          "/",
          "mà"
        ],
        "correctOrder": [
          "mā",
          "/",
          "má",
          "/",
          "mǎ",
          "/",
          "mà"
        ],
        "pinyin": "mā / má / mǎ / mà"
      }
    }
  ],
  "zh-l1-a02": [
    {
      "id": "zh-l1-a02-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « b / p » ?",
      "promptEn": "What does \"b / p\" mean?",
      "choices": [
        "paires non aspirée / aspirée",
        "série rétroflexe",
        "série alvéolaire",
        "série palatale"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« b / p » signifie « paires non aspirée / aspirée » .",
      "explanationEn": "\"b / p\" means \"paires non aspirée / aspirée\"."
    },
    {
      "id": "zh-l1-a02-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « paires non aspirée / aspirée » ?",
      "promptEn": "Which expression matches \"paires non aspirée / aspirée\"?",
      "choices": [
        "d / t",
        "b / p",
        "g / k",
        "zh / ch / sh"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « d / t » .",
      "explanationEn": "The correct answer is \"d / t\"."
    },
    {
      "id": "zh-l1-a02-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "ba / pa (différence surtout sur le souffle).",
        "translationEn": "ba / pa (différence surtout sur le souffle).",
        "words": [
          "bā",
          "/",
          "pā"
        ],
        "correctOrder": [
          "bā",
          "/",
          "pā"
        ],
        "pinyin": "bā / pā"
      }
    }
  ],
  "zh-l1-a03": [
    {
      "id": "zh-l1-a03-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « mā » ?",
      "promptEn": "What does \"mā\" mean?",
      "choices": [
        "mère",
        "chanvre",
        "cheval",
        "gronder"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« mā » signifie « mère » .",
      "explanationEn": "\"mā\" means \"mère\"."
    },
    {
      "id": "zh-l1-a03-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « chanvre » ?",
      "promptEn": "Which expression matches \"chanvre\"?",
      "choices": [
        "má",
        "mā",
        "mǎ",
        "mà"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « má » .",
      "explanationEn": "The correct answer is \"má\"."
    },
    {
      "id": "zh-l1-a03-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Ça va ? / Comment ça va ?",
        "translationEn": "Ça va ? / Comment ça va ?",
        "words": [
          "你",
          "好",
          "吗",
          "？"
        ],
        "correctOrder": [
          "你",
          "好",
          "吗",
          "？"
        ],
        "pinyin": "nǐ hǎo ma?"
      }
    }
  ],
  "zh-l1-a04": [
    {
      "id": "zh-l1-a04-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 你好 » ?",
      "promptEn": "What does \"你好\" mean?",
      "choices": [
        "bonjour",
        "merci",
        "ce n'est pas",
        "un (classificateur général)"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 你好 » signifie « bonjour » .",
      "explanationEn": "\"你好\" means \"bonjour\"."
    },
    {
      "id": "zh-l1-a04-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « merci » ?",
      "promptEn": "Which expression matches \"merci\"?",
      "choices": [
        "谢谢",
        "你好",
        "不是",
        "一个"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 谢谢 » .",
      "explanationEn": "The correct answer is \"谢谢\"."
    },
    {
      "id": "zh-l1-a04-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Bonjour !",
        "translationEn": "Bonjour !",
        "words": [
          "你",
          "好",
          "！"
        ],
        "correctOrder": [
          "你",
          "好",
          "！"
        ],
        "pinyin": "nǐ hǎo!"
      }
    }
  ],
  "zh-l1-c01": [
    {
      "id": "zh-l1-c01-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 你好 » ?",
      "promptEn": "What does \"你好\" mean?",
      "choices": [
        "Bonjour",
        "Bonjour (matin)",
        "Merci",
        "De rien / Je t'en prie"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 你好 » signifie « Bonjour » .",
      "explanationEn": "\"你好\" means \"Bonjour\"."
    },
    {
      "id": "zh-l1-c01-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Bonjour (matin) » ?",
      "promptEn": "Which expression matches \"Bonjour (matin)\"?",
      "choices": [
        "早上好",
        "你好",
        "谢谢",
        "不客气"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 早上好 » .",
      "explanationEn": "The correct answer is \"早上好\"."
    },
    {
      "id": "zh-l1-c01-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Bonjour !",
        "translationEn": "Bonjour !",
        "words": [
          "你",
          "好",
          "！"
        ],
        "correctOrder": [
          "你",
          "好",
          "！"
        ],
        "pinyin": "nǐ hǎo!"
      }
    }
  ],
  "zh-l1-c02": [
    {
      "id": "zh-l1-c02-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 是 » ?",
      "promptEn": "What does \"是\" mean?",
      "choices": [
        "Oui / C'est ça (affirmation)",
        "Non / Ce n'est pas",
        "Oui / C'est correct",
        "Non / Ce n'est pas correct"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 是 » signifie « Oui / C'est ça (affirmation) » .",
      "explanationEn": "\"是\" means \"Oui / C'est ça (affirmation)\"."
    },
    {
      "id": "zh-l1-c02-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Non / Ce n'est pas » ?",
      "promptEn": "Which expression matches \"Non / Ce n'est pas\"?",
      "choices": [
        "不是",
        "是",
        "对",
        "不对"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 不是 » .",
      "explanationEn": "The correct answer is \"不是\"."
    },
    {
      "id": "zh-l1-c02-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Tu es étudiant(e) ?",
        "translationEn": "Tu es étudiant(e) ?",
        "words": [
          "你",
          "是",
          "学",
          "生",
          "吗",
          "？"
        ],
        "correctOrder": [
          "你",
          "是",
          "学",
          "生",
          "吗",
          "？"
        ],
        "pinyin": "nǐ shì xuéshēng ma?"
      }
    }
  ],
  "zh-l1-c03": [
    {
      "id": "zh-l1-c03-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 再见 » ?",
      "promptEn": "What does \"再见\" mean?",
      "choices": [
        "Au revoir",
        "Bye bye (familier)",
        "À demain",
        "À plus tard"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 再见 » signifie « Au revoir » .",
      "explanationEn": "\"再见\" means \"Au revoir\"."
    },
    {
      "id": "zh-l1-c03-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Bye bye (familier) » ?",
      "promptEn": "Which expression matches \"Bye bye (familier)\"?",
      "choices": [
        "拜拜",
        "再见",
        "明天见",
        "回头见"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 拜拜 » .",
      "explanationEn": "The correct answer is \"拜拜\"."
    },
    {
      "id": "zh-l1-c03-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Je dois y aller, au revoir !",
        "translationEn": "Je dois y aller, au revoir !",
        "words": [
          "我",
          "先",
          "走",
          "了",
          "，",
          "再",
          "见",
          "！"
        ],
        "correctOrder": [
          "我",
          "先",
          "走",
          "了",
          "，",
          "再",
          "见",
          "！"
        ],
        "pinyin": "wǒ xiān zǒu le, zàijiàn!"
      }
    }
  ],
  "zh-l1-c04": [
    {
      "id": "zh-l1-c04-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 对不起 » ?",
      "promptEn": "What does \"对不起\" mean?",
      "choices": [
        "Désolé(e) / Pardon (excuse)",
        "Désolé(e) / Pardon (gêne)",
        "Excusez-moi, puis-je demander…",
        "Désolé de te déranger / Je te sollicite"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 对不起 » signifie « Désolé(e) / Pardon (excuse) » .",
      "explanationEn": "\"对不起\" means \"Désolé(e) / Pardon (excuse)\"."
    },
    {
      "id": "zh-l1-c04-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Désolé(e) / Pardon (gêne) » ?",
      "promptEn": "Which expression matches \"Désolé(e) / Pardon (gêne)\"?",
      "choices": [
        "不好意思",
        "对不起",
        "请问",
        "麻烦你"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 不好意思 » .",
      "explanationEn": "The correct answer is \"不好意思\"."
    },
    {
      "id": "zh-l1-c04-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Désolé, je suis en retard.",
        "translationEn": "Désolé, je suis en retard.",
        "words": [
          "对",
          "不",
          "起",
          "，",
          "我",
          "迟",
          "到",
          "了",
          "。"
        ],
        "correctOrder": [
          "对",
          "不",
          "起",
          "，",
          "我",
          "迟",
          "到",
          "了",
          "。"
        ],
        "pinyin": "duìbuqǐ, wǒ chídào le."
      }
    }
  ],
  "zh-l1-c05": [
    {
      "id": "zh-l1-c05-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 我是… » ?",
      "promptEn": "What does \"我是…\" mean?",
      "choices": [
        "Je suis…",
        "Je m'appelle…",
        "C'est… (ceci)",
        "C'est… (cela)"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 我是… » signifie « Je suis… » .",
      "explanationEn": "\"我是…\" means \"Je suis…\"."
    },
    {
      "id": "zh-l1-c05-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Je m'appelle… » ?",
      "promptEn": "Which expression matches \"Je m'appelle…\"?",
      "choices": [
        "我叫…",
        "我是…",
        "这是…",
        "那是…"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 我叫… » .",
      "explanationEn": "The correct answer is \"我叫…\"."
    },
    {
      "id": "zh-l1-c05-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Je suis Français(e).",
        "translationEn": "Je suis Français(e).",
        "words": [
          "我",
          "是",
          "法",
          "国",
          "人",
          "。"
        ],
        "correctOrder": [
          "我",
          "是",
          "法",
          "国",
          "人",
          "。"
        ],
        "pinyin": "wǒ shì Fǎguórén."
      }
    }
  ],
  "zh-l1-c06": [
    {
      "id": "zh-l1-c06-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 这是什么？ » ?",
      "promptEn": "What does \"这是什么？\" mean?",
      "choices": [
        "Qu'est-ce que c'est ? (ceci)",
        "Qu'est-ce que c'est ? (cela)",
        "C'est… (ceci)",
        "C'est… (cela)"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 这是什么？ » signifie « Qu'est-ce que c'est ? (ceci) » .",
      "explanationEn": "\"这是什么？\" means \"Qu'est-ce que c'est ? (ceci)\"."
    },
    {
      "id": "zh-l1-c06-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Qu'est-ce que c'est ? (cela) » ?",
      "promptEn": "Which expression matches \"Qu'est-ce que c'est ? (cela)\"?",
      "choices": [
        "那是什么？",
        "这是什么？",
        "这是…",
        "那是…"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 那是什么？ » .",
      "explanationEn": "The correct answer is \"那是什么？\"."
    },
    {
      "id": "zh-l1-c06-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Qu'est-ce que c'est ?",
        "translationEn": "Qu'est-ce que c'est ?",
        "words": [
          "这",
          "是",
          "什",
          "么",
          "？"
        ],
        "correctOrder": [
          "这",
          "是",
          "什",
          "么",
          "？"
        ],
        "pinyin": "zhè shì shénme?"
      }
    }
  ],
  "zh-l1-c07": [
    {
      "id": "zh-l1-c07-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 这 » ?",
      "promptEn": "What does \"这\" mean?",
      "choices": [
        "ceci / ce…",
        "cela / ce… (là-bas)",
        "ceci / ce… (avec classificateur)",
        "cela / ce… (avec classificateur)"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 这 » signifie « ceci / ce… » .",
      "explanationEn": "\"这\" means \"ceci / ce…\"."
    },
    {
      "id": "zh-l1-c07-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « cela / ce… (là-bas) » ?",
      "promptEn": "Which expression matches \"cela / ce… (là-bas)\"?",
      "choices": [
        "那",
        "这",
        "这个",
        "那个"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 那 » .",
      "explanationEn": "The correct answer is \"那\"."
    },
    {
      "id": "zh-l1-c07-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "C'est quoi, ça ?",
        "translationEn": "C'est quoi, ça ?",
        "words": [
          "这",
          "个",
          "是",
          "什",
          "么",
          "？"
        ],
        "correctOrder": [
          "这",
          "个",
          "是",
          "什",
          "么",
          "？"
        ],
        "pinyin": "zhège shì shénme?"
      }
    }
  ],
  "zh-l1-c08": [
    {
      "id": "zh-l1-c08-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 不是… » ?",
      "promptEn": "What does \"不是…\" mean?",
      "choices": [
        "Ce n'est pas…",
        "Ne… pas (présent / habitude)",
        "Je n'y vais pas.",
        "Pas bien / Pas bon."
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 不是… » signifie « Ce n'est pas… » .",
      "explanationEn": "\"不是…\" means \"Ce n'est pas…\"."
    },
    {
      "id": "zh-l1-c08-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Ne… pas (présent / habitude) » ?",
      "promptEn": "Which expression matches \"Ne… pas (présent / habitude)\"?",
      "choices": [
        "不…",
        "不是…",
        "我不去。",
        "不好。"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 不… » .",
      "explanationEn": "The correct answer is \"不…\"."
    },
    {
      "id": "zh-l1-c08-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Ce n'est pas du thé.",
        "translationEn": "Ce n'est pas du thé.",
        "words": [
          "这",
          "不",
          "是",
          "茶",
          "。"
        ],
        "correctOrder": [
          "这",
          "不",
          "是",
          "茶",
          "。"
        ],
        "pinyin": "zhè bú shì chá."
      }
    }
  ],
  "zh-l1-c09": [
    {
      "id": "zh-l1-c09-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 有 » ?",
      "promptEn": "What does \"有\" mean?",
      "choices": [
        "avoir / il y a",
        "ne pas avoir / il n'y a pas",
        "J'ai…",
        "Ici, il y a…"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 有 » signifie « avoir / il y a » .",
      "explanationEn": "\"有\" means \"avoir / il y a\"."
    },
    {
      "id": "zh-l1-c09-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « ne pas avoir / il n'y a pas » ?",
      "promptEn": "Which expression matches \"ne pas avoir / il n'y a pas\"?",
      "choices": [
        "没有",
        "有",
        "我有…",
        "这里有…"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 没有 » .",
      "explanationEn": "The correct answer is \"没有\"."
    },
    {
      "id": "zh-l1-c09-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Tu as du temps ?",
        "translationEn": "Tu as du temps ?",
        "words": [
          "你",
          "有",
          "时",
          "间",
          "吗",
          "？"
        ],
        "correctOrder": [
          "你",
          "有",
          "时",
          "间",
          "吗",
          "？"
        ],
        "pinyin": "nǐ yǒu shíjiān ma?"
      }
    }
  ],
  "zh-l1-c10": [
    {
      "id": "zh-l1-c10-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 这里有…吗？ » ?",
      "promptEn": "What does \"这里有…吗？\" mean?",
      "choices": [
        "Est-ce qu'il y a… ici ?",
        "Tu as… ?",
        "Donne-moi…",
        "S'il vous plaît, donnez-moi…"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 这里有…吗？ » signifie « Est-ce qu'il y a… ici ? » .",
      "explanationEn": "\"这里有…吗？\" means \"Est-ce qu'il y a… ici ?\"."
    },
    {
      "id": "zh-l1-c10-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Tu as… ? » ?",
      "promptEn": "Which expression matches \"Tu as… ?\"?",
      "choices": [
        "你有…吗？",
        "这里有…吗？",
        "给我…",
        "请给我…"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 你有…吗？ » .",
      "explanationEn": "The correct answer is \"你有…吗？\"."
    },
    {
      "id": "zh-l1-c10-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Est-ce qu'il y a du café ici ?",
        "translationEn": "Est-ce qu'il y a du café ici ?",
        "words": [
          "这",
          "里",
          "有",
          "咖",
          "啡",
          "吗",
          "？"
        ],
        "correctOrder": [
          "这",
          "里",
          "有",
          "咖",
          "啡",
          "吗",
          "？"
        ],
        "pinyin": "zhèlǐ yǒu kāfēi ma?"
      }
    }
  ],
  "zh-l1-c11": [
    {
      "id": "zh-l1-c11-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 好吃 » ?",
      "promptEn": "What does \"好吃\" mean?",
      "choices": [
        "C'est bon (à manger)",
        "Ce n'est pas bon",
        "C'est vraiment bon",
        "Merci pour le repas"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 好吃 » signifie « C'est bon (à manger) » .",
      "explanationEn": "\"好吃\" means \"C'est bon (à manger)\"."
    },
    {
      "id": "zh-l1-c11-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Ce n'est pas bon » ?",
      "promptEn": "Which expression matches \"Ce n'est pas bon\"?",
      "choices": [
        "不好吃",
        "好吃",
        "真好吃",
        "谢谢你做的饭"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 不好吃 » .",
      "explanationEn": "The correct answer is \"不好吃\"."
    },
    {
      "id": "zh-l1-c11-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "C'est vraiment bon !",
        "translationEn": "C'est vraiment bon !",
        "words": [
          "这",
          "个",
          "真",
          "好",
          "吃",
          "！"
        ],
        "correctOrder": [
          "这",
          "个",
          "真",
          "好",
          "吃",
          "！"
        ],
        "pinyin": "zhège zhēn hǎochī!"
      }
    }
  ],
  "zh-l1-c12": [
    {
      "id": "zh-l1-c12-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 我要… » ?",
      "promptEn": "What does \"我要…\" mean?",
      "choices": [
        "Je veux / Je prends… (direct)",
        "J'aimerais / J'ai envie de…",
        "Je veux / Je pense… (selon contexte)",
        "Je prends un café."
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 我要… » signifie « Je veux / Je prends… (direct) » .",
      "explanationEn": "\"我要…\" means \"Je veux / Je prends… (direct)\"."
    },
    {
      "id": "zh-l1-c12-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « J'aimerais / J'ai envie de… » ?",
      "promptEn": "Which expression matches \"J'aimerais / J'ai envie de…\"?",
      "choices": [
        "我想要…",
        "我要…",
        "我想…",
        "我要咖啡。"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 我想要… » .",
      "explanationEn": "The correct answer is \"我想要…\"."
    },
    {
      "id": "zh-l1-c12-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Je prends un café.",
        "translationEn": "Je prends un café.",
        "words": [
          "我",
          "要",
          "咖",
          "啡",
          "。"
        ],
        "correctOrder": [
          "我",
          "要",
          "咖",
          "啡",
          "。"
        ],
        "pinyin": "wǒ yào kāfēi."
      }
    }
  ],
  "zh-l1-c13": [
    {
      "id": "zh-l1-c13-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 我想去… » ?",
      "promptEn": "What does \"我想去…\" mean?",
      "choices": [
        "Je veux aller à…",
        "Je veux apprendre…",
        "Je veux pratiquer…",
        "Je veux apprendre le chinois."
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 我想去… » signifie « Je veux aller à… » .",
      "explanationEn": "\"我想去…\" means \"Je veux aller à…\"."
    },
    {
      "id": "zh-l1-c13-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Je veux apprendre… » ?",
      "promptEn": "Which expression matches \"Je veux apprendre…\"?",
      "choices": [
        "我想学…",
        "我想去…",
        "我想练习…",
        "我想学汉语。"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 我想学… » .",
      "explanationEn": "The correct answer is \"我想学…\"."
    },
    {
      "id": "zh-l1-c13-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Je veux apprendre le chinois.",
        "translationEn": "Je veux apprendre le chinois.",
        "words": [
          "我",
          "想",
          "学",
          "汉",
          "语",
          "。"
        ],
        "correctOrder": [
          "我",
          "想",
          "学",
          "汉",
          "语",
          "。"
        ],
        "pinyin": "wǒ xiǎng xué Hànyǔ."
      }
    }
  ],
  "zh-l1-g01": [
    {
      "id": "zh-l1-g01-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 我喝咖啡。 » ?",
      "promptEn": "What does \"我喝咖啡。\" mean?",
      "choices": [
        "Je bois du café.",
        "Aujourd'hui, je bois du café.",
        "À la maison, j'étudie."
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 我喝咖啡。 » signifie « Je bois du café. » .",
      "explanationEn": "\"我喝咖啡。\" means \"Je bois du café.\"."
    },
    {
      "id": "zh-l1-g01-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Aujourd'hui, je bois du café. » ?",
      "promptEn": "Which expression matches \"Aujourd'hui, je bois du café.\"?",
      "choices": [
        "今天我喝咖啡。",
        "我喝咖啡。",
        "在家我学习。"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 今天我喝咖啡。 » .",
      "explanationEn": "The correct answer is \"今天我喝咖啡。\"."
    },
    {
      "id": "zh-l1-g01-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Je bois du café.",
        "translationEn": "Je bois du café.",
        "words": [
          "我",
          "喝",
          "咖",
          "啡",
          "。"
        ],
        "correctOrder": [
          "我",
          "喝",
          "咖",
          "啡",
          "。"
        ],
        "pinyin": "wǒ hē kāfēi."
      }
    }
  ],
  "zh-l1-g02": [
    {
      "id": "zh-l1-g02-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 我在家。 » ?",
      "promptEn": "What does \"我在家。\" mean?",
      "choices": [
        "Je suis à la maison.",
        "Je vais à l'école.",
        "Je viens de France."
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 我在家。 » signifie « Je suis à la maison. » .",
      "explanationEn": "\"我在家。\" means \"Je suis à la maison.\"."
    },
    {
      "id": "zh-l1-g02-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Je vais à l'école. » ?",
      "promptEn": "Which expression matches \"Je vais à l'école.\"?",
      "choices": [
        "我到学校。",
        "我在家。",
        "我从法国来。"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 我到学校。 » .",
      "explanationEn": "The correct answer is \"我到学校。\"."
    },
    {
      "id": "zh-l1-g02-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Je suis à la maison.",
        "translationEn": "Je suis à la maison.",
        "words": [
          "我",
          "在",
          "家",
          "。"
        ],
        "correctOrder": [
          "我",
          "在",
          "家",
          "。"
        ],
        "pinyin": "wǒ zài jiā."
      }
    }
  ],
  "zh-l1-g03": [
    {
      "id": "zh-l1-g03-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 我今天很忙。 » ?",
      "promptEn": "What does \"我今天很忙。\" mean?",
      "choices": [
        "Aujourd'hui je suis très occupé(e).",
        "Demain, je vais à l'école.",
        "Tu viens quand ?"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 我今天很忙。 » signifie « Aujourd'hui je suis très occupé(e). » .",
      "explanationEn": "\"我今天很忙。\" means \"Aujourd'hui je suis très occupé(e).\"."
    },
    {
      "id": "zh-l1-g03-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Demain, je vais à l'école. » ?",
      "promptEn": "Which expression matches \"Demain, je vais à l'école.\"?",
      "choices": [
        "明天我去学校。",
        "我今天很忙。",
        "你什么时候来？"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 明天我去学校。 » .",
      "explanationEn": "The correct answer is \"明天我去学校。\"."
    },
    {
      "id": "zh-l1-g03-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Aujourd'hui je suis très occupé(e).",
        "translationEn": "Aujourd'hui je suis très occupé(e).",
        "words": [
          "我",
          "今",
          "天",
          "很",
          "忙",
          "。"
        ],
        "correctOrder": [
          "我",
          "今",
          "天",
          "很",
          "忙",
          "。"
        ],
        "pinyin": "wǒ jīntiān hěn máng."
      }
    }
  ],
  "zh-l1-g04": [
    {
      "id": "zh-l1-g04-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 我不去。 » ?",
      "promptEn": "What does \"我不去。\" mean?",
      "choices": [
        "Je n'y vais pas.",
        "Je n'y suis pas allé(e).",
        "Je n'ai pas encore mangé."
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 我不去。 » signifie « Je n'y vais pas. » .",
      "explanationEn": "\"我不去。\" means \"Je n'y vais pas.\"."
    },
    {
      "id": "zh-l1-g04-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Je n'y suis pas allé(e). » ?",
      "promptEn": "Which expression matches \"Je n'y suis pas allé(e).\"?",
      "choices": [
        "我没去。",
        "我不去。",
        "我还没吃。"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 我没去。 » .",
      "explanationEn": "The correct answer is \"我没去。\"."
    },
    {
      "id": "zh-l1-g04-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Je n'y vais pas.",
        "translationEn": "Je n'y vais pas.",
        "words": [
          "我",
          "不",
          "去",
          "。"
        ],
        "correctOrder": [
          "我",
          "不",
          "去",
          "。"
        ],
        "pinyin": "wǒ bù qù."
      }
    }
  ],
  "zh-l1-g05": [
    {
      "id": "zh-l1-g05-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 你是谁？ » ?",
      "promptEn": "What does \"你是谁？\" mean?",
      "choices": [
        "Tu es qui ?",
        "Qui est le professeur ?",
        "C'est qui, ça ?"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 你是谁？ » signifie « Tu es qui ? » .",
      "explanationEn": "\"你是谁？\" means \"Tu es qui ?\"."
    },
    {
      "id": "zh-l1-g05-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Qui est le professeur ? » ?",
      "promptEn": "Which expression matches \"Qui est le professeur ?\"?",
      "choices": [
        "谁是老师？",
        "你是谁？",
        "那是谁？"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 谁是老师？ » .",
      "explanationEn": "The correct answer is \"谁是老师？\"."
    },
    {
      "id": "zh-l1-g05-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Tu es qui ?",
        "translationEn": "Tu es qui ?",
        "words": [
          "你",
          "是",
          "谁",
          "？"
        ],
        "correctOrder": [
          "你",
          "是",
          "谁",
          "？"
        ],
        "pinyin": "nǐ shì shéi?"
      }
    }
  ],
  "zh-l1-g06": [
    {
      "id": "zh-l1-g06-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 你怎么去？ » ?",
      "promptEn": "What does \"你怎么去？\" mean?",
      "choices": [
        "Tu y vas comment ?",
        "Pourquoi tu n'y vas pas ?",
        "Tu as quel âge ?"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 你怎么去？ » signifie « Tu y vas comment ? » .",
      "explanationEn": "\"你怎么去？\" means \"Tu y vas comment ?\"."
    },
    {
      "id": "zh-l1-g06-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Pourquoi tu n'y vas pas ? » ?",
      "promptEn": "Which expression matches \"Pourquoi tu n'y vas pas ?\"?",
      "choices": [
        "你为什么不去？",
        "你怎么去？",
        "你几岁？"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 你为什么不去？ » .",
      "explanationEn": "The correct answer is \"你为什么不去？\"."
    },
    {
      "id": "zh-l1-g06-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Tu y vas comment ?",
        "translationEn": "Tu y vas comment ?",
        "words": [
          "你",
          "怎",
          "么",
          "去",
          "？"
        ],
        "correctOrder": [
          "你",
          "怎",
          "么",
          "去",
          "？"
        ],
        "pinyin": "nǐ zěnme qù?"
      }
    }
  ],
  "zh-l1-g07": [
    {
      "id": "zh-l1-g07-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 我从家到学校。 » ?",
      "promptEn": "What does \"我从家到学校。\" mean?",
      "choices": [
        "Je vais de la maison à l'école.",
        "Tu viens ?",
        "Je vais à Pékin."
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 我从家到学校。 » signifie « Je vais de la maison à l'école. » .",
      "explanationEn": "\"我从家到学校。\" means \"Je vais de la maison à l'école.\"."
    },
    {
      "id": "zh-l1-g07-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Tu viens ? » ?",
      "promptEn": "Which expression matches \"Tu viens ?\"?",
      "choices": [
        "你来吗？",
        "我从家到学校。",
        "我去北京。"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 你来吗？ » .",
      "explanationEn": "The correct answer is \"你来吗？\"."
    },
    {
      "id": "zh-l1-g07-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Je vais de la maison à l'école.",
        "translationEn": "Je vais de la maison à l'école.",
        "words": [
          "我",
          "从",
          "家",
          "到",
          "学",
          "校",
          "。"
        ],
        "correctOrder": [
          "我",
          "从",
          "家",
          "到",
          "学",
          "校",
          "。"
        ],
        "pinyin": "wǒ cóng jiā dào xuéxiào."
      }
    }
  ],
  "zh-l1-n01": [
    {
      "id": "zh-l1-n01-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 零 » ?",
      "promptEn": "What does \"零\" mean?",
      "choices": [
        "0",
        "10",
        "100",
        "1000"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 零 » signifie « 0 » .",
      "explanationEn": "\"零\" means \"0\"."
    },
    {
      "id": "zh-l1-n01-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « 10 » ?",
      "promptEn": "Which expression matches \"10\"?",
      "choices": [
        "十",
        "零",
        "百",
        "千"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 十 » .",
      "explanationEn": "The correct answer is \"十\"."
    },
    {
      "id": "zh-l1-n01-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "J'ai 30 yuans.",
        "translationEn": "J'ai 30 yuans.",
        "words": [
          "我",
          "有",
          "三",
          "十",
          "块",
          "。"
        ],
        "correctOrder": [
          "我",
          "有",
          "三",
          "十",
          "块",
          "。"
        ],
        "pinyin": "wǒ yǒu sānshí kuài."
      }
    }
  ],
  "zh-l1-n02": [
    {
      "id": "zh-l1-n02-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 岁 » ?",
      "promptEn": "What does \"岁\" mean?",
      "choices": [
        "ans (âge)",
        "année / mois / jour",
        "heure / minute",
        "J'ai 25 ans."
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 岁 » signifie « ans (âge) » .",
      "explanationEn": "\"岁\" means \"ans (âge)\"."
    },
    {
      "id": "zh-l1-n02-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « année / mois / jour » ?",
      "promptEn": "Which expression matches \"année / mois / jour\"?",
      "choices": [
        "年 / 月 / 日",
        "岁",
        "点 / 分",
        "我二十五岁。"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 年 / 月 / 日 » .",
      "explanationEn": "The correct answer is \"年 / 月 / 日\"."
    },
    {
      "id": "zh-l1-n02-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Tu as quel âge ?",
        "translationEn": "Tu as quel âge ?",
        "words": [
          "你",
          "几",
          "岁",
          "？"
        ],
        "correctOrder": [
          "你",
          "几",
          "岁",
          "？"
        ],
        "pinyin": "nǐ jǐ suì?"
      }
    }
  ],
  "zh-l1-v01": [
    {
      "id": "zh-l1-v01-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 我吃饭。 » ?",
      "promptEn": "What does \"我吃饭。\" mean?",
      "choices": [
        "Je mange.",
        "Je suis en train de manger.",
        "Je suis en train d'étudier (insistance).",
        "Tu fais quoi (là) ?"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 我吃饭。 » signifie « Je mange. » .",
      "explanationEn": "\"我吃饭。\" means \"Je mange.\"."
    },
    {
      "id": "zh-l1-v01-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « Je suis en train de manger. » ?",
      "promptEn": "Which expression matches \"Je suis en train de manger.\"?",
      "choices": [
        "我在吃饭。",
        "我吃饭。",
        "我正在学习。",
        "你在做什么？"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 我在吃饭。 » .",
      "explanationEn": "The correct answer is \"我在吃饭。\"."
    },
    {
      "id": "zh-l1-v01-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Tu fais quoi (là) ?",
        "translationEn": "Tu fais quoi (là) ?",
        "words": [
          "你",
          "在",
          "做",
          "什",
          "么",
          "？"
        ],
        "correctOrder": [
          "你",
          "在",
          "做",
          "什",
          "么",
          "？"
        ],
        "pinyin": "nǐ zài zuò shénme?"
      }
    }
  ],
  "zh-l1-v02": [
    {
      "id": "zh-l1-v02-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 我吃了。 » ?",
      "promptEn": "What does \"我吃了。\" mean?",
      "choices": [
        "J'ai mangé.",
        "J'ai regardé un film.",
        "Je ne suis pas allé(e).",
        "Tu as mangé ? (salutation courante)"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 我吃了。 » signifie « J'ai mangé. » .",
      "explanationEn": "\"我吃了。\" means \"J'ai mangé.\"."
    },
    {
      "id": "zh-l1-v02-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « J'ai regardé un film. » ?",
      "promptEn": "Which expression matches \"J'ai regardé un film.\"?",
      "choices": [
        "我看了电影。",
        "我吃了。",
        "我没去。",
        "你吃了吗？"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 我看了电影。 » .",
      "explanationEn": "The correct answer is \"我看了电影。\"."
    },
    {
      "id": "zh-l1-v02-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Tu as mangé ? (salutation courante)",
        "translationEn": "Tu as mangé ? (salutation courante)",
        "words": [
          "你",
          "吃",
          "了",
          "吗",
          "？"
        ],
        "correctOrder": [
          "你",
          "吃",
          "了",
          "吗",
          "？"
        ],
        "pinyin": "nǐ chī le ma?"
      }
    }
  ],
  "zh-l1-v03": [
    {
      "id": "zh-l1-v03-mcq-meaning",
      "type": "text-mcq",
      "promptFr": "Que signifie « 我要去。 » ?",
      "promptEn": "What does \"我要去。\" mean?",
      "choices": [
        "Je veux y aller / Je vais y aller.",
        "J'ai envie d'y aller.",
        "Je sais parler chinois.",
        "Je peux venir (capacité)."
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "« 我要去。 » signifie « Je veux y aller / Je vais y aller. » .",
      "explanationEn": "\"我要去。\" means \"Je veux y aller / Je vais y aller.\"."
    },
    {
      "id": "zh-l1-v03-mcq-form",
      "type": "text-mcq",
      "promptFr": "Quelle expression correspond a « J'ai envie d'y aller. » ?",
      "promptEn": "Which expression matches \"J'ai envie d'y aller.\"?",
      "choices": [
        "我想去。",
        "我要去。",
        "我会说中文。",
        "我能来。"
      ],
      "correctChoiceIndex": 0,
      "explanationFr": "La bonne reponse est « 我想去。 » .",
      "explanationEn": "The correct answer is \"我想去。\"."
    },
    {
      "id": "zh-l1-v03-rebuild",
      "type": "grammar",
      "quiz": {
        "type": "sentence-reconstruction",
        "translation": "Demain je viendrai (probable).",
        "translationEn": "Demain je viendrai (probable).",
        "words": [
          "明",
          "天",
          "我",
          "会",
          "来",
          "。"
        ],
        "correctOrder": [
          "明",
          "天",
          "我",
          "会",
          "来",
          "。"
        ],
        "pinyin": "míngtiān wǒ huì lái."
      }
    }
  ]
};
