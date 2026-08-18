/**
 * sync-merge — combiner deux versions d'une donnée au lieu d'en élire une.
 *
 * ## Pourquoi ce fichier existe
 *
 * La synchronisation du web a longtemps fonctionné en « le plus récent
 * gagne » : à chaque rencontre entre la version locale et la version cloud,
 * on comparait deux horodatages et on jetait le perdant. Ça marche pour un
 * scalaire — la langue de l'interface, un objectif chiffré. Pour de la
 * progression, c'est destructeur, parce qu'un horodatage ne dit rien de la
 * RICHESSE d'une valeur. Un navigateur dont le stockage vient d'être vidé
 * écrit ses valeurs par défaut, les date de maintenant, et gagne.
 *
 * Neuf correctifs successifs (V11 à V19) ont tenté de colmater ça en
 * devinant : « est-ce que cette valeur ressemble à un défaut ? ». Une
 * heuristique a toujours un angle mort, et chacun s'est manifesté quelques
 * semaines plus tard — jusqu'à effacer, le 18 août 2026, les leçons
 * terminées, les statistiques, l'historique de Prof. Xiao et le carnet
 * d'erreurs d'un compte réel.
 *
 * L'app mobile ne s'est jamais posé la question, parce qu'elle ne choisit
 * pas : elle fusionne. Une liste vide unie à une liste pleine donne la liste
 * pleine, quel que soit l'ordre d'arrivée, quel que soit l'horodatage. Il n'y
 * a plus d'angle mort parce qu'il n'y a plus d'heuristique. Ce fichier porte
 * ce registre côté web, en l'étendant aux clés que le mobile ne connaît pas.
 *
 * ## La règle de conception
 *
 * Chaque fusion doit être **idempotente** (fusionner deux fois donne le même
 * résultat), **commutative** (l'ordre local/cloud n'importe pas) et
 * **croissante** (le résultat n'est jamais plus pauvre que chacune des deux
 * entrées). Ces trois propriétés sont ce qui rend la synchronisation sûre
 * quel que soit le nombre d'appareils et l'ordre des écritures ; elles sont
 * vérifiées par `sync-merge.test.ts`.
 *
 * Une conséquence assumée : on ne peut pas supprimer. Retirer une leçon de
 * la liste sur un appareil sera annulé par la fusion avec l'autre. Pour de la
 * progression c'est exactement ce qu'on veut. Les clés où la suppression est
 * une vraie action (les notes, les conversations) portent donc un champ de
 * date par élément, et la fusion garde la version la plus récente de chaque
 * élément plutôt que de raisonner sur la liste entière.
 */

export type Merger = (localRaw: string | null, cloudRaw: string | null) => string | null;

function parse<T>(raw: string | null): T | null {
  if (raw == null) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

const num = (v: unknown): number => (Number(v) || 0);

/**
 * Une valeur est « vide » si, en la parcourant récursivement, on ne trouve
 * aucune feuille porteuse d'information. Sert de garde de dernier recours
 * pour les clés SANS fusion déclarée, qui restent en « plus récent gagne ».
 */
export function estVide(s: string): boolean {
  const t = s.trim();
  if (t === '') return true;
  let p: unknown;
  try { p = JSON.parse(t); } catch { return false; }
  const vide = (v: unknown, d = 0): boolean => {
    if (d > 12) return false;
    if (v === null || v === undefined || v === false || v === 0 || v === '') return true;
    if (Array.isArray(v)) return v.every((x) => vide(x, d + 1));
    if (typeof v === 'object') return Object.values(v as Record<string, unknown>).every((x) => vide(x, d + 1));
    return false;
  };
  return vide(p);
}

// ── Briques de fusion ────────────────────────────────────────────────────────

/** Union de deux tableaux de valeurs simples (identifiants, dates). */
export const unionTableau: Merger = (l, c) => {
  const a = parse<unknown[]>(l), b = parse<unknown[]>(c);
  if (!Array.isArray(a)) return Array.isArray(b) ? c : (l ?? c);
  if (!Array.isArray(b)) return l;
  const vus = new Set(a.map((v) => JSON.stringify(v)));
  const out = [...a];
  for (const v of b) { const k = JSON.stringify(v); if (!vus.has(k)) { vus.add(k); out.push(v); } }
  return JSON.stringify(out);
};

/**
 * Liste d'objets identifiés : union par `id`, et pour un id présent des deux
 * côtés on garde la version la plus récemment modifiée. C'est la seule forme
 * de fusion qui laisse une modification écraser une version antérieure — d'où
 * l'exigence d'un champ de date sur chaque élément.
 */
export const unionParId = (champDate = 'updatedAt'): Merger => (l, c) => {
  type Item = Record<string, unknown> & { id?: string };
  const a = parse<Item[]>(l), b = parse<Item[]>(c);
  if (!Array.isArray(a)) return Array.isArray(b) ? c : (l ?? c);
  if (!Array.isArray(b)) return l;
  const date = (it: Item): number => {
    const v = it[champDate];
    if (typeof v === 'number') return v;
    if (typeof v === 'string') { const t = Date.parse(v); return Number.isFinite(t) ? t : 0; }
    return 0;
  };
  const parId = new Map<string, Item>();
  for (const it of [...a, ...b]) {
    if (!it || typeof it.id !== 'string') continue;
    const prec = parId.get(it.id);
    if (!prec || date(it) >= date(prec)) parId.set(it.id, it);
  }
  return JSON.stringify([...parId.values()]);
};

/** Dictionnaire clé → nombre : on garde le maximum par clé. */
export const maxParCle: Merger = (l, c) => {
  const a = parse<Record<string, number>>(l) ?? {};
  const b = parse<Record<string, number>>(c) ?? {};
  const out: Record<string, number> = { ...a };
  for (const [k, v] of Object.entries(b)) if (num(v) > num(out[k])) out[k] = num(v);
  return JSON.stringify(out);
};

/**
 * Nombre seul : maximum. L'XP et les compteurs ne redescendent jamais.
 *
 * On renvoie la chaîne d'ORIGINE du gagnant, sans la réécrire. Les compteurs
 * ne sont pas tous encodés pareil — `xl_xp_total` vaut `"5208"` (nombre dans
 * une chaîne JSON) là où `xl_xp_v2` vaut `0` (nombre nu). Re-sérialiser
 * changeait l'encodage, donc f(x, x) ≠ x : chaque reconcile croyait avoir du
 * neuf et réécrivait, ce qui relançait un onSnapshot, qui relançait un
 * reconcile. Rendre la valeur telle quelle rompt la boucle.
 */
export const maxNombre: Merger = (l, c) => {
  if (l == null) return c;
  if (c == null) return l;
  const a = num(parse<number>(l) ?? l);
  const b = num(parse<number>(c) ?? c);
  return a >= b ? l : c;
};

/**
 * Dictionnaire clé → objet, fusionné entrée par entrée par une règle donnée.
 * Les entrées présentes d'un seul côté sont conservées telles quelles : c'est
 * ce qui rend la fusion croissante.
 */
const parEntree = <T>(regle: (a: T, b: T) => T): Merger => (l, c) => {
  const a = parse<Record<string, T>>(l) ?? {};
  const b = parse<Record<string, T>>(c) ?? {};
  const out: Record<string, T> = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = k in out ? regle(out[k], v) : v;
  return JSON.stringify(out);
};

const dateMax = (a?: string | null, b?: string | null): string | null =>
  [a, b].filter(Boolean).sort().pop() ?? null;

// ── Fusions par domaine ──────────────────────────────────────────────────────

/**
 * Bilans : réussi une fois, réussi pour toujours ; scores et tentatives au max.
 *
 * Les deux champs de date ne sont posés que s'ils existent quelque part.
 * Les ajouter à `null` d'office suffisait à casser l'idempotence — un bilan
 * sans `lastAttemptAt` en gagnait un, la chaîne changeait, et la fusion se
 * croyait porteuse de nouveauté à chaque passage.
 */
export const fusionBilans = parEntree<Record<string, unknown>>((a, b) => {
  const out: Record<string, unknown> = {
    ...b, ...a,
    passed: !!(a.passed || b.passed),
    bestScore: Math.max(num(a.bestScore), num(b.bestScore)),
    attempts: Math.max(num(a.attempts), num(b.attempts)),
  };
  // Première réussite : la plus ANCIENNE des deux — c'est une date d'origine.
  const premier = [a.firstPassedAt, b.firstPassedAt].filter(Boolean).sort()[0];
  if (premier) out.firstPassedAt = premier;
  const dernier = dateMax(a.lastAttemptAt as string, b.lastAttemptAt as string);
  if (dernier) out.lastAttemptAt = dernier;
  return out;
});

/** Maîtrise d'une leçon : la révision la plus récente fait foi, le reste au max. */
export const fusionMaitrise = parEntree<Record<string, unknown>>((a, b) => {
  const recent = String(b.lastReviewedAt ?? '') > String(a.lastReviewedAt ?? '') ? b : a;
  return {
    ...recent,
    mastery: Math.max(num(a.mastery), num(b.mastery)),
    reviewCount: Math.max(num(a.reviewCount), num(b.reviewCount)),
  };
});

/**
 * SRS d'un mot : la révision la plus récente fait foi pour les échéances,
 * mais le nombre de révisions ne redescend pas. On ne prend PAS le max du
 * niveau — un mot oublié doit pouvoir redescendre, c'est le principe même de
 * la répétition espacée. C'est le seul endroit où « croissant » s'applique au
 * compteur et non à la valeur.
 */
export const fusionSrs = parEntree<Record<string, unknown>>((a, b) => {
  const recent = num(b.lastReviewedAt) > num(a.lastReviewedAt) ? b : a;
  return { ...recent, reviewCount: Math.max(num(a.reviewCount), num(b.reviewCount)) };
});

/** Statistiques d'apprentissage : minutes au max par jour, totaux au max. */
export const fusionStats: Merger = (l, c) => {
  type S = { dailyMinutes?: Record<string, number>; totalMinutes?: number; streak?: number; lastDate?: string | null };
  const a = parse<S>(l) ?? {}, b = parse<S>(c) ?? {};
  const daily: Record<string, number> = { ...(a.dailyMinutes ?? {}) };
  for (const [k, v] of Object.entries(b.dailyMinutes ?? {})) if (num(v) > num(daily[k])) daily[k] = num(v);
  return JSON.stringify({
    dailyMinutes: daily,
    totalMinutes: Math.max(num(a.totalMinutes), num(b.totalMinutes)),
    streak: Math.max(num(a.streak), num(b.streak)),
    lastDate: dateMax(a.lastDate, b.lastDate),
  });
};

/** Activité quotidienne {date: {cartes, xp, sessions, leçons}} : max champ à champ. */
export const fusionActivite = parEntree<Record<string, unknown>>((a, b) => {
  const out: Record<string, unknown> = { ...a };
  for (const [k, v] of Object.entries(b)) {
    out[k] = typeof v === 'number' ? Math.max(num(a[k]), v) : (a[k] ?? v);
  }
  return out;
});

/** Série : le jour le plus récent donne le courant, le record reste le record. */
export const fusionSerie: Merger = (l, c) => {
  type S = { current?: number; best?: number; lastDay?: string | null };
  const a = parse<S>(l) ?? {}, b = parse<S>(c) ?? {};
  const recent = (b.lastDay ?? '') > (a.lastDay ?? '') ? b : a;
  return JSON.stringify({
    current: num(recent.current),
    best: Math.max(num(a.best), num(b.best)),
    lastDay: recent.lastDay ?? null,
  });
};

/** Succès : débloqué une fois, débloqué pour toujours ; date la plus ancienne. */
export const fusionSucces = parEntree<Record<string, unknown>>((a, b) => ({
  unlockedAt: [a.unlockedAt, b.unlockedAt].filter(Boolean).sort()[0] ?? null,
  // Réclamé d'un côté = réclamé. Sinon l'XP serait attribuée deux fois.
  xpClaimed: !!(a.xpClaimed || b.xpClaimed),
}));

/** Statistiques de duel : compteurs au max, historique récent en union. */
export const fusionDuels: Merger = (l, c) => {
  type B = { played?: number; won?: number; draw?: number; xpFromBattles?: number; recent?: unknown[] };
  const a = parse<B>(l) ?? {}, b = parse<B>(c) ?? {};
  const recent = JSON.parse(unionTableau(
    JSON.stringify(a.recent ?? []), JSON.stringify(b.recent ?? []),
  ) ?? '[]');
  return JSON.stringify({
    played: Math.max(num(a.played), num(b.played)),
    won: Math.max(num(a.won), num(b.won)),
    draw: Math.max(num(a.draw), num(b.draw)),
    xpFromBattles: Math.max(num(a.xpFromBattles), num(b.xpFromBattles)),
    recent: recent.slice(-50),
  });
};

/** Annonces lues : union des identifiants. */
export const fusionAnnonces: Merger = (l, c) => {
  type A = { ids?: string[]; updatedAt?: string };
  const a = parse<A>(l) ?? {}, b = parse<A>(c) ?? {};
  return JSON.stringify({
    ids: [...new Set([...(a.ids ?? []), ...(b.ids ?? [])])],
    updatedAt: dateMax(a.updatedAt, b.updatedAt) ?? new Date().toISOString(),
  });
};

/** Bonus de série : jalons en union, dernière réclamation la plus récente. */
export const fusionBonusSerie: Merger = (l, c) => {
  type B = { milestonesClaimed?: unknown[]; lastDailyBonusAt?: string | null };
  const a = parse<B>(l) ?? {}, b = parse<B>(c) ?? {};
  return JSON.stringify({
    milestonesClaimed: JSON.parse(unionTableau(
      JSON.stringify(a.milestonesClaimed ?? []), JSON.stringify(b.milestonesClaimed ?? []),
    ) ?? '[]'),
    lastDailyBonusAt: dateMax(a.lastDailyBonusAt, b.lastDailyBonusAt),
  });
};

// ── Registre ─────────────────────────────────────────────────────────────────

/**
 * Clé → fusion. Toute clé absente de ce registre reste en « plus récent
 * gagne », protégée par `estVide` : c'est le bon comportement pour les
 * préférences (langue, thème, objectifs chiffrés), où la dernière volonté de
 * l'utilisateur doit effectivement l'emporter.
 */
export const MERGERS: Record<string, Merger> = {
  // Progression — listes qui ne font que croître
  cl_completed_lessons: unionTableau,
  cl_learned_words: unionTableau,
  xl_study_days: unionTableau,
  xl_notif_tombstones_v1: unionTableau,

  // Contenu créé par l'utilisateur — suppression possible, d'où l'id + date
  cl_personal_flashcards_v7: unionParId('updatedAt'),
  cl_custom_lists: unionParId('updatedAt'),
  xl_chat_conversations_v1: unionParId('updatedAt'),
  xl_error_journal_v1: unionParId('createdAt'),

  // Structures de progression
  cl_bilans_v7: fusionBilans,
  cl_lesson_mastery_v7: fusionMaitrise,
  cl_word_srs_v1: fusionSrs,
  cl_word_srs_v2: fusionSrs,
  cl_learning_stats_v1: fusionStats,
  cl_flashcard_activity_v4: fusionActivite,
  xl_activity_v2: maxParCle,
  xl_achievements_v1: fusionSucces,
  xl_battle_stats_v1: fusionDuels,
  xl_announcements_read_v1: fusionAnnonces,
  xl_streak_bonus_v1: fusionBonusSerie,

  // Compteurs — jamais décroissants
  xl_xp_v2: maxNombre,
  xl_xp_total: maxNombre,
  xl_streak_v2: fusionSerie,
  xl_streak_days: maxNombre,
};

/** La fusion déclarée pour cette clé, s'il y en a une. */
export const mergerPour = (cle: string): Merger | undefined => MERGERS[cle];
