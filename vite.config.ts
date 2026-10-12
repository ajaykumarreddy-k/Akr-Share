import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function shortenApiPlugin(): Plugin {
  return {
    name: 'shorten-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
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

                // Call TinyURL
                try {
                  const r = await fetch(
                    'https://tinyurl.com/api-create.php?url=' + encodeURIComponent(targetUrl)
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
                    'https://clck.ru/--?url=' + encodeURIComponent(targetUrl)
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
