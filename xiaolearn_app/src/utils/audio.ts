const DEFAULT_AUDIO_CDN_BASE =
  'https://cdn.jsdelivr.net/gh/PerrineQhn/XiaoLearn@main/xiaolearn_app/public';

const normalizeRelativePath = (src: string) => src.replace(/^\/+/, '');

/**
 * Hash FNV-1a 32-bit → base36. Doit rester IDENTIQUE à la version Node dans
 * scripts/generate-all-audio.mjs (collectLessonExampleJobs) pour que les noms
 * de fichiers produits par le script matchent les URLs calculées côté app.
 */
const hashExampleName = (hanzi: string): string => {
  let h = 0x811c9dc5;
  for (let i = 0; i < hanzi.length; i++) {
    h ^= hanzi.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
};

/**
 * Calcule l'URL d'un audio d'exemple généré par le script Azure depuis son
 * hanzi (phrase complète ou mot). Utilisée comme FALLBACK quand un example
 * n'a pas de champ `audio:` déclaré. Le fichier correspondant n'existe que
 * si le script a été exécuté avec la catégorie `examples` activée.
 */
export const getExampleAudioUrl = (hanzi: string): string => {
  const clean = hanzi.replace(/\d+$/, '').trim();
  return `audio/examples/${hashExampleName(clean)}.mp3`;
};

// Ordre préférentiel : on essaie TOUJOURS .mp3 d'abord (fichiers Azure Neural
// haute qualité regénérés), puis fallback .wav pour les mots historiques pas
// encore regénérés (HSK7 notamment, ~4400 mots encore en .wav au 2026-04-20).
// Le résultat garde l'extension d'origine si c'est un autre format (ex. readings).
const withAlternateExtension = (src: string): string[] => {
  if (src.endsWith('.wav')) {
    const base = src.slice(0, -4);
    return [base + '.mp3', src]; // .mp3 d'abord, .wav en fallback
  }
  if (src.endsWith('.mp3')) {
    const base = src.slice(0, -4);
    return [src, base + '.wav']; // .mp3 déjà demandé en priorité
  }
  return [src];
};

const dedupe = (items: string[]) => Array.from(new Set(items.filter(Boolean)));

export const resolveAudioSrc = (src: string): string => {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src;
  const trimmed = normalizeRelativePath(src);
  const base = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${trimmed}`;
};

export const resolveRemoteAudioSrc = (src: string): string | null => {
  if (!src) return null;
  if (/^https?:\/\//i.test(src)) return null;
  const trimmed = normalizeRelativePath(src);
  if (!trimmed.startsWith('audio/')) return null;
  const configured = import.meta.env.VITE_AUDIO_BASE_URL?.trim();
  const base = configured && configured.length > 0 ? configured : DEFAULT_AUDIO_CDN_BASE;
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${normalizedBase}/${trimmed}`;
};

export const getAudioSrcCandidates = (src: string): string[] => {
  const localSrc = resolveAudioSrc(src);
  const remoteSrc = resolveRemoteAudioSrc(src);
  const candidates = [
    ...withAlternateExtension(localSrc),
    ...(remoteSrc ? withAlternateExtension(remoteSrc) : [])
  ];
  return dedupe(candidates);
};

// ---------------------------------------------------------------------------
// Probes parallèles avec priorité
// ---------------------------------------------------------------------------
//
// Avant cette réécriture (v2026-04-21), `playHanziAudio` testait chaque URL
// candidate séquentiellement via `new Audio(url).play()`. Pour un hanzi HSK6,
// ça pouvait enchaîner ~24 tentatives avant de trouver le bon fichier,
// chacune engendrant une requête réseau avec 404 → 2-5s de latence perçue
// entre le clic et le son.
//
// Nouvelle stratégie :
//   1. Construire la liste complète des URLs candidates (déjà triée par
//      priorité : explicit → example → hsk1…hsk7-9).
//   2. Envoyer un HEAD parallèle sur toutes les candidates. Latence ≈ plus
//      lente HEAD (~200-500ms) au lieu de somme des échecs séquentiels.
//   3. Sélectionner la PREMIÈRE candidate OK selon l'ordre de priorité
//      (pas la plus rapide à répondre) pour garantir que c'est toujours le
//      même fichier qui est retenu — donc le même son qu'avec l'ancien code.
//   4. Mettre le résultat en cache pour éviter de re-probe au prochain clic.

const probeCache = new Map<string, boolean>();

/**
 * Probe une URL avec GET Range 0-3 + vérification des magic bytes.
 *
 * Pourquoi pas juste HEAD + response.ok ?
 * --------------------------------------
 * Cloudflare Pages applique la règle SPA `/* → /index.html 200` sur toute URL
 * inconnue. Si le fichier audio n'existe pas (prune, typo, etc.), le serveur
 * renvoie quand même 200 avec le HTML de l'app. `response.ok` serait true,
 * puis Audio(url) échouerait avec NotSupportedError à la lecture.
 *
 * En téléchargeant les 4 premiers octets (Range: 0-3 = 4 bytes, coût négligeable,
 * le navigateur cache), on peut distinguer :
 *   - MP3 : commence par `ID3` ou `FF Fx` (MPEG frame sync)
 *   - WAV : commence par `RIFF`
 *   - HTML SPA fallback : commence par `<!DO` (`<!doctype>`)
 *   - jsdelivr "file not found" : 403 avec "Package ..." — déjà capturé par !response.ok
 */
async function probeUrl(url: string, timeoutMs = 2500): Promise<boolean> {
  if (probeCache.has(url)) return probeCache.get(url)!;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Range: 'bytes=0-3' },
      signal: controller.signal,
      cache: 'default'
    });
    if (!response.ok && response.status !== 206) {
      probeCache.set(url, false);
      return false;
    }
    const buf = await response.arrayBuffer();
    const bytes = new Uint8Array(buf);
    // Besoin d'au moins 3 bytes pour faire la différence. Si on a moins (rare,
    // fichier tronqué), on considère invalide pour éviter un faux positif.
    if (bytes.length < 3) {
      probeCache.set(url, false);
      return false;
    }
    const isMp3 = bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33; // "ID3"
    const isMp3Frame = bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0;         // MPEG sync
    const isWav = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46;  // "RIF(F)"
    const isAudio = isMp3 || isMp3Frame || isWav;
    probeCache.set(url, isAudio);
    return isAudio;
  } catch {
    // Échec réseau / abort → on ne cache pas (transient), mais on renvoie
    // false pour passer à la suivante.
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Lance des HEAD requests en PARALLÈLE sur toutes les candidates (elles
 * partent toutes en même temps, pas séquentiellement), puis `await` leurs
 * résultats dans l'ordre de priorité et renvoie la PREMIÈRE qui répond 200.
 *
 * Avantage majeur vs `Promise.all` : on résout dès que la plus prioritaire
 * répond OK, sans attendre les probes plus lentes. Dans le cas optimiste
 * (la 1ère URL est bonne), la latence = 1 RTT (~100-300ms) au lieu d'attendre
 * ~50 probes dont certaines peuvent timeout.
 *
 * Garantit la même sélection qu'un test séquentiel pur : ordre de priorité
 * respecté, donc c'est toujours le même fichier qui est joué.
 */
async function findFirstExistingUrl(candidates: string[]): Promise<string | null> {
  if (candidates.length === 0) return null;
  // Démarre toutes les probes en parallèle immédiatement.
  const probes = candidates.map((url) => probeUrl(url));
  // Itère dans l'ordre de priorité et retourne dès qu'une priorité haute
  // est confirmée true. Les probes moins prioritaires continuent en fond
  // (résultats mis en cache pour la prochaine fois) mais on n'attend pas.
  for (let i = 0; i < candidates.length; i++) {
    if (await probes[i]) return candidates[i];
  }
  return null;
}

/**
 * Joue une URL déjà validée. Utilisée après `findFirstExistingUrl`.
 * Contrairement à l'ancien `playAudioWithFallback`, ne fait PAS de boucle
 * séquentielle sur les candidates — la sélection est déjà faite.
 */
async function playResolvedUrl(url: string): Promise<HTMLAudioElement> {
  const audio = new Audio(url);
  await audio.play();
  return audio;
}

// ---------------------------------------------------------------------------
// API publique
// ---------------------------------------------------------------------------

/**
 * Essaie de jouer `src` en testant les variantes .mp3/.wav et local/CDN.
 * Conservé pour compat avec les callers qui ont déjà une URL « bien formée »
 * (FlashcardItem, DictationGame, etc.). Utilise maintenant findFirstExistingUrl
 * en interne pour paralléliser les probes.
 */
export const playAudioWithFallback = async (src: string): Promise<HTMLAudioElement> => {
  const candidates = getAudioSrcCandidates(src);
  const url = await findFirstExistingUrl(candidates);
  if (!url) throw new Error(`Audio playback failed: aucune variante disponible pour "${src}"`);
  return playResolvedUrl(url);
};

// ---------------------------------------------------------------------------
// playHanziAudio : TTS 100% MP3/WAV (pas de Web Speech)
// ---------------------------------------------------------------------------
//
// Règle métier : tous les audios du site doivent être reliés à un fichier
// MP3/WAV pré-enregistré (Azure TTS). On a ~5000 fichiers dans
// /public/audio/hsk{1..7}/ nommés selon la convention `hsk{N}_{hanzi}.mp3`
// (ou `.wav` pour les anciens non regénérés), et `hsk-7-9_{hanzi}.mp3` pour
// le niveau avancé C1/C2.

const HANZI_AUDIO_CONVENTIONS = [
  (hanzi: string) => `audio/hsk1/hsk1_${hanzi}.wav`,
  (hanzi: string) => `audio/hsk2/hsk2_${hanzi}.wav`,
  (hanzi: string) => `audio/hsk3/hsk3_${hanzi}.wav`,
  (hanzi: string) => `audio/hsk4/hsk4_${hanzi}.wav`,
  (hanzi: string) => `audio/hsk5/hsk5_${hanzi}.wav`,
  (hanzi: string) => `audio/hsk6/hsk6_${hanzi}.wav`,
  (hanzi: string) => `audio/hsk7/hsk7_${hanzi}.wav`,
  // HSK 7-9 (avancé C1/C2) : 3 préfixes coexistent dans public/audio/hsk7/
  // selon l'époque de génération (hsk7-9_, hsk-7-9_). Essaie aussi les
  // dossiers hsk1/2/3 pour anciens datasets où certaines cartes avancées
  // étaient stockées là.
  (hanzi: string) => `audio/hsk7/hsk7-9_${hanzi}.wav`,
  (hanzi: string) => `audio/hsk7/hsk-7-9_${hanzi}.wav`,
  (hanzi: string) => `audio/hsk1/hsk-7-9_${hanzi}.wav`,
  (hanzi: string) => `audio/hsk2/hsk-7-9_${hanzi}.wav`,
  (hanzi: string) => `audio/hsk3/hsk-7-9_${hanzi}.wav`
];

// Cache runtime : hanzi → URL trouvée (évite de réessayer 10+ URLs à chaque
// clic sur le même mot). Une fois un fichier trouvé, on le réutilise direct.
const hanziAudioCache = new Map<string, string>();

// Cache des <audio> préchargés. Quand preloadHanziAudio est appelé (au survol
// d'un bouton, au montage d'une carte flashcard, etc.), on garde l'élément
// prêt pour que le clic joue instantanément.
//
// Capé à PRELOAD_CACHE_MAX entrées avec éviction LRU pour éviter qu'une
// navigation prolongée dans 11000+ hanzi ne fasse exploser la mémoire
// (chaque <audio> préchargé ≈ 50-200 KB bufferés).
const PRELOAD_CACHE_MAX = 50;
const preloadedAudios = new Map<string, HTMLAudioElement>();

function rememberPreloaded(hanzi: string, audio: HTMLAudioElement) {
  // Map conserve l'ordre d'insertion → on supprime puis on ré-ajoute pour
  // placer la clé en « most recently used ».
  if (preloadedAudios.has(hanzi)) preloadedAudios.delete(hanzi);
  preloadedAudios.set(hanzi, audio);
  while (preloadedAudios.size > PRELOAD_CACHE_MAX) {
    const oldest = preloadedAudios.keys().next().value;
    if (oldest === undefined) break;
    const el = preloadedAudios.get(oldest);
    preloadedAudios.delete(oldest);
    // Libère les ressources réseau/décodeur de l'élément évincé.
    if (el) {
      el.pause();
      el.src = '';
    }
  }
}

/**
 * Construit les candidats pour une URL en version LOCALE uniquement (même
 * origine que le site). Local = extensions .mp3/.wav, pas de CDN.
 */
function getLocalCandidates(src: string): string[] {
  const localSrc = resolveAudioSrc(src);
  return withAlternateExtension(localSrc);
}

/**
 * Idem mais pour les URLs REMOTE (jsdelivr CDN).
 */
function getRemoteCandidates(src: string): string[] {
  const remoteSrc = resolveRemoteAudioSrc(src);
  if (!remoteSrc) return [];
  return withAlternateExtension(remoteSrc);
}

/**
 * Construit la liste complète des URLs candidates pour un hanzi, dans
 * l'ordre de priorité. L'ordre garantit que c'est toujours le même fichier
 * qui est sélectionné — donc le même son qu'avant le refactor.
 *
 * Priorité :
 *   1. URL explicite (champ `audio:` sur l'item), si fournie
 *   2. `audio/examples/<hash>.mp3` si hanzi > 3 caractères (phrase)
 *   3. Conventions HSK 1 → 7-9
 *
 * Organisation : on teste TOUS les chemins LOCAUX d'abord (même origine,
 * HEAD en ~50ms), puis tous les CDN en fallback. Sur le site déployé avec
 * les fichiers audio bundlés (cas normal), on ne touche jamais jsdelivr —
 * la résolution d'une URL prend <100ms parallèles au lieu de ~500ms.
 *
 * Avant : [hsk1.local.mp3, hsk1.local.wav, hsk1.cdn.mp3, hsk1.cdn.wav,
 *          hsk2.local.mp3, ...] → on intercale local/CDN par convention
 * Après : [hsk1.local.mp3, hsk1.local.wav, hsk2.local.mp3, ..., hsk7-9.local.wav,
 *          hsk1.cdn.mp3, hsk1.cdn.wav, ..., hsk7-9.cdn.wav]
 */
function buildHanziCandidates(hanzi: string, explicitUrl?: string | null): string[] {
  const locals: string[] = [];
  const remotes: string[] = [];
  const add = (src: string) => {
    locals.push(...getLocalCandidates(src));
    remotes.push(...getRemoteCandidates(src));
  };

  if (explicitUrl) add(explicitUrl);
  const cleanHanzi = hanzi.replace(/\d+$/, '').trim();
  if (cleanHanzi.length > 3) add(getExampleAudioUrl(cleanHanzi));
  for (const build of HANZI_AUDIO_CONVENTIONS) add(build(hanzi));

  return dedupe([...locals, ...remotes]);
}

/**
 * Résout l'URL définitive pour un hanzi, avec cache persistant. Si déjà
 * trouvé lors d'un clic ou d'un preload précédent, renvoie directement.
 * Sinon, probe en parallèle toutes les candidates et renvoie la première OK
 * selon l'ordre de priorité.
 */
async function resolveHanziAudioUrl(
  hanzi: string,
  explicitUrl?: string | null
): Promise<string | null> {
  const cached = hanziAudioCache.get(hanzi);
  if (cached) return cached;
  const candidates = buildHanziCandidates(hanzi, explicitUrl);
  const url = await findFirstExistingUrl(candidates);
  if (url) hanziAudioCache.set(hanzi, url);
  return url;
}

/**
 * Précharge l'audio d'un hanzi sans le jouer. À appeler au `mouseenter` /
 * `pointerenter` / `focus` du bouton audio : quand l'utilisateur clique
 * réellement, le fichier est déjà résolu + bufferé par le navigateur, donc
 * la lecture démarre en <50ms.
 *
 * Idempotent et silencieux : peut être appelé plusieurs fois sans effet
 * négatif. N'affiche aucune erreur si la résolution échoue (on retentera
 * au clic).
 */
export async function preloadHanziAudio(
  hanzi: string,
  explicitUrl?: string | null
): Promise<void> {
  if (preloadedAudios.has(hanzi)) return;
  try {
    const url = await resolveHanziAudioUrl(hanzi, explicitUrl);
    if (!url) return;
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = url;
    // Déclenche le buffering réseau. Pas de play(), donc pas de son.
    audio.load();
    rememberPreloaded(hanzi, audio);
  } catch {
    // Silence : on retentera au clic.
  }
}

/**
 * Joue l'audio d'un hanzi depuis un fichier MP3/WAV pré-enregistré.
 * Ne tombe JAMAIS sur Web Speech (voulu : UX cohérente Chrome / Safari).
 *
 * Si `preloadHanziAudio` a été appelé précédemment, la lecture est quasi
 * instantanée (fichier déjà bufferé). Sinon, on résout l'URL avec probes
 * parallèles puis on joue.
 *
 * @returns Promise résolue quand la lecture a démarré, rejetée si aucun
 *          fichier trouvé.
 */
export async function playHanziAudio(
  hanzi: string,
  explicitUrl?: string | null
): Promise<HTMLAudioElement> {
  // 1) Élément préchargé ? Joue-le directement.
  const preloaded = preloadedAudios.get(hanzi);
  if (preloaded) {
    try {
      preloaded.currentTime = 0;
      await preloaded.play();
      return preloaded;
    } catch {
      // L'élément préchargé est peut-être consommé ou erroné. On retire
      // et on tombe dans le chemin normal.
      preloadedAudios.delete(hanzi);
    }
  }

  // 2) Résolution via probes parallèles + cache.
  const url = await resolveHanziAudioUrl(hanzi, explicitUrl);
  if (!url) {
    throw new Error(`Aucun fichier audio trouvé pour "${hanzi}"`);
  }

  // 3) Lecture. On met l'élément en cache préchargé pour les clics suivants
  //    sur le même mot (plus rapide qu'un new Audio() à chaque fois).
  const audio = await playResolvedUrl(url);
  rememberPreloaded(hanzi, audio);
  return audio;
}
