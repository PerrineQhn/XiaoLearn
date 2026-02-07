export const resolveAudioSrc = (src: string): string => {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) {
    return src;
  }
  const trimmed = src.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${trimmed}`;
};

