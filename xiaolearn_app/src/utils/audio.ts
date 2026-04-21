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

export const playAudioWithFallback = async (src: string): Promise<HTMLAudioElement> => {
  let lastError: unknown = null;
  for (const candidate of getAudioSrcCandidates(src)) {
    const audio = new Audio(candidate);
    try {
      await audio.play();
      return audio;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error('Audio playback failed');
};

// ---------------------------------------------------------------------------
// playHanziAudio : TTS 100% MP3/WAV (pas de Web Speech)
// ---------------------------------------------------------------------------
//
// Règle métier : tous les audios du site doivent être reliés à un fichier
// MP3/WAV pré-enregistré (Azure TTS). On a ~5000 fichiers WAV dans
// /public/audio/hsk{1..7}/ nommés selon la convention `hsk{N}_{hanzi}.wav`
// et `hsk-7-9_{hanzi}.wav` pour HSK 7-9 avancé.
//
// Cette fonction :
//   1. Si `explicitUrl` est fourni (ex. StudyCard.audio / WOTD.audio) → tente ça.
//   2. Sinon, énumère les conventions connues et tente chaque URL dans l'ordre :
//      - hsk1..hsk7, puis hsk-7-9 (pour le niveau avancé C1/C2).
//   3. Silencieux si tout échoue (pas de synthèse vocale bancale Chrome).

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

// Cache runtime : hanzi → URL trouvée (évite de réessayer 10 URLs à chaque
// clic sur le même mot). Une fois un fichier trouvé, on le réutilise direct.
const hanziAudioCache = new Map<string, string>();

/**
 * Joue l'audio d'un hanzi depuis un fichier MP3/WAV pré-enregistré.
 * Ne tombe JAMAIS sur Web Speech (voulu : UX cohérente Chrome / Safari).
 *
 * @returns Promise résolue quand la lecture a démarré, rejetée si aucun
 *          fichier trouvé (le caller peut alors afficher une indication).
 */
export async function playHanziAudio(
  hanzi: string,
  explicitUrl?: string | null
): Promise<HTMLAudioElement> {
  // 1) URL explicite si fournie.
  if (explicitUrl) {
    try {
      return await playAudioWithFallback(explicitUrl);
    } catch {
      // On continue vers les conventions.
    }
  }
  // 2) Cache : URL déjà trouvée lors d'une invocation précédente.
  const cached = hanziAudioCache.get(hanzi);
  if (cached) {
    try {
      return await playAudioWithFallback(cached);
    } catch {
      hanziAudioCache.delete(hanzi);
    }
  }
  // 3) Pour les PHRASES (> 3 caractères), on tente d'abord le dossier
  //    `audio/examples/` généré à partir des blocs `examples:[...]` des leçons.
  //    Le nom de fichier est un hash déterministe du hanzi — mêmes règles que
  //    le script generate-all-audio.mjs côté Node.
  const cleanHanzi = hanzi.replace(/\d+$/, '').trim();
  if (cleanHanzi.length > 3) {
    const exampleUrl = getExampleAudioUrl(cleanHanzi);
    try {
      const el = await playAudioWithFallback(exampleUrl);
      hanziAudioCache.set(hanzi, exampleUrl);
      return el;
    } catch {
      // Pas d'exemple généré pour ce hanzi — on continue vers les conventions.
    }
  }
  // 4) Conventions HSK.
  let lastError: unknown = null;
  for (const build of HANZI_AUDIO_CONVENTIONS) {
    const candidate = build(hanzi);
    try {
      const el = await playAudioWithFallback(candidate);
      hanziAudioCache.set(hanzi, candidate);
      return el;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error(`Aucun fichier audio trouvé pour "${hanzi}"`);
}
