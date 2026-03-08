import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

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
    plugins: [react(), createGeminiProxyPlugin(geminiServerKey), createYtCaptionsProxyPlugin()],
    server: {
      port: 5173
    },
    build: {
      chunkSizeWarningLimit: 6000
    }
  };
});
