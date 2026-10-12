export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<Response> {
  // CORS Preflight
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

  // GET: Fetch raw paste by ID
  if (request.method === 'GET') {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id parameter' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Race providers concurrently using Promise.any for sub-second retrieval
    const fetchDpaste = async () => {
      const res = await fetch(`https://dpaste.org/${id}/raw`, {
        signal: AbortSignal.timeout(3500),
      });
      if (res.ok) {
        const text = await res.text();
        if (text && !text.includes('<!DOCTYPE html>') && text.trim().length > 0) {
          return text;
        }
      }
      throw new Error('dpaste miss');
    };

    const fetchPasteRs = async () => {
      const res = await fetch(`https://paste.rs/${id}`, {
        signal: AbortSignal.timeout(3500),
      });
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim().length > 0) {
          return text;
        }
      }
      throw new Error('paste.rs miss');
    };

    try {
      const text = await Promise.any([fetchDpaste(), fetchPasteRs()]);
      return new Response(text, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          // Edge cache for 7 days so repeated visits resolve instantly in ~15ms from CDN
          'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
        },
      });
    } catch {
      return new Response(JSON.stringify({ error: 'Paste not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }

  // POST: Create a new cloud paste
  if (request.method === 'POST') {
    let content = '';
    try {
      const body = (await request.json()) as { content?: string };
      content = body?.content || '';
    } catch {
      content = '';
    }

    if (!content || !content.trim()) {
      return new Response(JSON.stringify({ error: 'Content is empty' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // 1. Try dpaste.org (1 year retention)
    try {
      const formData = new URLSearchParams();
      formData.append('content', content);
      formData.append('expiry_days', '365');

      const res = await fetch('https://dpaste.org/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
        body: formData.toString(),
        signal: AbortSignal.timeout(6000),
      });

      if (res.ok) {
        const urlStr = (await res.text()).trim().replace(/^"|"$/g, '');
        const id = urlStr.split('/').filter(Boolean).pop();
        if (id) {
          return new Response(JSON.stringify({ id, provider: 'dpaste', url: urlStr }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }
      }
    } catch (err) {
      console.warn('dpaste.org create failed:', err);
    }

    // 2. Try paste.rs fallback
    try {
      const res = await fetch('https://paste.rs', {
        method: 'POST',
        headers: { 'User-Agent': 'curl/7.68.0' },
        body: content,
        signal: AbortSignal.timeout(6000),
      });

      if (res.ok) {
        const urlStr = (await res.text()).trim();
        const id = urlStr.split('/').filter(Boolean).pop();
        if (id) {
          return new Response(JSON.stringify({ id, provider: 'pasters', url: urlStr }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }
      }
    } catch (err) {
      console.warn('paste.rs create failed:', err);
    }

    return new Response(JSON.stringify({ error: 'Could not store paste' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  return new Response('Method not allowed', { status: 405 });
}
