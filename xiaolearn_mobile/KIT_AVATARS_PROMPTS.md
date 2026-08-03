# Kit de prompts — Avatars XiaoLearn

24 avatars à générer. Chaque image est **un personnage entier, de face**, sur fond uni.
Même chaîne de travail que pour les cartes — et mêmes règles anti-dérive
(voir la section 6 de `KIT_CARTES_PROMPTS.md`, elles s'appliquent à l'identique).

## 1. Mode d'emploi

### Phase A — fixer les images d'ancrage (une seule fois)

1. Ouvre Google AI Studio (pas de filigrane visible) ou Gemini.
2. Colle **le prompt de style** ci-dessous + le prompt de l'avatar 1, et génère.
3. Relance dans des **conversations neuves** jusqu'à obtenir 2 images irréprochables :
   proportions identiques, contour net, fond vraiment uni, personnage centré.
4. Ces 2 images sont tes **ancres**. Elles ne changeront plus jamais.

### Phase B — les 23 autres (une conversation neuve par avatar)

Pour **chaque** avatar, dans une **conversation vierge** :

1. Téléverse les **2 mêmes ancres** (jamais l'avatar généré juste avant).
2. Colle le **prompt de style complet**, mot pour mot.
3. Colle le prompt de l'avatar voulu.
4. Ajoute : *« Match the proportions, outline, background and rendering of the two reference images exactly. Only the character changes. »*
5. Génère 2-3 variantes, garde la meilleure, **ferme la conversation**.

> **Un avatar = une conversation. Jamais de chaînage.**

### Export

PNG **carré** (1024×1024), nommé `avatar_01.png` … `avatar_24.png`,
déposé dans `avatar_sources/` à la racine du dépôt (à côté de `card_sources/`).
Je m'occupe de l'optimisation et du branchement — dis-moi quand ils y sont.

## 2. Prompt de style (à coller intégralement dans CHAQUE conversation)

```
A cute chibi character avatar for a mobile app, in crisp pixel-art style.

FORMAT (identical for every avatar in the set):
- Square canvas. The character is centred, full body, facing the viewer.
- Big head (about 45% of total height), small body, standing straight,
  arms relaxed at the sides.
- The character fills about 80% of the canvas height, feet near the bottom.
- Background: one single flat colour, a soft warm cream (#F5F1E8). No gradient,
  no shadow on the ground, no decoration, nothing else.

ART STYLE: clean pixel art with a visible pixel grid, thick very dark outline
around the whole character, flat colours with at most one shade tone per
surface. Friendly, modern, slightly rounded silhouettes. The face is simple:
two dark eyes, tiny mouth, optional blush. NOT smooth vector art, NOT
anti-aliased, NOT photorealistic.

MOOD: warm and welcoming — this is the player's avatar in a language-learning app.

No text anywhere in the image.
```

## 3. Les 24 prompts

Un par conversation, après le prompt de style.

### `avatar_01.png` — Veste noire et jean
```
CHARACTER: a young person with short tousled black hair, wearing an open black
jacket over a plain white t-shirt, blue jeans, and white sneakers.
```

### `avatar_02.png` — Mèche et t-shirt rouge
```
CHARACTER: a young person with dark side-swept hair, wearing a plain red
t-shirt, charcoal trousers, and black sneakers.
```

### `avatar_03.png` — Carré noir et pull vert
```
CHARACTER: a young woman with a sleek black bob haircut, wearing a teal-green
jumper, a dark skirt, and black ankle boots. Fair skin.
```

### `avatar_04.png` — Chignon et sweat jaune
```
CHARACTER: a young woman with dark brown hair in a high bun, wearing a mustard
yellow hoodie, dark shorts, and white sneakers. Tan skin.
```

### `avatar_05.png` — Boucles et débardeur blanc
```
CHARACTER: a young man with short tight black curls, deep brown skin, wearing
a white tank top, grey trousers, and red sneakers.
```

### `avatar_06.png` — Cheveux longs châtains
```
CHARACTER: a young woman with long straight chestnut hair, fair skin, wearing
a lavender long-sleeve top, dark trousers, and black shoes.
```

### `avatar_07.png` — Rasé et t-shirt bleu
```
CHARACTER: a young man with a buzzcut, warm brown skin, wearing a bright blue
t-shirt, black trousers, and white sneakers.
```

### `avatar_08.png` — Queue de cheval haute
```
CHARACTER: a young woman with a long high ponytail, black hair, wearing a
sporty coral t-shirt, navy leggings, and white trainers.
```

### `avatar_09.png` — Lunettes rondes
```
CHARACTER: a studious young person with short brown hair and round glasses,
wearing a beige cardigan over a white shirt, dark green trousers, brown shoes.
```

### `avatar_10.png` — Casquette à l'envers
```
CHARACTER: a playful young person wearing a backwards red cap over dark hair,
an oversized grey t-shirt, black jogger trousers, and chunky sneakers.
```

### `avatar_11.png` — Tresses et robe corail
```
CHARACTER: a young woman with long dark braids, deep brown skin, wearing a
coral summer dress and white sandals.
```

### `avatar_12.png` — Afro et chemise
```
CHARACTER: a young man with a neat rounded afro, dark brown skin, wearing a
light blue button-up shirt, beige chino trousers, and brown loafers.
```

### `avatar_13.png` — Frange droite et salopette
```
CHARACTER: a young woman with a straight black fringe and shoulder-length hair,
wearing blue denim overalls over a striped long-sleeve shirt, yellow boots.
```

### `avatar_14.png` — Bonnet et écharpe (fille)
```
CHARACTER: a cosy young woman with long light brown hair under a burgundy
beanie, a chunky cream scarf, a navy coat, dark trousers, and winter boots.
```
> ⚠ Historique : le prompt d'origine disait « young person » et Gemini l'a
> rendu au féminin, doublonnant avec avatar_38. Résolu en régénérant le 38 en
> garçon — la paire est donc inversée par rapport aux autres (14 fille, 38
> garçon).

### `avatar_15.png` — Cheveux roses
```
CHARACTER: a young woman with shoulder-length pastel pink hair, fair skin,
wearing an oversized black t-shirt, a plaid skirt, and platform boots.
```

### `avatar_16.png` — Veste de sport
```
CHARACTER: a sporty young man with short dark hair, wearing a red-and-white
track jacket, black shorts, and running shoes. Athletic look.
```

### `avatar_17.png` — Nattes et gilet
```
CHARACTER: a young woman with two low pigtails, auburn hair and freckles,
wearing a forest-green cardigan over a white blouse, a long beige skirt.
```

### `avatar_18.png` — Cheveux gris et polo
```
CHARACTER: a distinguished older man with neat grey hair, wearing a navy polo
shirt, light grey trousers, and classic shoes. Warm smile.
```

### `avatar_19.png` — Hijab et tunique
```
CHARACTER: a young woman wearing an emerald-green hijab and a long cream
tunic over dark trousers, with simple flat shoes. Serene expression.
```

### `avatar_20.png` — Barbe courte
```
CHARACTER: a young man with short dark hair and a trimmed short beard, wearing
a rust-orange flannel shirt, dark jeans, and work boots.
```

### `avatar_21.png` — Écouteurs autour du cou
```
CHARACTER: a young person with messy dark hair and big yellow headphones
around the neck, wearing a purple oversized hoodie, black trousers, sneakers.
```

### `avatar_22.png` — Robe qipao moderne
```
CHARACTER: a young woman with black hair in a low bun with a hairpin, wearing
a modernised red qipao dress with subtle patterns, and flat black shoes.
```

### `avatar_23.png` — Veste hanfu décontractée
```
CHARACTER: a young man with tied-back dark hair, wearing a casual modern
hanfu-inspired jacket in slate blue over a white top, dark trousers,
cloth shoes.
```

### `avatar_24.png` — Panda à capuche
```
CHARACTER: a young person wearing a panda onesie hoodie with little ears,
the hood up over dark hair, white-and-black colours, cosy and fun.
```

## 3 bis. Les 24 contreparties (fille ↔ garçon)

Même personnage, même tenue, genre inversé. Numérotation : **contrepartie = original + 24**
(`avatar_25` ↔ `avatar_01`, `avatar_26` ↔ `avatar_02`, …). Mêmes règles : une
conversation par avatar, les 2 mêmes ancres, le prompt de style complet.

Astuce : tu peux aussi téléverser l'original en 3e image et ajouter
*« Same outfit and colours as the third image, but the character is a girl/boy. »*
— ça aide à garder la tenue identique.

### `avatar_25.png` — Veste noire et jean (fille)
```
CHARACTER: a young woman with a short black wavy bob, wearing an open black
jacket over a plain white t-shirt, blue jeans, and white sneakers.
```

### `avatar_26.png` — Mèche et t-shirt rouge (fille)
```
CHARACTER: a young woman with dark side-swept shoulder-length hair, wearing a
plain red t-shirt, charcoal trousers, and black sneakers.
```

### `avatar_27.png` — Pull vert (garçon)
```
CHARACTER: a young man with neat short black hair, fair skin, wearing a
teal-green jumper, dark trousers, and black ankle boots.
```

### `avatar_28.png` — Sweat jaune (garçon)
```
CHARACTER: a young man with short dark brown hair, tan skin, wearing a mustard
yellow hoodie, dark shorts, and white sneakers.
```

### `avatar_29.png` — Débardeur blanc (fille)
```
CHARACTER: a young woman with short tight black curls, deep brown skin,
wearing a white tank top, grey trousers, and red sneakers.
```

### `avatar_30.png` — Haut lavande (garçon)
```
CHARACTER: a young man with medium-length chestnut hair, fair skin, wearing a
lavender long-sleeve top, dark trousers, and black shoes.
```

### `avatar_31.png` — Cheveux courts et t-shirt bleu (fille)
```
CHARACTER: a young woman with a very short pixie cut, warm brown skin, wearing
a bright blue t-shirt, black trousers, and white sneakers.
```

### `avatar_32.png` — Sportif (garçon)
```
CHARACTER: a young man with short black hair, wearing a sporty coral t-shirt,
navy jogging trousers, and white trainers.
```

### `avatar_33.png` — Lunettes rondes (fille)
```
CHARACTER: a studious young woman with a brown chignon and round glasses,
wearing a beige cardigan over a white blouse, dark green skirt, brown shoes.
```

### `avatar_34.png` — Casquette à l'envers (fille)
```
CHARACTER: a playful young woman with a backwards red cap over a dark
ponytail, an oversized grey t-shirt, black jogger trousers, chunky sneakers.
```

### `avatar_35.png` — Chemise corail (garçon)
```
CHARACTER: a young man with short dark locs, deep brown skin, wearing a coral
short-sleeve shirt, white trousers, and white sandals.
```

### `avatar_36.png` — Afro et chemise (fille)
```
CHARACTER: a young woman with a rounded afro, dark brown skin, wearing a light
blue button-up shirt, a beige skirt, and brown loafers.
```

### `avatar_37.png` — Salopette (garçon)
```
CHARACTER: a young man with short black hair, wearing blue denim overalls over
a striped long-sleeve shirt, and yellow boots.
```

### `avatar_38.png` — Bonnet et écharpe (garçon)
```
CHARACTER: a cosy young man with short dark hair under a burgundy beanie,
a chunky cream scarf, a navy coat, dark trousers, and winter boots.
```

### `avatar_39.png` — Cheveux roses (garçon)
```
CHARACTER: a young man with short pastel pink hair, fair skin, wearing an
oversized black t-shirt, dark cargo trousers, and platform boots.
```

### `avatar_40.png` — Veste de sport (fille)
```
CHARACTER: a sporty young woman with a dark braid, wearing a red-and-white
track jacket, black shorts, and running shoes. Athletic look.
```

### `avatar_41.png` — Taches de rousseur et gilet (garçon)
```
CHARACTER: a young man with auburn hair and freckles, wearing a forest-green
cardigan over a white shirt, and beige trousers.
```

### `avatar_42.png` — Cheveux gris (dame)
```
CHARACTER: a distinguished older woman with a neat grey bob, wearing a navy
blouse, light grey trousers, and classic shoes. Warm smile.
```

### `avatar_43.png` — Tunique et calotte (garçon)
```
CHARACTER: a young man with a short dark beard and a small knitted prayer cap,
wearing a long cream tunic over dark trousers, with simple flat shoes.
Serene expression.
```

### `avatar_44.png` — Chemise à carreaux (fille)
```
CHARACTER: a young woman with dark hair in a loose braid, wearing a
rust-orange flannel shirt, dark jeans, and work boots.
```

### `avatar_45.png` — Écouteurs autour du cou (fille)
```
CHARACTER: a young woman with a messy dark bun and big yellow headphones
around the neck, wearing a purple oversized hoodie, black trousers, sneakers.
```

### `avatar_46.png` — Changshan moderne (garçon)
```
CHARACTER: a young man with neat black hair, wearing a modernised dark red
changshan (traditional Chinese men's tunic) with subtle patterns, and flat
black shoes.
```

### `avatar_47.png` — Veste hanfu décontractée (fille)
```
CHARACTER: a young woman with a long dark ponytail and a hairpin, wearing a
casual modern hanfu-inspired jacket in slate blue over a white top, a long
skirt, and cloth shoes.
```

### `avatar_48.png` — Panda à capuche (fille)
```
CHARACTER: a young woman wearing a panda onesie hoodie with little ears, the
hood up over two dark braids, white-and-black colours, cosy and fun.
```

## 4. Brancher les images dans l'app

Dépose les PNG dans `avatar_sources/` et préviens-moi : je les optimise
(512×512 suffit largement) et je remplis `AVATAR_IMAGES` dans
`data/avatarParts.ts` :

```ts
export const AVATAR_IMAGES: Record<string, ImageSourcePropType> = {
  avatar_01: require('@/assets/avatars/avatar_01.png'),
  avatar_02: require('@/assets/avatars/avatar_02.png'),
  // … jusqu'à avatar_24
};
```

Tant qu'une image manque, sa case s'affiche en attente dans la galerie —
tu peux donc générer en plusieurs fois.

## 5. Droits

Génère des personnages **originaux**. Les avatars 22-23 s'inspirent de
vêtements traditionnels chinois — reste sur des interprétations modernes et
respectueuses, sans reproduire de personnage existant.
