export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapIndexItem {
  loc: string;
  lastmod?: string;
}

export const DEFAULT_SITE = 'https://xiaolearn.com';

export function getBaseUrl(site?: URL): string {
  return site?.toString() || DEFAULT_SITE;
}

export function toAbsoluteUrl(base: string, path: string): string {
  return new URL(path, base).toString();
}

export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function renderSitemapXml(urls: SitemapUrl[]): string {
  const xmlUrls = urls
    .map((url) => {
      const parts = [`<loc>${escapeXml(url.loc)}</loc>`];
      if (url.lastmod) parts.push(`<lastmod>${escapeXml(url.lastmod)}</lastmod>`);
      if (url.changefreq) parts.push(`<changefreq>${url.changefreq}</changefreq>`);
      if (typeof url.priority === 'number') parts.push(`<priority>${url.priority.toFixed(1)}</priority>`);
      return `  <url>${parts.join('')}</url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

export function renderSitemapIndexXml(items: SitemapIndexItem[]): string {
  const xmlItems = items
    .map((item) => {
      const parts = [`<loc>${escapeXml(item.loc)}</loc>`];
      if (item.lastmod) parts.push(`<lastmod>${escapeXml(item.lastmod)}</lastmod>`);
      return `  <sitemap>${parts.join('')}</sitemap>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</sitemapindex>`;
}
