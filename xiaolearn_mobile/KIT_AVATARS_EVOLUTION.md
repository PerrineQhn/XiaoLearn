# Kit de prompts — Avatars évolutifs (10 niveaux)

Le personnage du joueur évolue à mesure qu'il progresse : niveau 1 en tenue ordinaire, sans le moindre accessoire, jusqu'au palier 10 en robe de maître (师父).

**10 personnages** — cinq filles, cinq garçons — soit 100 images. Lin et Hao sont faits ; les huit autres restent à générer.

## 1. Comment ce kit est construit

Chaque prompt est un assemblage de trois blocs :

```
[ PROMPT DE STYLE ]  identique pour tout le jeu, jamais modifié
[ IDENTITÉ ]         propre au personnage (cheveux, peau, couleur signature)
[ NIVEAU ]           propre au palier 1 → 10, réutilisable pour TOUS les personnages
```

C'est ce découpage qui rend l'ensemble extensible : quand tu voudras faire évoluer les 48 avatars existants, tu ne réécriras rien — tu réutiliseras les mêmes 10 blocs « niveau » avec une autre identité.

### Ce qui doit rester rigoureusement identique d'un niveau à l'autre

Le joueur doit reconnaître **son** personnage à chaque palier. Donc :

- coiffure, couleur de cheveux, teint, forme des yeux, expression ;
- cadrage : même taille de tête, mêmes pieds au même endroit dans le carré ;
- fond crème uni, contour sombre épais, grille de pixels visible.

Seul **l'objet signature** change d'un palier à l'autre, et il remplace le
précédent. Volontairement : si la silhouette grandissait aussi, la vignette bougerait dans l'interface à chaque palier et le dashboard deviendrait instable. Si tu veux quand même la croissance physique façon Seonsaengnim, ajoute au bloc niveau :
`The character is slightly taller and stands more confidently than at level 1.`
— mais alors garde les pieds à la même hauteur, sinon le cadrage danse.

## 2. Méthode de génération

L'enjeu, c'est la **dérive** : au bout de trois images, Gemini a repeint la
coiffure et changé le teint. La parade est toujours la même.

1. Génère d'abord **le niveau 1** du personnage, dans une conversation neuve.
   Relance jusqu'à en avoir un irréprochable. C'est ton **ancre**.
2. Pour chaque palier 2 → 10, dans une **conversation vierge à chaque fois** :
   - téléverse **l'ancre du palier 1** (jamais l'image du palier précédent) ;
   - colle le prompt de style, puis l'identité, puis le bloc du palier ;
   - ajoute : *« Same character as the reference image: identical hair, face,
     skin tone, proportions, framing and background. Only the clothing and the
     held objects change. »*
   - garde la meilleure des 2-3 variantes, **ferme la conversation**.

Chaque bloc de la section 5 décrit **un seul objet**, et énumère ensuite ce qui ne doit PAS être là. C'est ce qui rend la méthode viable : avec la seule ancre du palier 1 sous les yeux — un personnage en t-shirt, sans rien — le modèle n'aurait aucun moyen de deviner ce que « les accessoires précédents » désigne.
Rien à mémoriser, donc rien à chaîner.

> Un niveau = une conversation. Jamais de chaînage : c'est ce qui a fait
> dériver le premier lot.

**Export** : PNG carré 2048×2048, nommés `avatar_<personnage>_<palier>.png` —
donc `avatar_f02_01.png` … `avatar_f02_10.png` pour Nour, puis `g02` pour Émile, `f03` pour Yasmine, `g03` pour Kenji, `f04` pour Rosa et `g04` pour Marco, `f05` pour Clara et `g05` pour Malik.
Dépose-les dans `avatar_sources/evolution/` — je m'occupe du détourage (fond retiré, filigrane et ombre au sol compris) et du branchement dans l'app.

## 3. Prompt de style (à coller intégralement dans CHAQUE conversation)

```
A cute chibi character avatar for a mobile app, in crisp pixel-art style.

FORMAT (identical for every image in the set):
- Square canvas. The character is centred, full body, facing the viewer.
- Big head (about 45% of total height), small body, standing straight, arms relaxed at the sides.
- The character fills about 80% of the canvas height, feet near the bottom.
- Background: one single flat colour, a soft warm cream (#F5F1E8). No gradient,
  no shadow on the ground, no decoration, nothing else.

ART STYLE: clean pixel art with a visible pixel grid, thick very dark outline around the whole character, flat colours with at most one shade tone per surface. Friendly, modern, slightly rounded silhouettes. The face is simple:
two dark eyes, tiny mouth, optional blush. NOT smooth vector art, NOT anti-aliased, NOT photorealistic.

MOOD: warm and welcoming — this is the player's avatar in a language-learning app.

No text anywhere in the image.
```

## 4. Identités

Le choix se fait sur une vignette de 130 px et l'avatar vit ensuite au coin du tableau de bord. Ce qui distingue deux personnages à cette taille, ce n'est ni le visage ni la tenue — c'est **la masse des cheveux**. D'où quatre silhouettes franchement différentes : queue de cheval haute (masse décalée en l'air), hérisson court (masse minimale), volume rond bouclé (masse large et centrée), mèches ondulées mi-longues (masse retombante), drapé lisse du foulard (masse close, sans découpe), crête ramenée en arrière sur côtés rasés (masse haute et étroite). Deux personnages qui se ressembleraient de loin ne serviraient à rien.

Même logique pour les couleurs signature : six teintes réparties sur le cercle
chromatique, pour qu'aucune paire de pastilles ne se confonde.

### `avatar_f01` — Lin, la fille

```
CHARACTER IDENTITY (must stay identical across all ten levels):
a young woman with long dark-brown hair tied in a high ponytail with a plain band, straight fringe, warm light skin, large dark-brown eyes, faint pink blush on the cheeks, calm friendly half-smile. Her signature colour is a soft jade green — whenever a garment needs an accent colour, use that jade.
```

### `avatar_g01` — Hao, le garçon

```
CHARACTER IDENTITY (must stay identical across all ten levels):
a young man with short tousled black hair and a small cowlick at the crown, warm light skin, large dark-brown eyes, straight eyebrows, calm friendly half-smile. His signature colour is a warm terracotta red — whenever a garment needs an accent colour, use that terracotta.
```

### `avatar_f02` — Nour, la fille

```
CHARACTER IDENTITY (must stay identical across all ten levels):
a young woman with short tightly-curled black hair forming a soft rounded afro that frames her face, deep warm brown skin, large dark eyes, small gold stud in one ear, calm friendly half-smile. Her signature colour is a bright amethyst purple — whenever a garment needs an accent colour, use that purple.
```

### `avatar_g02` — Émile, le garçon

```
CHARACTER IDENTITY (must stay identical across all ten levels):
a young man with wavy light-brown hair falling to just below the ears, a middle parting, fair skin with a light scattering of freckles across the nose, large hazel eyes, calm friendly half-smile. His signature colour is a clear sky blue — whenever a garment needs an accent colour, use that blue.
```

### `avatar_f03` — Yasmine, la fille

Le foulard remplace la chevelure : c'est lui qui doit rester rigoureusement identique d'un palier à l'autre. Au palier 10, le mortier se pose **par-dessus** le foulard, il ne le remplace pas.

```
CHARACTER IDENTITY (must stay identical across all ten levels):
a young woman wearing a smoothly draped plain headscarf that covers her hair and neck, framing a round face, light brown skin, large dark eyes, calm friendly half-smile. The headscarf is always the same soft neutral grey, never patterned. Her signature colour is a deep raspberry pink — whenever a garment needs an accent colour, use that raspberry.
```

### `avatar_g03` — Kenji, le garçon

```
CHARACTER IDENTITY (must stay identical across all ten levels):
a young man with black hair shaved short at the sides and longer on top, swept straight back into a small neat crest, light skin, narrow dark eyes, thin straight eyebrows, calm friendly half-smile. His signature colour is a fresh olive green — whenever a garment needs an accent colour, use that olive.
```

### `avatar_f04` — Rosa, la femme

```
CHARACTER IDENTITY (must stay identical across all ten levels):
a woman in her sixties with silver-grey hair cut in a neat chin-length bob with a clean straight edge, fair skin with soft laughter lines at the eyes, warm brown eyes, calm friendly half-smile. She looks kind and sharp, never frail.
Her signature colour is a warm amber gold — whenever a garment needs an accent colour, use that amber.
```

### `avatar_g04` — Marco, l'homme

```
CHARACTER IDENTITY (must stay identical across all ten levels):
a man in his forties with a completely shaved head and a short salt-and-pepper beard, olive-toned skin, dark eyes, thick eyebrows, calm friendly half-smile. No hair on the head at any level — the bare silhouette is his signature. His accent colour is a clear leaf green — whenever a garment needs an accent colour, use that leaf green.
```

### `avatar_f05` — Clara, la fille

Attention au blond : Gemini a tendance à le pousser vers le jaune vif, qui jure avec la palette. « Dark honey blonde » donne un blond chaud et lisible sur les deux thèmes.

```
CHARACTER IDENTITY (must stay identical across all ten levels):
a young woman with long straight dark honey blonde hair parted in the middle, falling in front of both shoulders down to the chest, fair skin, large blue-grey eyes, faint pink blush on the cheeks, calm friendly half-smile. Her signature
colour is a bright orchid pink — whenever a garment needs an accent colour, use that orchid.
```

### `avatar_g05` — Malik, le garçon

```
CHARACTER IDENTITY (must stay identical across all ten levels):
a young man with shoulder-length black locs gathered and tied back at the nape, a few strands framing his face, deep brown skin, large dark eyes, calm friendly half-smile. His signature colour is a deep indigo blue — whenever a garment needs an accent colour, use that indigo.
```

## 5. Les 10 paliers

Réutilisables tels quels pour n'importe quel personnage.

### Un objet à la fois, qui remplace le précédent

Chaque palier porte **un seul objet signature**, et il chasse celui du palier d'avant. Trois raisons.

L'avatar s'affiche à 130 px sur le tableau de bord et à 68 px dans la bande des paliers. Un objet se lit à cette taille ; six qui s'accumulent, non — un premier jet du kit les faisait s'empiler et le palier 9 devenait une bouillie.

Chaque palier gagne une identité. « La coiffe du lauréat » est un nom qu'on retient ; « le nœud plus la besace plus les lunettes plus l'éventail » n'en est pas un.

Et la silhouette change franchement d'un palier à l'autre, ce dont l'écran d'évolution a besoin : il fait alterner l'ancienne et la nouvelle forme en ombres blanches, et deux formes trop semblables ne produiraient qu'un scintillement.

### La logique des emplacements

L'objet monte le long du corps, puis la tête se libère :

poignet → poitrine → mains → mains → **trois coiffes** de prestige croissant → **tête nue** au palier 9 → robe de cérémonie au palier 10.

Les trois coiffes (bonnet du lettré, coiffe d'officier Tang, coiffe du lauréat impérial) forment le cœur de la montée. Se découvrir au palier 9 est le geste le plus fort de la série : le maître n'a plus besoin d'insigne.

### Palier 1 — Novice · Le premier jour
```
LEVEL 1 — Novice, the very first day. Plain undecorated outfit: a simple solid-colour short-sleeved t-shirt, plain blue jeans, plain white sneakers.
Absolutely no accessories: no bag, no glasses, no jewellery, no hat, nothing held in the hands. Arms hang relaxed at the sides. The expression is a little shy.
```

### Palier 2 — Apprenti · Le nœud rouge
```
LEVEL 2 — Apprentice. Same plain outfit as the reference: solid-colour short-sleeved t-shirt, blue jeans, white sneakers.
THE ONE ADDITION: a small braided red Chinese knot (中国结) around one wrist, with two short tassels.
Head bare, hands empty, arms relaxed at the sides. Nothing else.
```

### Palier 3 — Curieux · La besace
```
LEVEL 3 — Curious. Same t-shirt, jeans and white sneakers.
THE ONE ADDITION: a plain undyed cloth shoulder bag (布包) worn across the body, its strap crossing the chest.
No wrist knot. Head bare, hands empty, arms relaxed at the sides. Nothing else.
```

### Palier 4 — Lecteur · Le livre cousu
```
LEVEL 4 — Reader. Same t-shirt, jeans and white sneakers.
THE ONE ADDITION: small round reading glasses, and a thread-bound Chinese book (线装书) held against the chest with one hand.
No bag, no wrist knot. Head bare otherwise. Nothing else.
```

### Palier 5 — Bavard · L'éventail
```
LEVEL 5 — Talker. Same t-shirt, jeans and white sneakers.
THE ONE ADDITION: an open folding fan (折扇) held up in one hand, its ribs and paper clearly visible.
No glasses, no book, no bag. Head bare. The expression is openly cheerful, mouth slightly open as if mid-sentence. Nothing else.
```

### Palier 6 — Calligraphe · Le bonnet carré
```
LEVEL 6 — Calligrapher. Dark trousers and plain dark shoes.
THE ONE ADDITION: a scholar's square black cloth cap (方巾) on the head, dark fabric sleeve guards (袖套) over both forearms, and an upright Chinese calligraphy brush (毛笔) held in one hand.
No fan, no glasses, no bag. Ink-stained fingertips. Nothing else.
```

### Palier 7 — Conteur · La coiffe ailée
```
LEVEL 7 — Storyteller. Dark trousers and plain dark shoes.
THE ONE ADDITION: a Tang-dynasty official's black winged cap (幞头), its two flat wings clearly visible on either side of the head, and a small rectangular storyteller's wooden block (醒木) held in one hand.
No square cap, no brush, no sleeve guards. Nothing else.
```

### Palier 8 — Interprète · La coiffe du lauréat
```
LEVEL 8 — Interpreter. Dark trousers and plain dark shoes.
THE ONE ADDITION: the black cap of an imperial examination laureate (状元帽), with a small red silk flower at each side, and a red carved name-seal (印章) hanging at the waist on a short cord.
No winged cap, hands empty, arms relaxed at the sides. Nothing else.
```

### Palier 9 — Érudit · Le changshan
Le palier où l'on se découvre. Ne laisse aucun couvre-chef ici : c'est le
contraste avec les trois coiffes précédentes qui donne son sens au palier.

```
LEVEL 9 — Scholar. Dark trousers and plain dark shoes.
THE ONE ADDITION: a long indigo changshan (长衫) with a mandarin collar, worn closed over the outfit, and a carved jade pendant (玉佩) on a cord around the neck.
HEAD COMPLETELY BARE — no cap of any kind, the hair fully visible. Hands empty, arms relaxed at the sides. Nothing else.
```

### Palier 10 — Shīfu · La robe de maître
Le point d'arrivée n'est pas une remise de diplôme mais le rang de maître :
après neuf paliers d'objets chinois, une toge universitaire occidentale
casserait le registre.

```
LEVEL 10 — Shīfu, the master. Plain dark shoes.
THE ONE ADDITION: a full-length ceremonial Chinese robe (长袍) in deep indigo with wide sleeves, closed with an embroidered sash at the waist in the character's signature colour, and a rolled scroll tied with a red ribbon held in one hand.
HEAD BARE. Posture calm and upright. The expression is a serene, proud smile.
Nothing else.
```

## 6. Rappels anti-dérive

- **Une image = une conversation neuve.** Dès la troisième génération dans un
  même fil, la qualité baisse et le style glisse.
- **Toujours l'ancre du niveau 1**, jamais l'image du niveau précédent : sinon
  les écarts s'accumulent de proche en proche.
- Vérifie sur chaque image : le fond est-il vraiment uni ? (Le détourage échoue
  s'il y a un dégradé ou une ombre au sol.)
- Refuse les images où la tête a changé de taille — c'est le défaut le plus
  visible une fois les dix niveaux alignés côte à côte.
- Google AI Studio plutôt que l'app Gemini : pas de filigrane.
- Avant de lancer les neuf paliers d'un personnage, fais-moi voir **son
  niveau 1** : je le détoure et te le montre sur fond clair et sur fond sombre.
  Un défaut sur l'ancre se propagerait aux dix images.

## 7. Côté code (pour mémoire)

Les dix paliers vivent dans `STAGES` (rang, tenue, signe distinctif) et la
courbe de progression dans `STAGE_GAPS` — des écarts croissants (3, 4, 5, 5, 6,
7, 8, 9, 10 parts) répartis sur le nombre réel de leçons du cours. Résultat sur
les 355 leçons actuelles : premier palier à 19 leçons, dernier à 355. Une
répartition uniforme aurait fait attendre 40 leçons avant la moindre
récompense.

Ajouter un personnage ne touche que deux endroits de `data/avatarEvolution.ts` :
son entrée dans `AVATAR_CHARACTERS` (identifiant, prénom, couleur signature) et
ses dix `require()` dans la table `IMAGES`. Tout le reste — calcul du palier,
sélecteur, écran d'évolution — est générique et n'a pas à bouger.

La couleur signature déclarée dans le code doit correspondre à celle du prompt,
c'est elle qui teinte la bordure de sélection et le halo de l'évolution :

| Personnage | Couleur du prompt | Code      |
|------------|-------------------|-----------|
| Lin  `f01` | jade green        | `#2F9D8A` |
| Hao  `g01` | terracotta red    | `#C1553B` |
| Nour `f02` | amethyst purple   | `#8E5BC8` |
| Émile `g02`| sky blue          | `#3B82C4` |
| Yasmine `f03` | raspberry pink | `#C2477F` |
| Kenji `g03`| olive green       | `#7FA83C` |
| Rosa `f04`| amber gold        | `#D9A02B` |
| Marco `g04`| leaf green       | `#2FA82F` |
| Clara `f05`| orchid pink      | `#C75FC7` |
| Malik `g05`| indigo blue      | `#4245AD` |
