import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function shortenApiPlugin(): Plugin {
  return {
    name: 'shorten-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // 1. /api/paste handler
        if (req.url?.startsWith('/api/paste')) {
          if (req.method === 'GET') {
            const urlObj = new URL(req.url, 'http://localhost');
            const id = urlObj.searchParams.get('id');
            if (!id) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing id' }));
              return;
            }
            try {
              const r = await fetch(`https://dpaste.org/${id}/raw`);
              if (r.ok) {
                const text = await r.text();
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end(text);
                return;
              }
            } catch {}
            try {
              const r = await fetch(`https://paste.rs/${id}`);
              if (r.ok) {
                const text = await r.text();
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end(text);
                return;
              }
            } catch {}
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Paste not found' }));
            return;
          }

          if (req.method === 'POST') {
            let bodyStr = '';
            req.on('data', (c) => (bodyStr += c));
            req.on('end', async () => {
              try {
                const { content } = JSON.parse(bodyStr || '{}');
                if (!content) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Empty content' }));
                  return;
                }
                const formData = new URLSearchParams();
                formData.append('content', content);
                formData.append('expiry_days', '365');
                const r = await fetch('https://dpaste.org/api/', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: formData.toString(),
                });
                if (r.ok) {
                  const urlStr = (await r.text()).trim().replace(/^"|"$/g, '');
                  const id = urlStr.split('/').filter(Boolean).pop();
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ id, provider: 'dpaste', url: urlStr }));
                  return;
                }
              } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: String(e) }));
              }
            });
            return;
          }
        }

        // 2. /api/shorten handler
        if (req.url?.startsWith('/api/shorten')) {
          if (req.method === 'POST') {
            let bodyStr = '';
            req.on('data', (chunk) => {
              bodyStr += chunk;
            });
            req.on('end', async () => {
              try {
                const body = JSON.parse(bodyStr || '{}');
                const targetUrl = body.url;
                if (!targetUrl) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Missing url' }));
                  return;
                }

                // Rewrite localhost to production URL so TinyURL never creates a preview interstitial
                let publicUrl = targetUrl;
                if (/^https?:\/\/localhost(:\d+)?/i.test(publicUrl)) {
                  publicUrl = publicUrl.replace(/^https?:\/\/localhost(:\d+)?/i, 'https://akr-share.vercel.app');
                }

                // Call TinyURL
                try {
                  const r = await fetch(
                    'https://tinyurl.com/api-create.php?url=' + encodeURIComponent(publicUrl)
                  );
                  if (r.ok) {
                    const shortUrl = (await r.text()).trim();
                    if (shortUrl.startsWith('http')) {
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ shortUrl, service: 'tinyurl' }));
                      return;
                    }
                  }
                } catch {}

                // Fallback clck.ru
                try {
                  const r = await fetch(
                    'https://clck.ru/--?url=' + encodeURIComponent(publicUrl)
                  );
                  if (r.ok) {
                    const shortUrl = (await r.text()).trim();
                    if (shortUrl.startsWith('http')) {
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ shortUrl, service: 'clck.ru' }));
                      return;
                    }
                  }
                } catch {}

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ shortUrl: targetUrl, service: 'direct' }));
              } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: String(e) }));
              }
            });
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), shortenApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
