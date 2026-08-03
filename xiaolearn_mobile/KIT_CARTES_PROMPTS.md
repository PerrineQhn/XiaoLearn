# Kit de prompts — Cartes mythologiques XiaoLearn

24 illustrations à générer. Chaque image est **une carte complète** (créature + cadre + bandeau du nom + cartouche du logo), comme dans les cartes de référence.

## 1. Mode d'emploi

### Phase A — fixer les images de référence (une seule fois)

1. Ouvre Gemini (ou ChatGPT / Ideogram — tout modèle avec un bon rendu de texte).
2. Colle **le prompt de style** ci-dessous + le prompt de la carte 1, et génère.
3. Relance **plusieurs fois dans des conversations neuves** jusqu'à obtenir 2 images vraiment
   irréprochables (cadre net, symétrique, caractères chinois corrects, logo lisible).
4. Ces 2 images deviennent tes **ancres**. Enregistre-les à part. Elles ne changeront plus
   jamais, quoi qu'il arrive. Tout le reste de la collection sera jugé par rapport à elles.

### Phase B — les 22 autres cartes (une conversation neuve par carte)

Pour **chaque** carte, dans une **conversation vierge** :

1. Téléverse les **2 mêmes images d'ancrage** (jamais la carte générée juste avant).
2. Colle le **prompt de style complet** (section 2), en entier, mot pour mot.
3. Colle le prompt de la carte voulue (section 3).
4. Ajoute : *« Match the frame, layout, palette and rendering of the two reference images exactly. »*
5. Génère 2 ou 3 variantes, garde la meilleure, **ferme la conversation**.

### La règle qui compte

> **Une carte = une conversation. Jamais de chaînage.**

C'est le point critique, et c'est ce qui explique la dégradation. Voir la section 6.

### Export

PNG 2:3 (par ex. 1024×1536), nommé avec l'`id` indiqué, déposé dans `assets/cards/`.

## 2. Prompt de style (à coller intégralement dans CHAQUE conversation)

```
Design a collectible trading card in a vertical 2:3 format, in the style of an ornate Art Nouveau tarot card.

LAYOUT (identical on every card of the series):
- An ornate golden filigree frame with symmetrical scrollwork, occupying the full border.
- A decorative sun or cloud motif centred at the top of the frame.
- Small golden star ornaments on the left and right mid-edges.
- Inside the frame: the creature, full-body, centred, floating against a soft painted sky
  with pale clouds and delicate sparkles.
- At the bottom inside the frame: a golden ribbon banner containing the Chinese name
  in large clear characters.
- Below the banner: a small golden cartouche containing the word "XiaoLearn",
  with "Xiao" in dark ink and "Learn" in a deep red, in a clean rounded sans-serif.
- Outer background: a soft cream parchment tone.

ART STYLE: painterly semi-realistic anime illustration, warm and luminous, fine linework,
soft cel shading, delicate gold leaf detailing, storybook quality. Chinese folklore aesthetic
(Tang and Song dynasty influences). NOT photorealistic, NOT flat vector.

TEXT: render the Chinese characters and the logo text accurately and legibly. No other text.
```

## 3. Les 24 prompts

Pour chaque carte : nom du fichier, puis le prompt à coller.

Les cartes 23 et 24 sont les deux jalons du parcours d'avatar : elles n'ont pas de créature
mais une scène, et le prompt le dit explicitement (« Change only the subject »).

### 1. `review_first_session.png` — Le Renard · 狐狸 (húli)
*Révisions · common · +15 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: a clever red fox spirit with amber eyes, sitting upright, tail curled, wearing a small Tang-dynasty scholar's collar.
BANNER TEXT: 狐狸
RARITY TREATMENT: modest ornamentation, muted warm palette.
```

### 2. `review_ten_sessions.png` — La Carpe Koï · 锦鲤 (jǐnlǐ)
*Révisions · rare · +40 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: a great golden koi carp leaping upward through churning river water, scales catching the light, mid-transformation.
BANNER TEXT: 锦鲤
RARITY TREATMENT: richer ornamentation, teal-and-gold accents, gentle glow.
```

### 3. `review_hundred_cards.png` — Le Baize · 白泽 (báizé)
*Révisions · epic · +60 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: the Baize, a wise white lion-like beast with a single horn, several calm eyes along its flank, seated beside an open bamboo scroll.
BANNER TEXT: 白泽
RARITY TREATMENT: elaborate ornamentation, violet-and-gold accents, radiant aura.
```

### 4. `review_fifty_mastered.png` — Le Lièvre de Jade · 玉兔 (yùtù)
*Révisions · rare · +50 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: the Jade Rabbit, a luminous white rabbit pounding elixir in a stone mortar, seated on the moon among cassia branches.
BANNER TEXT: 玉兔
RARITY TREATMENT: richer ornamentation, teal-and-gold accents, gentle glow.
```

### 5. `review_three_hundred_mastered.png` — Le Qilin · 麒麟 (qílín)
*Révisions · legendary · +150 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: the Qilin, a majestic chimerical beast with deer body, dragon head, golden scales and flowing mane, hooves wreathed in soft flame, standing without bending the grass.
BANNER TEXT: 麒麟
RARITY TREATMENT: opulent ornamentation, brilliant gold and amber accents, dramatic celestial glow, rays of light.
```

### 6. `level_first_bilan.png` — Le Dragon d'Azur · 青龙 (qīnglóng)
*Niveaux · rare · +50 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: the Azure Dragon of the East, a long serpentine Chinese dragon with turquoise scales coiling among spring clouds and budding branches.
BANNER TEXT: 青龙
RARITY TREATMENT: richer ornamentation, teal-and-gold accents, gentle glow.
```

### 7. `level_three_bilans.png` — L'Oiseau Vermillon · 朱雀 (zhūquè)
*Niveaux · epic · +80 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: the Vermilion Bird of the South, a magnificent crimson phoenix-like bird with outstretched wings trailing summer fire.
BANNER TEXT: 朱雀
RARITY TREATMENT: elaborate ornamentation, violet-and-gold accents, radiant aura.
```

### 8. `level_perfect_bilan.png` — Le Tigre Blanc · 白虎 (báihǔ)
*Niveaux · legendary · +120 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: the White Tiger of the West, a powerful white tiger with black stripes, prowling through autumn mist, eyes fierce and golden.
BANNER TEXT: 白虎
RARITY TREATMENT: opulent ornamentation, brilliant gold and amber accents, dramatic celestial glow, rays of light.
```

### 9. `level_six_bilans.png` — La Tortue Noire · 玄武 (xuánwǔ)
*Niveaux · legendary · +160 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: the Black Tortoise of the North, an ancient dark tortoise entwined by a serpent, shell patterned with constellations, amid winter waters.
BANNER TEXT: 玄武
RARITY TREATMENT: opulent ornamentation, brilliant gold and amber accents, dramatic celestial glow, rays of light.
```

### 10. `lesson_first.png` — Le Jeune Lettré · 书童 (shūtóng)
*Leçons · common · +15 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: a young scholar boy in Ming-dynasty robes, grinding ink on an inkstone at a low desk, calm and focused.
BANNER TEXT: 书童
RARITY TREATMENT: modest ornamentation, muted warm palette.
```

### 11. `lesson_ten.png` — L'Esprit du Pinceau · 毛笔 (máobǐ)
*Leçons · common · +35 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: a spirit of the calligraphy brush: an animated writing brush with flowing ink ribbons forming a small graceful figure.
BANNER TEXT: 毛笔
RARITY TREATMENT: modest ornamentation, muted warm palette.
```

### 12. `lesson_fifty.png` — Cangjie · 仓颉 (cāngjié)
*Leçons · epic · +100 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: Cangjie, the legendary four-eyed sage who invented Chinese writing, bearded, contemplating bird tracks in the earth as characters float around him.
BANNER TEXT: 仓颉
RARITY TREATMENT: elaborate ornamentation, violet-and-gold accents, radiant aura.
```

### 13. `lesson_a1_complete.png` — Le Roi des Singes · 孙悟空 (sūn wùkōng)
*Leçons · legendary · +200 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: Sun Wukong the Monkey King, in golden armor with phoenix-feather cap, holding his ruyi jingu bang staff, leaping on a somersault cloud.
BANNER TEXT: 孙悟空
RARITY TREATMENT: opulent ornamentation, brilliant gold and amber accents, dramatic celestial glow, rays of light.
```

### 14. `streak_three.png` — La Lanterne · 灯笼 (dēnglóng)
*Série · common · +20 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: a glowing red paper lantern spirit floating in evening air, warm light spilling from within, small tassel swaying.
BANNER TEXT: 灯笼
RARITY TREATMENT: modest ornamentation, muted warm palette.
```

### 15. `streak_seven.png` — La Bête Nian · 年兽 (niánshòu)
*Série · rare · +45 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: the Nian beast, a lion-like New Year creature with curled mane and blunt horns, surrounded by red banners and firecracker sparks.
BANNER TEXT: 年兽
RARITY TREATMENT: richer ornamentation, teal-and-gold accents, gentle glow.
```

### 16. `streak_thirty.png` — Le Phénix · 凤凰 (fènghuáng)
*Série · epic · +120 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: the Fenghuang phoenix, a resplendent bird with peacock-like tail feathers in red gold and cyan, perched on a paulownia branch.
BANNER TEXT: 凤凰
RARITY TREATMENT: elaborate ornamentation, violet-and-gold accents, radiant aura.
```

### 17. `streak_hundred.png` — Le Renard à Neuf Queues · 九尾狐 (jiǔwěihú)
*Série · legendary · +300 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: the nine-tailed fox, an elegant silver-white fox with nine flowing luminous tails, poised and ancient, wisps of blue foxfire.
BANNER TEXT: 九尾狐
RARITY TREATMENT: opulent ornamentation, brilliant gold and amber accents, dramatic celestial glow, rays of light.
```

### 18. `special_xp_1000.png` — Le Pixiu · 貔貅 (píxiū)
*Spéciales · rare · +50 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: the Pixiu, a winged lion-dragon guardian beast with a single horn, sitting proudly atop a heap of gold coins and jade.
BANNER TEXT: 貔貅
RARITY TREATMENT: richer ornamentation, teal-and-gold accents, gentle glow.
```

### 19. `special_xp_10000.png` — Le Dragon · 龙 (lóng)
*Spéciales · legendary · +250 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: a full imperial Chinese dragon coiling through storm clouds, five-clawed, clutching a luminous flaming pearl, rain and lightning around it.
BANNER TEXT: 龙
RARITY TREATMENT: opulent ornamentation, brilliant gold and amber accents, dramatic celestial glow, rays of light.
```

### 20. `special_games.png` — Nezha · 哪吒 (nézhā)
*Spéciales · rare · +45 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: Nezha, a spirited boy deity riding his Wind-Fire Wheels, red silk sash streaming, holding the Cosmic Ring.
BANNER TEXT: 哪吒
RARITY TREATMENT: richer ornamentation, teal-and-gold accents, gentle glow.
```

### 21. `special_readings.png` — Chang'e · 嫦娥 (cháng'é)
*Spéciales · epic · +70 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: Chang'e the moon goddess, drifting upward in flowing silk robes toward a great full moon, a white rabbit at her side.
BANNER TEXT: 嫦娥
RARITY TREATMENT: elaborate ornamentation, violet-and-gold accents, radiant aura.
```

### 22. `special_pronunciation.png` — Le Duc du Tonnerre · 雷公 (léigōng)
*Spéciales · epic · +80 XP*

```
Same card style, frame and layout as the reference image. Change only the creature and the banner text.
CREATURE: Leigong the Duke of Thunder, a winged blue-skinned deity with a beaked face, striking a ring of thunder drums, lightning arcing.
BANNER TEXT: 雷公
RARITY TREATMENT: elaborate ornamentation, violet-and-gold accents, radiant aura.
```

### 23. `avatar_halfway.png` — La Porte du Dragon · 龙门 (lóngmén)
*Leçons · epic · +120 XP — palier 6 de l'avatar*

> Attention au doublon : la carte 2 (锦鲤) montre déjà une carpe qui bondit. Ici le sujet est
> **la porte**, monumentale ; la carpe n'est qu'une silhouette minuscule qui donne l'échelle.

```
Same card style, frame and layout as the reference image. Change only the subject and the banner text.
SUBJECT (a place, not a creature): a colossal ancient stone gate rising out of the roaring rapids of the Yellow River, its pillars carved with coiling dragons worn smooth by the water, mist and spray boiling around its base, storm light breaking through above. Far below at the foot of the gate, one tiny carp is caught mid-leap — small in the frame, dwarfed by the gate. Low viewpoint, looking up.
BANNER TEXT: 龙门
RARITY TREATMENT: elaborate ornamentation, violet-and-gold accents, radiant aura.
```

### 24. `avatar_shifu.png` — Wenchang, dieu des Lettres · 文昌帝君 (wénchāng dìjūn)
*Leçons · legendary · +500 XP — palier 10, rang Shīfu*

> C'est la carte terminale de la collection : personne ne l'obtiendra avant 355 leçons.
> Elle doit être la plus somptueuse des 24 — n'hésite pas à relancer plus longtemps que
> pour les autres.

```
Same card style, frame and layout as the reference image. Change only the subject and the banner text.
SUBJECT: Wenchang, the Chinese god of literature and of the imperial examinations — a serene bearded scholar-deity seated on a cloud, in flowing Song-dynasty court robes of deep blue and gold, wearing a black scholar's cap. He holds an upright writing brush in his right hand and an open scroll in his left. An inkstone and a stack of bound books float beside him. Behind his head, a constellation of six bright stars. Calm, benevolent, authoritative.
BANNER TEXT: 文昌帝君
RARITY TREATMENT: opulent ornamentation, brilliant gold and amber accents, dramatic celestial glow, rays of light.
```

## 4. Brancher les images dans l'app

Dépose les images dans `assets/cards/` (le code attend l'extension **`.jpg`**), puis ajoute les
deux lignes suivantes à `CARD_IMAGES` dans `components/CardArt.tsx` :

```ts
  'avatar_halfway': require('@/assets/cards/avatar_halfway.jpg'),
  'avatar_shifu': require('@/assets/cards/avatar_shifu.jpg'),
```

…et leurs jumelles floutées à `CARD_IMAGES_LOCKED` (mêmes noms, dans `assets/cards/locked/`) :

```ts
  avatar_halfway: require('@/assets/cards/locked/avatar_halfway.jpg'),
  avatar_shifu: require('@/assets/cards/locked/avatar_shifu.jpg'),
```

La table complète, pour référence :

```ts
export const CARD_IMAGES: Record<string, ImageSourcePropType> = {
  'review_first_session': require('@/assets/cards/review_first_session.jpg'),
  'review_ten_sessions': require('@/assets/cards/review_ten_sessions.jpg'),
  'review_hundred_cards': require('@/assets/cards/review_hundred_cards.jpg'),
  'review_fifty_mastered': require('@/assets/cards/review_fifty_mastered.jpg'),
  'review_three_hundred_mastered': require('@/assets/cards/review_three_hundred_mastered.jpg'),
  'level_first_bilan': require('@/assets/cards/level_first_bilan.jpg'),
  'level_three_bilans': require('@/assets/cards/level_three_bilans.jpg'),
  'level_perfect_bilan': require('@/assets/cards/level_perfect_bilan.jpg'),
  'level_six_bilans': require('@/assets/cards/level_six_bilans.jpg'),
  'lesson_first': require('@/assets/cards/lesson_first.jpg'),
  'lesson_ten': require('@/assets/cards/lesson_ten.jpg'),
  'lesson_fifty': require('@/assets/cards/lesson_fifty.jpg'),
  'lesson_a1_complete': require('@/assets/cards/lesson_a1_complete.jpg'),
  'streak_three': require('@/assets/cards/streak_three.jpg'),
  'streak_seven': require('@/assets/cards/streak_seven.jpg'),
  'streak_thirty': require('@/assets/cards/streak_thirty.jpg'),
  'streak_hundred': require('@/assets/cards/streak_hundred.jpg'),
  'special_xp_1000': require('@/assets/cards/special_xp_1000.jpg'),
  'special_xp_10000': require('@/assets/cards/special_xp_10000.jpg'),
  'special_games': require('@/assets/cards/special_games.jpg'),
  'special_readings': require('@/assets/cards/special_readings.jpg'),
  'special_pronunciation': require('@/assets/cards/special_pronunciation.jpg'),
  'avatar_halfway': require('@/assets/cards/avatar_halfway.jpg'),
  'avatar_shifu': require('@/assets/cards/avatar_shifu.jpg'),
};
```

Tant qu'une image manque, la carte s'affiche avec son rendu de repli (emblème + dégradé de rareté) — tu peux donc en ajouter au fur et à mesure.

## 5. Droits

Génère des illustrations **originales**. Ne reproduis pas les cartes de Seonsaengnim : leur direction artistique leur appartient. Le bestiaire chinois retenu ici (龙, 麒麟, 凤凰, 白泽, 九尾狐, 文昌帝君…) est du domaine public, mais les images que tu produis doivent être les tiennes.

## 6. Éviter la dégradation de qualité

### Pourquoi ça se dégrade

Quand on enchaîne les générations dans **une seule conversation** en disant « même style que
l'image précédente », le modèle se conditionne sur **sa propre sortie**. Or chaque sortie contient
déjà de petites approximations. À la génération suivante, ces approximations deviennent la
consigne, et de nouvelles s'ajoutent. C'est l'effet photocopie-de-photocopie : imperceptible d'une
image à l'autre, flagrant entre la carte 1 et la carte 12.

La dérive touche toujours les mêmes éléments, dans cet ordre :

1. **Le texte** part en premier — caractères chinois déformés, « XiaoLearn » qui devient
   « XiaoLeam » ou « XioLearn ».
2. **Le cadre** perd sa symétrie, les volutes deviennent molles ou se remplissent.
3. **La palette** glisse — vers le jaune saturé, ou au contraire vers le délavé.
4. **Le cadrage** dérive : la créature grossit, le bandeau se décale ou disparaît.

Un long fil accumule aussi beaucoup de contexte, ce qui dilue le prompt de style d'origine : il
pèse de moins en moins lourd face à la masse des images déjà produites.

### Les six règles

1. **Une carte = une conversation neuve.** La règle la plus importante, et de loin.
2. **Des ancres figées.** Toujours les 2 mêmes images de référence, choisies une fois pour toutes.
   Jamais « la carte d'avant » — c'est précisément ce qui crée la chaîne.
3. **Prompt de style intégral à chaque fois.** Ne jamais compter sur « comme tout à l'heure ».
4. **Ne jamais retoucher, toujours régénérer.** « Rends le cadre plus doré » ré-encode l'image et
   dégrade tout le reste au passage. Modifie le prompt et repars de zéro.
5. **2–3 variantes, puis on ferme.** Au-delà de 3–4 allers-retours, le fil est cuit.
6. **Comparer aux ancres, pas à la précédente.** Ouvre l'ancre à côté. Si l'écart se voit, jette.

### Si c'est déjà parti en vrille

Ne tente pas de rattraper dans le fil en cours : les images dégradées y sont, et elles continueront
de tirer le résultat vers le bas. Reprends les ancres d'origine dans une conversation vierge et
régénère les cartes concernées.

Repère aussi le moment où la dérive a commencé : toutes les cartes générées après ce point sont
suspectes, même celles qui te semblaient correctes sur le moment.

### Assurance : le cadre en superposition

Si la constance du cadre reste un problème après ça, il existe une solution qui l'élimine
totalement : générer **une seule fois** un cadre vide en PNG transparent, et ne demander au modèle
que la créature sur fond de ciel. L'app superpose ensuite le cadre et écrit le nom en texte réel.

Le cadre devient alors rigoureusement identique sur les 22 cartes, et le texte est parfait puisqu'il
n'est plus généré. En contrepartie on perd les débordements — une queue de dragon qui passe
par-dessus le cadre, par exemple.

`CardArt.tsx` peut accueillir ce mode sans refonte : une `<Image>` de cadre en superposition
au-dessus de l'illustration, et le bandeau du nom rendu en `<Text>`. Dis-le-moi si tu veux
basculer là-dessus.
