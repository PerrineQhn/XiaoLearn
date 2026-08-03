# Kit de prompts — Avatars évolutifs (10 niveaux)

Le personnage du joueur évolue à mesure qu'il progresse : niveau 1 en tenue
ordinaire, sans le moindre accessoire, jusqu'au niveau 10 en toge de diplômé.

**10 personnages** — cinq filles, cinq garçons — soit 100 images. Lin et Hao
sont faits ; les huit autres restent à générer.

## 1. Comment ce kit est construit

Chaque prompt est un assemblage de trois blocs :

```
[ PROMPT DE STYLE ]  identique pour tout le jeu, jamais modifié
[ IDENTITÉ ]         propre au personnage (cheveux, peau, couleur signature)
[ NIVEAU ]           propre au palier 1 → 10, réutilisable pour TOUS les personnages
```

C'est ce découpage qui rend l'ensemble extensible : quand tu voudras faire
évoluer les 48 avatars existants, tu ne réécriras rien — tu réutiliseras les
mêmes 10 blocs « niveau » avec une autre identité.

### Ce qui doit rester rigoureusement identique d'un niveau à l'autre

Le joueur doit reconnaître **son** personnage à chaque palier. Donc :

- coiffure, couleur de cheveux, teint, forme des yeux, expression ;
- cadrage : même taille de tête, mêmes pieds au même endroit dans le carré ;
- fond crème uni, contour sombre épais, grille de pixels visible.

Seuls **les vêtements et les objets tenus** changent. Volontairement : si la
silhouette grandissait aussi, la vignette bougerait dans l'interface à chaque
palier et le dashboard deviendrait instable. Si tu veux quand même la
croissance physique façon Seonsaengnim, ajoute au bloc niveau :
`The character is slightly taller and stands more confidently than at level 1.`
— mais alors garde les pieds à la même hauteur, sinon le cadrage danse.

## 2. Méthode de génération

L'enjeu, c'est la **dérive** : au bout de trois images, Gemini a repeint la
coiffure et changé le teint. La parade est toujours la même.

1. Génère d'abord **le niveau 1** du personnage, dans une conversation neuve.
   Relance jusqu'à en avoir un irréprochable. C'est ton **ancre**.
2. Pour chaque niveau 2 → 10, dans une **conversation vierge à chaque fois** :
   - téléverse **l'ancre du niveau 1** (jamais l'image du niveau précédent) ;
   - colle le prompt de style, puis l'identité, puis le bloc du niveau ;
   - ajoute : *« Same character as the reference image: identical hair, face,
     skin tone, proportions, framing and background. Only the clothing and the
     held objects change. »*
   - garde la meilleure des 2-3 variantes, **ferme la conversation**.

> Un niveau = une conversation. Jamais de chaînage : c'est ce qui a fait
> dériver le premier lot.

**Export** : PNG carré 2048×2048, nommés `avatar_<personnage>_<palier>.png` —
donc `avatar_f02_01.png` … `avatar_f02_10.png` pour Nour, puis `g02` pour
Émile, `f03` pour Yasmine, `g03` pour Kenji, `f04` pour Rosa et `g04` pour
Marco, `f05` pour Clara et `g05` pour Malik.
Dépose-les dans `avatar_sources/evolution/` — je m'occupe du détourage (fond
retiré, filigrane et ombre au sol compris) et du branchement dans l'app.

## 3. Prompt de style (à coller intégralement dans CHAQUE conversation)

```
A cute chibi character avatar for a mobile app, in crisp pixel-art style.

FORMAT (identical for every image in the set):
- Square canvas. The character is centred, full body, facing the viewer.
- Big head (about 45% of total height), small body, standing straight,
  arms relaxed at the sides.
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

## 5. Les 10 niveaux

Réutilisables tels quels pour n'importe quel personnage.

### Niveau 1 — Le premier jour
Rien du tout. C'est le point de départ : la progression ne se lit que s'il n'y
a strictement aucun accessoire ici.

```
LEVEL 1 — the very first day. Plain undecorated outfit: a simple solid-colour short-sleeved t-shirt, plain blue jeans, plain white sneakers. Absolutely no accessories: no bag, no glasses, no jewellery, no hat, nothing held in the hands. Arms hang relaxed at the sides. The expression is a little shy.
```

### Niveau 2 — Le carnet
```
LEVEL 2 — the first notes. Same simple t-shirt and jeans, but the character now holds a small closed notebook against the chest with one hand, and has a single pencil tucked behind one ear. Nothing else.
```

### Niveau 3 — L'écolier
```
LEVEL 3 — going to class. Over the t-shirt, an open lightweight shirt in the character's signature colour, sleeves rolled up. A small school backpack worn on both shoulders, its straps visible on the chest. Still holding the notebook.
```

### Niveau 4 — L'assidu
```
LEVEL 4 — settling into a routine. A knitted cardigan in the signature colour over a white shirt, a plain scarf loosely around the neck, and a stack of two closed books carried under one arm. The pencil is still behind the ear.
```

### Niveau 5 — Le lecteur
```
LEVEL 5 — reading on their own. Round reading glasses. A cardigan over a buttoned shirt, dark trousers. One hand holds an open book at chest height, the other rests at the side. A bookmark ribbon hangs from the book.
```

### Niveau 6 — Le calligraphe
```
LEVEL 6 — learning the brush. Sleeve guards over the forearms, a simple dark apron over the shirt. One hand holds an upright Chinese calligraphy brush, the other a small round ink stone. Ink-stained fingertips.
```

### Niveau 7 — L'élève avancé
```
LEVEL 7 — confident student. A neat buttoned shirt in the signature colour tucked into dark trousers, a leather satchel strap crossing the chest, and a small carved red name-seal hanging from the belt on a short cord.
```

### Niveau 8 — L'érudit
```
LEVEL 8 — the scholar. A modern indigo changshan jacket with a mandarin collar and frog buttons, worn over the shirt, dark trousers, plain dark shoes. A rolled paper scroll tucked under one arm. Round glasses.
```

### Niveau 9 — Le finaliste
```
LEVEL 9 — almost there. The indigo changshan jacket, plus a wide ceremonial sash worn across the chest in the character's signature colour. One hand holds a rolled scroll tied with a red ribbon. A small plum-blossom pin on the collar.
```

### Niveau 10 — Le diplômé
```
LEVEL 10 — graduation. A black academic gown with wide sleeves over the outfit, a black mortarboard cap with a gold tassel hanging to one side, and a bright honour stole around the neck striped in the character's signature colour. One hand proudly holds a rolled diploma tied with a red ribbon. White sneakers peek out from under the gown. The expression is a wide, delighted smile.
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
