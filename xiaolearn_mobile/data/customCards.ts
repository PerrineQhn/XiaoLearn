/**
 * Cartes personnalisées et surcharges.
 *
 * Deux besoins distincts, deux mécanismes distincts — les confondre aurait été
 * une erreur de conception :
 *
 *   1. **Créer** une carte pour un mot ou une phrase absents du dictionnaire.
 *      C'est une carte à part entière : elle a son hanzi, son pinyin, sa
 *      traduction, et elle entre dans la révision espacée comme les autres.
 *
 *   2. **Personnaliser** une carte du dictionnaire — ajouter sa propre
 *      traduction, corriger un pinyin, coller une phrase d'exemple mémotechnique.
 *      Ici on ne duplique surtout pas la carte : on stocke uniquement les champs
 *      modifiés. La carte d'origine reste la référence, et une mise à jour du
 *      dictionnaire ne se retrouve pas écrasée par une copie figée.
 *
 * ## Choix d'accès
 *
 * La création est réservée à Premium, la personnalisation est offerte à tous.
 * Annoter ou corriger ce qu'on apprend relève du confort de base — le faire
 * payer serait mesquin, et pousserait surtout l'utilisateur à recopier la carte
 * ailleurs. Créer des cartes de toutes pièces, en revanche, est un usage
 * avancé, qui se défend comme argument d'abonnement.
 *
 * ## Identifiants
 *
 * Les cartes créées portent un identifiant préfixé `p:`, défini par
 * `data/cardIdentity.ts` — le même contrat que côté web. C'est ce qui permet
 * de les reconnaître partout ailleurs sans table de correspondance, et garantit
 * qu'elles n'entreront jamais en collision avec une carte du dictionnaire
 * (`w:`) ni avec une phrase (`s:`).
 *
 * Le préfixe était auparavant `custom:`, propre au mobile, quand le web
 * utilisait `pf-`. Les cartes déjà enregistrées sont renommées à la lecture :
 * voir `migratePersonalId`.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cardIdForHanzi, isPersonalId, migratePersonalId, newPersonalCardId } from './cardIdentity';
import { LEARN_SECTIONS } from './cecrLearnSections';

export const CUSTOM_CARDS_KEY = 'xl_custom_cards_v1';
export const CARD_OVERRIDES_KEY = 'xl_card_overrides_v1';

export interface CustomCard {
  /** Toujours préfixé `p:` — voir `data/cardIdentity.ts`. */
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  /** Note libre : moyen mnémotechnique, contexte, phrase d'exemple. */
  note?: string;
  /** Niveau de rattachement, pour que la carte apparaisse dans un deck. */
  levelKey: string;
  createdAt: string;
  updatedAt: string;
}

/** Champs qu'on peut redéfinir sur une carte du dictionnaire. */
export interface CardOverride {
  pinyin?: string;
  translation?: string;
  note?: string;
  updatedAt: string;
}

/**
 * Ces deux fonctions viennent du contrat partagé et sont simplement
 * ré-exportées : les écrans qui manipulent des cartes personnalisées n'ont pas
 * à savoir qu'il existe un fichier d'identité, mais il ne doit y avoir qu'une
 * seule définition.
 */
export const isCustomId = isPersonalId;
export const newCustomId = newPersonalCardId;

// ─── Lecture ──────────────────────────────────────────────────────────────────

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key).catch(() => null);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

/**
 * Cartes personnelles, identifiants normalisés au passage.
 *
 * La migration `custom:` → `p:` se fait ici, à la lecture, plutôt que par un
 * script de démarrage : une carte n'est réécrite sur le disque que le jour où
 * elle est modifiée, et une version de l'application antérieure à ce changement
 * continuerait de lire ses propres données sans rien casser. Une carte déjà au
 * nouveau format traverse la fonction sans être touchée.
 */
export async function readCustomCards(): Promise<CustomCard[]> {
  const list = await readJson<CustomCard[]>(CUSTOM_CARDS_KEY, []);
  return list.map(c => (c?.id ? { ...c, id: migratePersonalId(c.id) } : c));
}
/**
 * Table de correspondance des ANCIENNES clés de surcharge vers les nouvelles.
 *
 * Les surcharges sont indexées par identifiant de carte. Or cet identifiant est
 * passé de positionnel — `${sectionId}:${sIdx}:${idx}` — à `w:{hanzi}`. Sans
 * cette table, chaque surcharge déjà enregistrée pointerait dans le vide : le
 * pinyin corrigé et la note mnémotechnique tapés par l'utilisateur seraient
 * toujours sur le disque, mais plus rattachés à aucune carte.
 *
 * La reconstruction est exacte tant que le contenu du cours n'a pas bougé
 * depuis l'écriture de la surcharge — on reparcourt `LEARN_SECTIONS` dans le
 * même ordre que l'ancien code pour retrouver quel hanzi occupait cette
 * position. Une position devenue introuvable est simplement ignorée : mieux
 * vaut perdre une surcharge que la recoller sur le mauvais mot.
 */
let _legacyOverrideKeys: Map<string, string> | null = null;

function legacyOverrideKeys(): Map<string, string> {
  if (_legacyOverrideKeys) return _legacyOverrideKeys;
  const map = new Map<string, string>();
  for (const [sectionId, sections] of Object.entries(LEARN_SECTIONS)) {
    sections.forEach((section, sIdx) => {
      section.items?.forEach((item, idx) => {
        if (item?.hanzi) map.set(`${sectionId}:${sIdx}:${idx}`, cardIdForHanzi(item.hanzi));
      });
    });
  }
  _legacyOverrideKeys = map;
  return map;
}

/**
 * Surcharges, clés normalisées au passage.
 *
 * Deux surcharges héritées peuvent viser le même mot — il est enseigné à
 * plusieurs endroits du cours, et l'ancien schéma en faisait autant de cartes
 * distinctes. La plus récemment modifiée l'emporte, ce qui est le seul
 * arbitrage défendable : c'est la dernière intention exprimée.
 */
export async function readOverrides(): Promise<Record<string, CardOverride>> {
  const raw = await readJson<Record<string, CardOverride>>(CARD_OVERRIDES_KEY, {});
  const legacy = legacyOverrideKeys();
  const out: Record<string, CardOverride> = {};
  for (const [key, ov] of Object.entries(raw)) {
    const id = key.startsWith('w:') || isPersonalId(key) ? key : legacy.get(key);
    if (!id) continue;
    const prev = out[id];
    if (prev && (prev.updatedAt ?? '') > (ov?.updatedAt ?? '')) continue;
    out[id] = ov;
  }
  return out;
}

// ─── Écriture ─────────────────────────────────────────────────────────────────

/**
 * Crée ou met à jour une carte personnalisée.
 *
 * `save` est injecté par l'appelant (`useFirestoreSync`) pour que l'écriture
 * parte aussi vers Firestore. Ce module reste sans hook, donc utilisable
 * depuis n'importe où.
 */
export async function upsertCustomCard(
  card: Omit<CustomCard, 'createdAt' | 'updatedAt'> & { createdAt?: string },
  save: (key: string, value: string) => Promise<void> | void,
): Promise<CustomCard[]> {
  const all = await readCustomCards();
  const now = new Date().toISOString();
  const prev = all.find(c => c.id === card.id);
  const next: CustomCard = {
    ...card,
    createdAt: prev?.createdAt ?? card.createdAt ?? now,
    updatedAt: now,
  };
  const list = [...all.filter(c => c.id !== card.id), next];
  await save(CUSTOM_CARDS_KEY, JSON.stringify(list));
  return list;
}

export async function deleteCustomCard(
  id: string,
  save: (key: string, value: string) => Promise<void> | void,
): Promise<CustomCard[]> {
  const list = (await readCustomCards()).filter(c => c.id !== id);
  await save(CUSTOM_CARDS_KEY, JSON.stringify(list));
  return list;
}

/**
 * Pose ou retire une surcharge.
 *
 * Un champ vidé est supprimé de la surcharge plutôt que stocké vide : on
 * revient ainsi à la valeur du dictionnaire, ce qui est le comportement
 * attendu quand on efface son texte. Une surcharge devenue vide disparaît.
 */
export async function setOverride(
  cardId: string,
  patch: Partial<Omit<CardOverride, 'updatedAt'>>,
  save: (key: string, value: string) => Promise<void> | void,
): Promise<Record<string, CardOverride>> {
  const all = await readOverrides();
  const merged: CardOverride = { ...all[cardId], ...patch, updatedAt: new Date().toISOString() };
  for (const k of ['pinyin', 'translation', 'note'] as const) {
    if (!merged[k]?.trim()) delete merged[k];
  }
  const next = { ...all };
  if (!merged.pinyin && !merged.translation && !merged.note) delete next[cardId];
  else next[cardId] = merged;
  await save(CARD_OVERRIDES_KEY, JSON.stringify(next));
  return next;
}
