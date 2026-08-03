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
 * Les cartes créées portent un identifiant préfixé `custom:` — c'est ce qui
 * permet de les reconnaître partout ailleurs sans table de correspondance, et
 * garantit qu'elles n'entreront jamais en collision avec un identifiant du
 * dictionnaire.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CUSTOM_CARDS_KEY = 'xl_custom_cards_v1';
export const CARD_OVERRIDES_KEY = 'xl_card_overrides_v1';

export interface CustomCard {
  /** Toujours préfixé `custom:`. */
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

export const isCustomId = (id: string) => id.startsWith('custom:');

/** Identifiant stable, lisible dans les journaux et sans collision possible. */
export function newCustomId(): string {
  return `custom:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Lecture ──────────────────────────────────────────────────────────────────

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key).catch(() => null);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export const readCustomCards = () => readJson<CustomCard[]>(CUSTOM_CARDS_KEY, []);
export const readOverrides = () => readJson<Record<string, CardOverride>>(CARD_OVERRIDES_KEY, {});

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
