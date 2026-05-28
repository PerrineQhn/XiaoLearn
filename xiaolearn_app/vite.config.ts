import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const GEMINI_PROXY_PATH = '/api/gemini-proxy';
const YT_CAPTIONS_PROXY_PATH = '/api/yt-captions';

const readRequestBody = async (req: import('http').IncomingMessage) => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf-8');
};

const YT_PREFERRED_LANGS = ['zh-TW', 'zh-Hans', 'zh', 'zh-CN', 'zh-Hant'];

const extractCaptionTracksFromHtml = (html: string): Array<{ lang: string; url: string }> => {
  const match = html.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\});\s*(?:var|const|let|window)/s);
  if (!match) return [];
  try {
    const data = JSON.parse(match[1]) as {
      captions?: {
        playerCaptionsTracklistRenderer?: {
          captionTracks?: Array<{ languageCode?: string; baseUrl?: string }>;
        };
      };
    };
    const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? [];
    return tracks
      .filter((t) => t.languageCode && t.baseUrl)
      .map((t) => ({ lang: t.languageCode!, url: t.baseUrl! }));
  } catch {
    return [];
  }
};

const createYtCaptionsProxyPlugin = () => ({
  name: 'yt-captions-proxy',
  configureServer(server: import('vite').ViteDevServer) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith(YT_CAPTIONS_PROXY_PATH) || req.method !== 'GET') {
        next();
        return;
      }
      try {
        const params = new URL(req.url, 'http://localhost').searchParams;
        const v = params.get('v') ?? '';
        if (!v) { res.statusCode = 400; res.end('Missing v'); return; }

        const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

        // 1. Fetch the watch page to get session cookies + INNERTUBE_API_KEY
        const watchRes = await fetch(`https://www.youtube.com/watch?v=${encodeURIComponent(v)}`, {
          headers: { 'User-Agent': UA, 'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8' }
        });
        if (!watchRes.ok) { res.statusCode = watchRes.status; res.end('Watch page fetch failed'); return; }
        const html = await watchRes.text();

        const setCookies = watchRes.headers.getSetCookie?.() ?? [];
        const cookieHeader = setCookies.map((c: string) => c.split(';')[0]).join('; ');

        // 2. Extraire la clé InnerTube depuis le HTML
        const apiKeyMatch = html.match(/"INNERTUBE_API_KEY":\s*"([a-zA-Z0-9_-]+)"/);
        if (!apiKeyMatch) { res.statusCode = 404; res.end('INNERTUBE_API_KEY not found'); return; }
        const apiKey = apiKeyMatch[1];

        // Return track list if requested (from watch page HTML for quick check)
        if (params.get('list') === '1') {
          const tracks = extractCaptionTracksFromHtml(html);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(tracks));
          return;
        }

        // 3. POST sur /youtubei/v1/player avec client ANDROID (bypass bot detection)
        const playerRes = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': UA,
            'X-YouTube-Client-Name': '3',
            'X-YouTube-Client-Version': '20.10.38',
            ...(cookieHeader ? { 'Cookie': cookieHeader } : {})
          },
          body: JSON.stringify({
            context: { client: { clientName: 'ANDROID', clientVersion: '20.10.38' } },
            videoId: v
          })
        });
        if (!playerRes.ok) { res.statusCode = playerRes.status; res.end('Player API failed'); return; }
        const playerData = await playerRes.json() as {
          captions?: { playerCaptionsTracklistRenderer?: { captionTracks?: Array<{ languageCode?: string; baseUrl?: string }> } }
        };

        const allTracks = (playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? [])
          .filter((t) => t.languageCode && t.baseUrl)
          .map((t) => ({ lang: t.languageCode!, url: t.baseUrl! }));

        const chineseTracks = YT_PREFERRED_LANGS
          .map((lang) => allTracks.find((t) => t.lang === lang || t.lang.startsWith(lang)))
          .filter(Boolean) as Array<{ lang: string; url: string }>;

        if (!chineseTracks.length) { res.statusCode = 404; res.end('No Chinese captions found'); return; }

        // 4. Fetch the best Chinese caption track in json3 format
        for (const track of chineseTracks) {
          const captionUrl = `${track.url}&fmt=json3`;
          const captionRes = await fetch(captionUrl, {
            headers: {
              'User-Agent': UA,
              'Referer': `https://www.youtube.com/watch?v=${v}`,
              ...(cookieHeader ? { 'Cookie': cookieHeader } : {})
            }
          });
          if (!captionRes.ok) continue;
          const text = await captionRes.text();
          if (!text.trim() || text.startsWith('<!')) continue;
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('X-Caption-Lang', track.lang);
          res.end(text);
          return;
        }

        res.statusCode = 404;
        res.end('No Chinese captions content');
      } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'YT captions proxy failure', detail: error instanceof Error ? error.message : String(error) }));
      }
    });
  }
});

const createGeminiProxyPlugin = (apiKey: string) => ({
  name: 'gemini-proxy',
  configureServer(server: import('vite').ViteDevServer) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url !== GEMINI_PROXY_PATH || req.method !== 'POST') {
        next();
        return;
      }

      if (!apiKey) {
        res.statusCode = 503;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Gemini proxy key missing' }));
        return;
      }

      try {
        const raw = await readRequestBody(req);
        const payload = JSON.parse(raw) as {
          model?: string;
          body?: unknown;
        };

        const model = (payload.model || '').trim();
        if (!model || !/^[a-zA-Z0-9._-]+$/.test(model)) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Invalid model' }));
          return;
        }

        const upstream = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload.body || {})
          }
        );

        const text = await upstream.text();
        res.statusCode = upstream.status;
        res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
        res.end(text);
      } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            error: 'Gemini proxy failure',
            detail: error instanceof Error ? error.message : String(error)
          })
        );
      }
    });
  }
});

const chunkNameForModule = (id: string): string | undefined => {
  if (id.includes('/node_modules/')) {
    if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
      return 'vendor-react';
    }
    if (id.includes('/firebase/') || id.includes('/@firebase/')) {
      return 'vendor-firebase';
    }
    // (recharts/d3 retirés : la dep recharts a été supprimée — son seul
    // consommateur LearningProgressChart.tsx était orphelin.)
    if (id.includes('/pinyin-pro/')) {
      return 'vendor-language';
    }
    // opencc-js : isolé dans son propre chunk car uniquement consommé par
    // CPlayerPage qui est désormais lazy-loadé.
    if (id.includes('/opencc-js/')) {
      return 'vendor-opencc';
    }
    // (@xenova/transformers a été déplacé en devDependency : utilisé
    // uniquement par les scripts Node de build, jamais shippé au browser.
    // Le chunk vendor-transformers est donc devenu obsolète.)
    return 'vendor';
  }

  const hskJsonMatch = id.match(/\/data\/(hsk[1-7])\.json$/);
  if (hskJsonMatch) {
    return `data-${hskJsonMatch[1]}`;
  }

  // Keep application modules in Rollup's default chunk. Several data/page files
  // intentionally mutate shared CECR structures at module load, so splitting
  // them by folder can expose circular initialization order in production.
  return undefined;
};

export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement depuis .env.local ou .env.production
  const env = loadEnv(mode, process.cwd(), '');

  // Priorité : process.env (GitHub Actions) > fichiers .env (local)
  const useCustomDomain = process.env.VITE_USE_CUSTOM_DOMAIN || env.VITE_USE_CUSTOM_DOMAIN;
  const geminiServerKey =
    process.env.GEMINI_API_KEY_SERVER ||
    process.env.GEMINI_API_KEY ||
    env.GEMINI_API_KEY_SERVER ||
    env.GEMINI_API_KEY ||
    env.VITE_GEMINI_API_KEY;

  return {
    // Utiliser '/' pour domaine personnalisé, '/XiaoLearn/' pour GitHub Pages sans domaine
    base: useCustomDomain === 'true' ? '/' : '/XiaoLearn/',
    plugins: [
      react(),
      createGeminiProxyPlugin(geminiServerKey),
      createYtCaptionsProxyPlugin(),
      VitePWA({
        // Le service worker remplace automatiquement le précédent (skipWaiting)
        // → l'utilisateur a toujours la dernière version sans devoir vider son
        // cache à la main.
        registerType: 'autoUpdate',
        // Notre manifest est servi en /manifest.webmanifest (cf. index.html).
        // Le plugin va le réécrire en y injectant les icônes générées + les
        // overrides de configuration ci-dessous.
        manifestFilename: 'manifest.webmanifest',
        includeAssets: [
          'logos/logo_court.png',
          'logos/logo_long.png',
          'profs/professeur_xiao_profil.png'
        ],
        manifest: {
          name: 'XiaoLearn — Apprendre le chinois',
          short_name: 'XiaoLearn',
          description:
            "Apprendre le mandarin du A1 jusqu'au courant : leçons structurées, flashcards, prononciation et écriture des hanzi.",
          theme_color: '#E05040',
          background_color: '#fffaf3',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          lang: 'fr',
          icons: [
            {
              src: '/logos/logo_court.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/logos/logo_court.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/logos/logo_court.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        },
        workbox: {
          // Précache l'app shell + assets critiques au build.
          globPatterns: ['**/*.{js,css,html,svg,woff2}'],
          // Plafond par fichier à 10 Mo pour éviter de précacher d'énormes
          // JSON HSK qui sont déjà chunkés à la demande.
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
          // Empêche le SPA navigateFallback (index.html) de manger les URLs
          // d'assets statiques. Si on tape https://.../img/announcements/foo.png
          // dans la barre d'adresse, on doit voir l'image — pas la home.
          navigateFallbackDenylist: [
            /^\/img\//,
            /^\/audio\//,
            /^\/logos\//,
            /^\/icons\//,
            /^\/profs\//,
            /^\/data\//,
            /\.(png|jpg|jpeg|webp|gif|svg|mp3|wav|ogg|json|webmanifest)$/i
          ],
          runtimeCaching: [
            // 1. Logos / icônes / images d'annonces : cache-first (rarement
            //    mis à jour, gros gain au reload).
            {
              urlPattern: /\/(logos|icons|profs|img)\/.*\.(png|svg|jpg|jpeg|webp)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'xl-static-images',
                expiration: { maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 }
              }
            },
            // 2. Audios MP3/WAV : cache-first sur l'origin (Cloudflare R2).
            //    Important pour pouvoir réviser hors-ligne.
            {
              urlPattern: /\.(mp3|wav|ogg)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'xl-audio',
                expiration: { maxEntries: 500, maxAgeSeconds: 60 * 24 * 60 * 60 }
              }
            },
            // 3. JSON HSK : stale-while-revalidate (rapide ET à jour si possible)
            {
              urlPattern: /\/(data|hsk)\/.*\.json$/,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'xl-data-json',
                expiration: { maxEntries: 100, maxAgeSeconds: 14 * 24 * 60 * 60 }
              }
            },
            // 4. Hanzi Writer character data (CDN externe). On laisse le CDN
            //    gérer son cache HTTP, on stocke juste pour offline.
            {
              urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/npm\/hanzi-writer-data/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'xl-hanzi-writer-data',
                expiration: { maxEntries: 2000, maxAgeSeconds: 90 * 24 * 60 * 60 }
              }
            }
          ],
          // Skip le précache des très gros fichiers HSK7 pour ne pas exploser
          // les budgets de cache lors du premier load (chargés à la demande).
          globIgnores: ['**/data/hsk7*.{js,json}', '**/data-hsk7-*.{js,json}']
        },
        // Désactive le SW en dev pour éviter de cacher du code à hot-reload.
        devOptions: {
          enabled: false
        }
      })
    ],
    server: {
      port: 5173
    },
    build: {
      // The largest unavoidable static modules are hsk7.json (~6.1 MB) and the
      // app shell (~6.5 MB after keeping CECR modules together to avoid circular
      // initialization bugs). Keep the warning close to those known baselines.
      chunkSizeWarningLimit: 6600,
      rollupOptions: {
        output: {
          manualChunks: chunkNameForModule
        }
      }
    }
  };
});
