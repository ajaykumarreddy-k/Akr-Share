export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<Response> {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  let targetUrl = '';
  if (request.method === 'POST') {
    try {
      const body = (await request.json()) as { url?: string };
      targetUrl = body?.url || '';
    } catch {
      targetUrl = '';
    }
  } else {
    try {
      const { searchParams } = new URL(request.url);
      targetUrl = searchParams.get('url') || '';
    } catch {
      targetUrl = '';
    }
  }

  if (!targetUrl || !targetUrl.trim()) {
    return new Response(JSON.stringify({ error: 'Missing or invalid URL' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  targetUrl = targetUrl.trim();

  // Tier 1: TinyURL API
  try {
    const res = await fetch(
      'https://tinyurl.com/api-create.php?url=' + encodeURIComponent(targetUrl),
      { signal: AbortSignal.timeout(4500) }
    );
    if (res.ok) {
      const text = (await res.text()).trim();
      if (text.startsWith('http')) {
        return new Response(JSON.stringify({ shortUrl: text, service: 'tinyurl' }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }
  } catch (err) {
    console.warn('TinyURL failed:', err);
  }

  // Tier 2: is.gd API
  try {
    const res = await fetch(
      'https://is.gd/create.php?format=simple&url=' + encodeURIComponent(targetUrl),
      { signal: AbortSignal.timeout(4500) }
    );
    if (res.ok) {
      const text = (await res.text()).trim();
      if (text.startsWith('http')) {
        return new Response(JSON.stringify({ shortUrl: text, service: 'is.gd' }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }
  } catch (err) {
    console.warn('is.gd failed:', err);
  }

  // Tier 3: clck.ru API
  try {
    const res = await fetch(
      'https://clck.ru/--?url=' + encodeURIComponent(targetUrl),
      { signal: AbortSignal.timeout(4500) }
    );
    if (res.ok) {
      const text = (await res.text()).trim();
      if (text.startsWith('http')) {
        return new Response(JSON.stringify({ shortUrl: text, service: 'clck.ru' }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }
  } catch (err) {
    console.warn('clck.ru failed:', err);
  }

  // Fallback: return the original URL
  return new Response(JSON.stringify({ shortUrl: targetUrl, service: 'direct' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
