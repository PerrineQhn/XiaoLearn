/**
 * blog-views.ts — Compteur de vues réel pour les articles de blog
 * ----------------------------------------------------------------
 * Backend : Firestore via API REST publique (zéro dépendance, zéro auth).
 *
 * Collection : `blog_views/{slug}` avec un champ `count` (integerValue).
 *
 * Stratégie :
 *   - À l'ouverture d'un article (mode `track`) : on commit un fieldTransform
 *     `increment(1)` sur le doc — atomique, gérée par Firestore. Si le doc
 *     n'existe pas, on le crée d'abord avec count=0 puis on incrémente.
 *   - Sur la page hub (mode `read`) : on read tous les docs en parallèle.
 *
 * Anti-spam :
 *   - sessionStorage `xl_blog_seen_{slug}` : 1 incrément max par session
 *     navigateur. Pas parfait (un user qui ouvre 2 onglets compte 2 fois)
 *     mais largement suffisant contre les rafraîchissements répétés.
 *
 * Sécurité :
 *   - L'API REST de Firestore nécessite que les règles autorisent les writes
 *     anonymes sur cette collection (voir firestore.rules). On valide côté
 *     règles que delta == +1 pour empêcher le spam serveur.
 *
 * Config :
 *   - PUBLIC_FIREBASE_PROJECT_ID (ex: xiaolearn-db9e6) — requis
 *   - PUBLIC_FIREBASE_API_KEY — requis pour l'auth API REST
 */

const PROJECT_ID = import.meta.env.PUBLIC_FIREBASE_PROJECT_ID as string | undefined;
const API_KEY = import.meta.env.PUBLIC_FIREBASE_API_KEY as string | undefined;

const SESSION_PREFIX = 'xl_blog_seen_';
const COLLECTION = 'blog_views';

const isConfigured = (): boolean => Boolean(PROJECT_ID && API_KEY);

const docUrl = (slug: string): string =>
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}/${encodeURIComponent(slug)}?key=${API_KEY}`;

const commitUrl = (): string =>
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:commit?key=${API_KEY}`;

const docName = (slug: string): string =>
  `projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}/${slug}`;

const alreadySeenThisSession = (slug: string): boolean => {
  try {
    return window.sessionStorage.getItem(SESSION_PREFIX + slug) === '1';
  } catch {
    return false;
  }
};

const markSeenThisSession = (slug: string): void => {
  try {
    window.sessionStorage.setItem(SESSION_PREFIX + slug, '1');
  } catch {
    /* ignore */
  }
};

/**
 * Lit le compteur d'un slug. Retourne 0 si le doc n'existe pas, null en cas d'erreur.
 */
export const readViewCount = async (slug: string): Promise<number | null> => {
  if (!isConfigured()) return null;
  try {
    const res = await fetch(docUrl(slug));
    if (res.status === 404) return 0;
    if (!res.ok) return null;
    const data = await res.json();
    const v = data?.fields?.count?.integerValue;
    return v !== undefined ? Number(v) : 0;
  } catch (err) {
    console.warn('[blog-views] readViewCount', slug, err);
    return null;
  }
};

/**
 * Incrémente atomiquement le compteur de +1 via fieldTransform.increment.
 * Si le doc n'existe pas, on le crée d'abord avec count=0 puis on incrémente.
 */
const incrementOne = async (slug: string): Promise<number | null> => {
  if (!isConfigured()) return null;
  try {
    // On vérifie d'abord si le doc existe — si non, on le crée à 0
    const headRes = await fetch(docUrl(slug));
    if (headRes.status === 404) {
      // Create avec count=0
      await fetch(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}?documentId=${encodeURIComponent(slug)}&key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: { count: { integerValue: '0' }, slug: { stringValue: slug } }
          })
        }
      );
    }

    // Commit avec fieldTransform increment(1)
    const res = await fetch(commitUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        writes: [
          {
            transform: {
              document: docName(slug),
              fieldTransforms: [
                { fieldPath: 'count', increment: { integerValue: '1' } }
              ]
            }
          }
        ]
      })
    });
    if (!res.ok) {
      console.warn('[blog-views] commit failed', await res.text());
      return null;
    }
    // Re-lit la valeur fraîche
    return readViewCount(slug);
  } catch (err) {
    console.warn('[blog-views] incrementOne', slug, err);
    return null;
  }
};

/**
 * Track une vue (incrémente puis renvoie le compte). Sans effet si la
 * session a déjà vu cet article.
 */
export const trackBlogView = async (slug: string): Promise<number | null> => {
  if (alreadySeenThisSession(slug)) {
    return readViewCount(slug);
  }
  markSeenThisSession(slug);
  return incrementOne(slug);
};

/** Lit les compteurs de plusieurs articles en parallèle. */
export const readViewCounts = async (
  slugs: string[]
): Promise<Record<string, number>> => {
  const entries = await Promise.all(
    slugs.map(async (slug) => [slug, (await readViewCount(slug)) ?? 0] as const)
  );
  return Object.fromEntries(entries);
};

/**
 * Bind automatique aux éléments [data-views-slug]. Si `[data-views-track]`
 * est aussi présent → incrémente. Sinon → lit seulement.
 */
export const bindViewCounters = async (): Promise<void> => {
  if (typeof document === 'undefined') return;
  if (!isConfigured()) return;

  const trackEls = Array.from(
    document.querySelectorAll<HTMLElement>('[data-views-slug][data-views-track]')
  );
  const readOnlyEls = Array.from(
    document.querySelectorAll<HTMLElement>('[data-views-slug]:not([data-views-track])')
  );

  // 1) On track (incrémente) les articles ouverts
  for (const el of trackEls) {
    const slug = el.dataset.viewsSlug!;
    const count = await trackBlogView(slug);
    if (count !== null) el.textContent = String(count);
  }

  // 2) On lit en parallèle les compteurs de la liste
  if (readOnlyEls.length > 0) {
    const slugs = Array.from(new Set(readOnlyEls.map((el) => el.dataset.viewsSlug!)));
    const counts = await readViewCounts(slugs);
    readOnlyEls.forEach((el) => {
      const slug = el.dataset.viewsSlug!;
      if (counts[slug] !== undefined) el.textContent = String(counts[slug]);
    });
  }
};

// Auto-bind au DOMContentLoaded
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => bindViewCounters());
  } else {
    bindViewCounters();
  }
}
