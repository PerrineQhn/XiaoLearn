const DEFAULT_AUDIO_CDN_BASE =
  'https://cdn.jsdelivr.net/gh/PerrineQhn/XiaoLearn@main/xiaolearn_app/public';

const normalizeRelativePath = (src: string) => src.replace(/^\/+/, '');

const withAlternateExtension = (src: string): string[] => {
  const variants = [src];
  if (src.endsWith('.wav')) variants.push(src.slice(0, -4) + '.mp3');
  if (src.endsWith('.mp3')) variants.push(src.slice(0, -4) + '.wav');
  return variants;
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
