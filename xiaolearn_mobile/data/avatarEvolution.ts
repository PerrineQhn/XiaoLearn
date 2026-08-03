/**
 * Avatars évolutifs — le personnage gagne un signe distinctif à chaque palier,
 * du t-shirt nu du Novice à la robe de maître du Shīfu.
 *
 * Un seul objet signature par palier, et il REMPLACE le précédent. Un premier
 * jet les faisait s'accumuler : au palier 9, six objets se disputaient une
 * vignette de 68 px et plus rien ne se lisait. La substitution donne à chaque
 * palier une identité — « la coiffe du lauréat » est un nom, « le nœud plus la
 * besace plus les lunettes » n'en est pas un — et fait davantage changer la
 * silhouette d'un palier à l'autre, ce dont l'écran d'évolution a besoin.
 *
 * Les emplacements montent le long du corps puis se libèrent : poignet,
 * poitrine, mains, puis trois coiffes de prestige croissant, et enfin tête nue
 * au palier 9. Le maître n'a plus besoin d'insigne.
 *
 * Remplace le catalogue de 48 illustrations figées : un avatar qui ne bouge
 * jamais ne raconte rien de la progression.
 */
import { type ImageSourcePropType } from 'react-native';
import { CECR_LEVELS } from './cecrLevelsMeta';
import { LESSON_DATA } from './cecrLessons';

export interface AvatarCharacter {
  id: string;
  nameFr: string;
  nameEn: string;
  /** Couleur signature, reprise sur les vêtements d'accent de chaque palier. */
  accent: string;
}

export const AVATAR_CHARACTERS: AvatarCharacter[] = [
  { id: 'f01', nameFr: 'Lin',     nameEn: 'Lin',     accent: '#2F9D8A' },
  { id: 'g01', nameFr: 'Hao',     nameEn: 'Hao',     accent: '#C1553B' },
  { id: 'f02', nameFr: 'Nour',    nameEn: 'Nour',    accent: '#8E5BC8' },
  { id: 'g02', nameFr: 'Émile',   nameEn: 'Emile',   accent: '#3B82C4' },
  { id: 'f03', nameFr: 'Yasmine', nameEn: 'Yasmine', accent: '#C2477F' },
  { id: 'g03', nameFr: 'Kenji',   nameEn: 'Kenji',   accent: '#7FA83C' },
  { id: 'f04', nameFr: 'Rosa',    nameEn: 'Rosa',    accent: '#D9A02B' },
  { id: 'g04', nameFr: 'Marco',   nameEn: 'Marco',   accent: '#2FA82F' },
  { id: 'f05', nameFr: 'Clara',   nameEn: 'Clara',   accent: '#C75FC7' },
  { id: 'g05', nameFr: 'Malik',   nameEn: 'Malik',   accent: '#4245AD' },
];

/**
 * Les dix paliers.
 *
 * Deux noms par palier, et c'est délibéré : le **rang** dit ce que l'apprenant
 * sait faire, la **tenue** ce qu'il porte pour le prouver. Les confondre — mon
 * premier jet nommait les paliers « Le carnet », « L'écolier », « L'assidu » —
 * revenait à récompenser l'assiduité plutôt que la compétence. « Tu es
 * Interprète » vaut mieux que « Tu es l'élève avancé ».
 *
 * Le rang suit un arc : comprendre → lire → parler → écrire → raconter →
 * traduire → maîtriser → transmettre. Le dernier, 师父 (shīfu), est celui qui
 * enseigne à son tour.
 */
export interface AvatarStage {
  rankFr: string; rankEn: string;
  outfitFr: string; outfitEn: string;
  /** Le signe distinctif ajouté à ce palier — les précédents restent. */
  signFr: string; signEn: string;
}

export const STAGES: AvatarStage[] = [
  { rankFr: 'Novice',      rankEn: 'Novice',       outfitFr: 'Le premier jour', outfitEn: 'The first day',   signFr: 'rien du tout',                 signEn: 'nothing at all' },
  { rankFr: 'Apprenti',    rankEn: 'Apprentice',   outfitFr: 'Le nœud rouge',   outfitEn: 'The red knot',    signFr: '中国结 au poignet',             signEn: '中国结 knot on the wrist' },
  { rankFr: 'Curieux',     rankEn: 'Curious',      outfitFr: 'La besace',       outfitEn: 'The satchel',     signFr: '布包 en bandoulière',           signEn: '布包 bag across the chest' },
  { rankFr: 'Lecteur',     rankEn: 'Reader',       outfitFr: 'Le livre cousu',  outfitEn: 'The sewn book',   signFr: 'lunettes rondes + 线装书',      signEn: 'round glasses + 线装书' },
  { rankFr: 'Bavard',      rankEn: 'Talker',       outfitFr: "L'éventail",      outfitEn: 'The fan',         signFr: '折扇 ouvert à la main',         signEn: 'open 折扇 in hand' },
  { rankFr: 'Calligraphe', rankEn: 'Calligrapher', outfitFr: 'Le bonnet carré', outfitEn: 'The square cap',  signFr: '方巾 du lettré + 毛笔',         signEn: "scholar's 方巾 + 毛笔" },
  { rankFr: 'Conteur',     rankEn: 'Storyteller',  outfitFr: 'La coiffe ailée', outfitEn: 'The winged cap',  signFr: '幞头 à ailerons + 醒木',        signEn: 'winged 幞头 + 醒木' },
  { rankFr: 'Interprète',  rankEn: 'Interpreter',  outfitFr: 'La coiffe du lauréat', outfitEn: "The laureate's cap", signFr: '状元帽 + 印章 à la ceinture', signEn: '状元帽 + 印章 at the belt' },
  { rankFr: 'Érudit',      rankEn: 'Scholar',      outfitFr: 'Le changshan',    outfitEn: 'The changshan',   signFr: 'tête nue, 长衫 indigo + 玉佩',  signEn: 'bare head, indigo 长衫 + 玉佩' },
  { rankFr: 'Shīfu',       rankEn: 'Shīfu',        outfitFr: 'La robe de maître', outfitEn: "The master's robe", signFr: '长袍 de cérémonie + rouleau', signEn: 'ceremonial 长袍 + scroll' },
];

/**
 * Écarts entre paliers, en « parts » de leçons.
 *
 * Répartir les dix paliers uniformément (~40 leçons chacun) faisait attendre
 * quarante leçons avant la première récompense. Les écarts croissent donc
 * doucement : la première tenue tombe vite, les dernières se méritent.
 */
const STAGE_GAPS = [3, 4, 5, 5, 6, 7, 8, 9, 10];

// `require` n'accepte pas de chemin construit : la table doit être écrite.
const IMAGES: Record<string, ImageSourcePropType[]> = {
  f01: [
    require('@/assets/avatars/evolution/avatar_f01_01.webp'),
    require('@/assets/avatars/evolution/avatar_f01_02.webp'),
    require('@/assets/avatars/evolution/avatar_f01_03.webp'),
    require('@/assets/avatars/evolution/avatar_f01_04.webp'),
    require('@/assets/avatars/evolution/avatar_f01_05.webp'),
    require('@/assets/avatars/evolution/avatar_f01_06.webp'),
    require('@/assets/avatars/evolution/avatar_f01_07.webp'),
    require('@/assets/avatars/evolution/avatar_f01_08.webp'),
    require('@/assets/avatars/evolution/avatar_f01_09.webp'),
    require('@/assets/avatars/evolution/avatar_f01_10.webp'),
  ],
  g01: [
    require('@/assets/avatars/evolution/avatar_g01_01.webp'),
    require('@/assets/avatars/evolution/avatar_g01_02.webp'),
    require('@/assets/avatars/evolution/avatar_g01_03.webp'),
    require('@/assets/avatars/evolution/avatar_g01_04.webp'),
    require('@/assets/avatars/evolution/avatar_g01_05.webp'),
    require('@/assets/avatars/evolution/avatar_g01_06.webp'),
    require('@/assets/avatars/evolution/avatar_g01_07.webp'),
    require('@/assets/avatars/evolution/avatar_g01_08.webp'),
    require('@/assets/avatars/evolution/avatar_g01_09.webp'),
    require('@/assets/avatars/evolution/avatar_g01_10.webp'),
  ],
  f02: [
    require('@/assets/avatars/evolution/avatar_f02_01.webp'),
    require('@/assets/avatars/evolution/avatar_f02_02.webp'),
    require('@/assets/avatars/evolution/avatar_f02_03.webp'),
    require('@/assets/avatars/evolution/avatar_f02_04.webp'),
    require('@/assets/avatars/evolution/avatar_f02_05.webp'),
    require('@/assets/avatars/evolution/avatar_f02_06.webp'),
    require('@/assets/avatars/evolution/avatar_f02_07.webp'),
    require('@/assets/avatars/evolution/avatar_f02_08.webp'),
    require('@/assets/avatars/evolution/avatar_f02_09.webp'),
    require('@/assets/avatars/evolution/avatar_f02_10.webp'),
  ],
  g02: [
    require('@/assets/avatars/evolution/avatar_g02_01.webp'),
    require('@/assets/avatars/evolution/avatar_g02_02.webp'),
    require('@/assets/avatars/evolution/avatar_g02_03.webp'),
    require('@/assets/avatars/evolution/avatar_g02_04.webp'),
    require('@/assets/avatars/evolution/avatar_g02_05.webp'),
    require('@/assets/avatars/evolution/avatar_g02_06.webp'),
    require('@/assets/avatars/evolution/avatar_g02_07.webp'),
    require('@/assets/avatars/evolution/avatar_g02_08.webp'),
    require('@/assets/avatars/evolution/avatar_g02_09.webp'),
    require('@/assets/avatars/evolution/avatar_g02_10.webp'),
  ],
  f03: [
    require('@/assets/avatars/evolution/avatar_f03_01.webp'),
    require('@/assets/avatars/evolution/avatar_f03_02.webp'),
    require('@/assets/avatars/evolution/avatar_f03_03.webp'),
    require('@/assets/avatars/evolution/avatar_f03_04.webp'),
    require('@/assets/avatars/evolution/avatar_f03_05.webp'),
    require('@/assets/avatars/evolution/avatar_f03_06.webp'),
    require('@/assets/avatars/evolution/avatar_f03_07.webp'),
    require('@/assets/avatars/evolution/avatar_f03_08.webp'),
    require('@/assets/avatars/evolution/avatar_f03_09.webp'),
    require('@/assets/avatars/evolution/avatar_f03_10.webp'),
  ],
  g03: [
    require('@/assets/avatars/evolution/avatar_g03_01.webp'),
    require('@/assets/avatars/evolution/avatar_g03_02.webp'),
    require('@/assets/avatars/evolution/avatar_g03_03.webp'),
    require('@/assets/avatars/evolution/avatar_g03_04.webp'),
    require('@/assets/avatars/evolution/avatar_g03_05.webp'),
    require('@/assets/avatars/evolution/avatar_g03_06.webp'),
    require('@/assets/avatars/evolution/avatar_g03_07.webp'),
    require('@/assets/avatars/evolution/avatar_g03_08.webp'),
    require('@/assets/avatars/evolution/avatar_g03_09.webp'),
    require('@/assets/avatars/evolution/avatar_g03_10.webp'),
  ],
  f04: [
    require('@/assets/avatars/evolution/avatar_f04_01.webp'),
    require('@/assets/avatars/evolution/avatar_f04_02.webp'),
    require('@/assets/avatars/evolution/avatar_f04_03.webp'),
    require('@/assets/avatars/evolution/avatar_f04_04.webp'),
    require('@/assets/avatars/evolution/avatar_f04_05.webp'),
    require('@/assets/avatars/evolution/avatar_f04_06.webp'),
    require('@/assets/avatars/evolution/avatar_f04_07.webp'),
    require('@/assets/avatars/evolution/avatar_f04_08.webp'),
    require('@/assets/avatars/evolution/avatar_f04_09.webp'),
    require('@/assets/avatars/evolution/avatar_f04_10.webp'),
  ],
  g04: [
    require('@/assets/avatars/evolution/avatar_g04_01.webp'),
    require('@/assets/avatars/evolution/avatar_g04_02.webp'),
    require('@/assets/avatars/evolution/avatar_g04_03.webp'),
    require('@/assets/avatars/evolution/avatar_g04_04.webp'),
    require('@/assets/avatars/evolution/avatar_g04_05.webp'),
    require('@/assets/avatars/evolution/avatar_g04_06.webp'),
    require('@/assets/avatars/evolution/avatar_g04_07.webp'),
    require('@/assets/avatars/evolution/avatar_g04_08.webp'),
    require('@/assets/avatars/evolution/avatar_g04_09.webp'),
    require('@/assets/avatars/evolution/avatar_g04_10.webp'),
  ],
  f05: [
    require('@/assets/avatars/evolution/avatar_f05_01.webp'),
    require('@/assets/avatars/evolution/avatar_f05_02.webp'),
    require('@/assets/avatars/evolution/avatar_f05_03.webp'),
    require('@/assets/avatars/evolution/avatar_f05_04.webp'),
    require('@/assets/avatars/evolution/avatar_f05_05.webp'),
    require('@/assets/avatars/evolution/avatar_f05_06.webp'),
    require('@/assets/avatars/evolution/avatar_f05_07.webp'),
    require('@/assets/avatars/evolution/avatar_f05_08.webp'),
    require('@/assets/avatars/evolution/avatar_f05_09.webp'),
    require('@/assets/avatars/evolution/avatar_f05_10.webp'),
  ],
  g05: [
    require('@/assets/avatars/evolution/avatar_g05_01.webp'),
    require('@/assets/avatars/evolution/avatar_g05_02.webp'),
    require('@/assets/avatars/evolution/avatar_g05_03.webp'),
    require('@/assets/avatars/evolution/avatar_g05_04.webp'),
    require('@/assets/avatars/evolution/avatar_g05_05.webp'),
    require('@/assets/avatars/evolution/avatar_g05_06.webp'),
    require('@/assets/avatars/evolution/avatar_g05_07.webp'),
    require('@/assets/avatars/evolution/avatar_g05_08.webp'),
    require('@/assets/avatars/evolution/avatar_g05_09.webp'),
    require('@/assets/avatars/evolution/avatar_g05_10.webp'),
  ],
};


/**
 * Mêmes illustrations, passées au flou gaussien à la génération.
 *
 * Un flou calculé à l'affichage demanderait expo-blur, donc un module natif
 * et un nouveau build ; et le flou d'iOS s'applique au fond, pas à l'image.
 * Ces variantes 128 px pèsent 4 Ko pièce et masquent la tenue pour de bon :
 * le flou porte aussi sur l'alpha, si bien que même la silhouette se dissout.
 */
const BLURRED: Record<string, ImageSourcePropType[]> = {
  f01: [
    require('@/assets/avatars/evolution/blur/avatar_f01_01.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f01_02.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f01_03.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f01_04.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f01_05.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f01_06.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f01_07.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f01_08.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f01_09.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f01_10.webp'),
  ],
  g01: [
    require('@/assets/avatars/evolution/blur/avatar_g01_01.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g01_02.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g01_03.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g01_04.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g01_05.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g01_06.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g01_07.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g01_08.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g01_09.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g01_10.webp'),
  ],
  f02: [
    require('@/assets/avatars/evolution/blur/avatar_f02_01.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f02_02.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f02_03.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f02_04.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f02_05.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f02_06.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f02_07.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f02_08.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f02_09.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f02_10.webp'),
  ],
  g02: [
    require('@/assets/avatars/evolution/blur/avatar_g02_01.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g02_02.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g02_03.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g02_04.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g02_05.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g02_06.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g02_07.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g02_08.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g02_09.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g02_10.webp'),
  ],
  f03: [
    require('@/assets/avatars/evolution/blur/avatar_f03_01.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f03_02.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f03_03.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f03_04.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f03_05.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f03_06.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f03_07.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f03_08.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f03_09.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f03_10.webp'),
  ],
  g03: [
    require('@/assets/avatars/evolution/blur/avatar_g03_01.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g03_02.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g03_03.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g03_04.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g03_05.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g03_06.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g03_07.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g03_08.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g03_09.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g03_10.webp'),
  ],
  f04: [
    require('@/assets/avatars/evolution/blur/avatar_f04_01.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f04_02.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f04_03.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f04_04.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f04_05.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f04_06.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f04_07.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f04_08.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f04_09.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f04_10.webp'),
  ],
  g04: [
    require('@/assets/avatars/evolution/blur/avatar_g04_01.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g04_02.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g04_03.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g04_04.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g04_05.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g04_06.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g04_07.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g04_08.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g04_09.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g04_10.webp'),
  ],
  f05: [
    require('@/assets/avatars/evolution/blur/avatar_f05_01.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f05_02.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f05_03.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f05_04.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f05_05.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f05_06.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f05_07.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f05_08.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f05_09.webp'),
    require('@/assets/avatars/evolution/blur/avatar_f05_10.webp'),
  ],
  g05: [
    require('@/assets/avatars/evolution/blur/avatar_g05_01.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g05_02.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g05_03.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g05_04.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g05_05.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g05_06.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g05_07.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g05_08.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g05_09.webp'),
    require('@/assets/avatars/evolution/blur/avatar_g05_10.webp'),
  ],
};


export const STAGE_COUNT = STAGES.length;

export function isValidCharacter(id: string | null | undefined): id is string {
  return !!id && AVATAR_CHARACTERS.some(c => c.id === id);
}

/** Nombre de tenues déjà illustrées pour un personnage (1 → 10). */
export function stagesAvailable(characterId: string | null | undefined): number {
  return isValidCharacter(characterId) ? IMAGES[characterId].length : 0;
}

/**
 * Illustration d'un personnage à un palier donné (1 → 10).
 *
 * Tant que les dix tenues d'un personnage ne sont pas dessinées, on retombe
 * sur la dernière disponible plutôt que de renvoyer rien : mieux vaut un
 * avatar qui n'évolue pas encore qu'une case vide sur le tableau de bord.
 */
export function avatarStageSource(
  characterId: string | null | undefined,
  stage: number,
): ImageSourcePropType | undefined {
  if (!isValidCharacter(characterId)) return undefined;
  const set = IMAGES[characterId];
  const wanted = Math.min(STAGE_COUNT, Math.max(1, Math.round(stage)));
  return set[Math.min(wanted, set.length) - 1];
}

/**
 * Version floutée d'une tenue — pour les paliers pas encore décrochés.
 * Découvrir sa nouvelle tenue est la récompense ; la montrer d'avance dans le
 * sélecteur reviendrait à raconter la fin du film.
 */
export function avatarStageBlurred(
  characterId: string | null | undefined,
  stage: number,
): ImageSourcePropType | undefined {
  if (!isValidCharacter(characterId)) return undefined;
  const set = BLURRED[characterId];
  const wanted = Math.min(STAGE_COUNT, Math.max(1, Math.round(stage)));
  return set[Math.min(wanted, set.length) - 1];
}

// ─── Palier atteint ───────────────────────────────────────────────────────────

/** Toutes les leçons du parcours, niveau par niveau, dans l'ordre. */
const LESSONS_BY_LEVEL: string[][] = CECR_LEVELS.map(level =>
  level.modules.flatMap(m => (LESSON_DATA[m.id] ?? []).map(l => l.id)),
);

const ALL_LESSONS: string[] = LESSONS_BY_LEVEL.flat();

export const CECR_LEVEL_LABELS: string[] = CECR_LEVELS.map(l => l.label);

/**
 * Seuils d'entrée de chaque palier, en nombre de leçons.
 *
 * On répartit STAGE_GAPS sur l'ensemble du parcours : la forme de la courbe
 * est fixe, son échelle suit le nombre réel de leçons. Ajouter des leçons au
 * cours ne casse donc rien.
 */
const TOTAL_LESSONS = ALL_LESSONS.length;
const STAGE_THRESHOLDS: number[] = (() => {
  const sum = STAGE_GAPS.reduce((a, b) => a + b, 0);
  let acc = 0;
  return [0, ...STAGE_GAPS.map(g => {
    acc += g;
    return Math.round((acc / sum) * TOTAL_LESSONS);
  })];
})();

function lessonsDone(ids: Iterable<string>): number {
  const done = ids instanceof Set ? ids : new Set(ids);
  return ALL_LESSONS.reduce((n, id) => n + (done.has(id) ? 1 : 0), 0);
}

/**
 * Palier atteint d'après les leçons terminées. Le dernier — la robe de
 * maître — exige le parcours entier, pas un seuil approché.
 */
export function stageForCompleted(completedLessonIds: Iterable<string>): number {
  if (TOTAL_LESSONS === 0) return 1;
  const finished = lessonsDone(completedLessonIds);
  if (finished >= TOTAL_LESSONS) return STAGE_COUNT;

  let stage = 1;
  for (let i = 1; i < STAGE_COUNT; i++) {
    if (finished >= STAGE_THRESHOLDS[i]) stage = i + 1;
  }
  return Math.min(STAGE_COUNT - 1, stage);
}

/** Leçons restantes avant le palier suivant — pour l'afficher au joueur. */
export function lessonsToNextStage(completedLessonIds: Iterable<string>): number {
  const finished = lessonsDone(completedLessonIds);
  const stage = stageForCompleted(completedLessonIds);
  if (stage >= STAGE_COUNT) return 0;
  const next = stage === STAGE_COUNT - 1 ? TOTAL_LESSONS : STAGE_THRESHOLDS[stage];
  return Math.max(1, next - finished);
}

/** Niveau CECR sur lequel travaille l'apprenant — sert d'étiquette. */
export function currentCecrLabel(completedLessonIds: Iterable<string>): string {
  const done = completedLessonIds instanceof Set
    ? completedLessonIds
    : new Set(completedLessonIds);
  for (let i = 0; i < LESSONS_BY_LEVEL.length; i++) {
    if (!LESSONS_BY_LEVEL[i].every(id => done.has(id))) return CECR_LEVEL_LABELS[i];
  }
  return CECR_LEVEL_LABELS[CECR_LEVEL_LABELS.length - 1];
}
