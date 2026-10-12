/**
 * URL Shortener client utility.
 * Multi-tier shortening strategy:
 * 1. Call local/deployed /api/shorten endpoint (Vercel Serverless / Vite dev proxy)
 * 2. TinyURL via public CORS gateway (allorigins)
 * 3. clck.ru direct CORS endpoint
 * 4. Graceful fallback to original long URL
 */
export async function shortenUrl(longUrl: string): Promise<string> {
  if (!longUrl || !longUrl.trim()) return '';

  const cleanUrl = longUrl.trim();

  // Tier 1: /api/shorten
  try {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: cleanUrl }),
      signal: AbortSignal.timeout(4500),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.shortUrl && typeof data.shortUrl === 'string' && data.shortUrl.startsWith('http')) {
        return data.shortUrl;
      }
    }
  } catch {
    // Proceed to next tier
  }

  // Tier 2: TinyURL via CORS gateway
  try {
    const tinyUrlTarget = 'https://tinyurl.com/api-create.php?url=' + encodeURIComponent(cleanUrl);
    const res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(tinyUrlTarget), {
      signal: AbortSignal.timeout(4500),
    });
    if (res.ok) {
      const text = (await res.text()).trim();
      if (text.startsWith('http')) {
        return text;
      }
    }
  } catch {
    // Proceed to next tier
  }

  // Tier 3: clck.ru direct CORS
  try {
    const res = await fetch('https://clck.ru/--?url=' + encodeURIComponent(cleanUrl), {
      signal: AbortSignal.timeout(4500),
    });
    if (res.ok) {
      const text = (await res.text()).trim();
      if (text.startsWith('http')) {
        return text;
      }
    }
  } catch {
    // Fallback to original
  }

  return cleanUrl;
}
