/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Automatically removes comments from HTML, CSS, and JS to minimize payload size.
 * Preserves URLs (http://, https://) and conditional comments.
 */
export function stripComments(code: string): string {
  if (!code) return '';

  // 1. Remove HTML comments <!-- ... --> (preserve IE conditionals)
  let clean = code.replace(/<!--(?!\[if[\s\S]+?\]>)([\s\S]*?)-->/g, '');

  // 2. Remove CSS/JS block comments /* ... */
  clean = clean.replace(/\/\*[\s\S]*?\*\//g, '');

  // 3. Remove single-line JS comments // ... (protecting http://, https://)
  clean = clean
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('//')) return '';
      const idx = line.indexOf('//');
      if (idx > -1) {
        const before = line.slice(0, idx);
        if (/https?:$/.test(before.trim())) return line;
        const singleQuotes = (before.match(/'/g) || []).length;
        const doubleQuotes = (before.match(/"/g) || []).length;
        const backticks = (before.match(/`/g) || []).length;
        if (singleQuotes % 2 === 0 && doubleQuotes % 2 === 0 && backticks % 2 === 0) {
          return line.slice(0, idx).trimEnd();
        }
      }
      return line;
    })
    .filter((line) => line.trim().length > 0)
    .join('\n');

  return clean;
}

/**
 * Compress -> URL-safe base64 using CompressionStream('deflate-raw')
 * Includes chunked buffer conversion to safely handle large documents without call-stack limits.
 */
export async function pack(str: string): Promise<string> {
  const s = new Blob([str]).stream().pipeThrough(new CompressionStream('deflate-raw'));
  const b = new Uint8Array(await new Response(s).arrayBuffer());

  let bin = '';
  const CHUNK_SIZE = 0x8000;
  for (let i = 0; i < b.length; i += CHUNK_SIZE) {
    bin += String.fromCharCode.apply(
      null,
      b.subarray(i, Math.min(i + CHUNK_SIZE, b.length)) as unknown as number[]
    );
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decompress URL-safe base64 using DecompressionStream('deflate-raw')
 * Gracefully falls back to legacy formats if string was packed with older methods.
 */
export async function unpack(t: string): Promise<string> {
  if (!t) return '';
  const clean = (t.startsWith('z~') ? t.slice(2) : t).replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(clean + '='.repeat((4 - (clean.length % 4)) % 4));
  const b = Uint8Array.from(bin, (c) => c.charCodeAt(0));

  // 1. Try DecompressionStream('deflate-raw')
  try {
    const s = new Blob([b]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return await new Response(s).text();
  } catch {
    // 2. Try DecompressionStream('deflate')
    try {
      const s = new Blob([b]).stream().pipeThrough(new DecompressionStream('deflate'));
      return await new Response(s).text();
    } catch {
      // 3. Fallback to uncompressed UTF-8
      return new TextDecoder().decode(b);
    }
  }
}

/**
 * Wrapper for backward compatibility with existing components
 */
export const encodePaste = pack;
export const decodePaste = unpack;

/**
 * Fetches cloud paste content by short ID (#p=ID or #id=ID)
 */
export async function fetchCloudPaste(id: string): Promise<string | null> {
  if (!id) return null;

  // 1. Try local/deployed /api/paste
  try {
    const res = await fetch(`/api/paste?id=${encodeURIComponent(id)}`, {
      signal: AbortSignal.timeout(6000),
    });
    if (res.ok) {
      return await res.text();
    }
  } catch {}

  // 2. Try dpaste via CORS gateway
  try {
    const res = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://dpaste.org/${id}/raw`)}`,
      { signal: AbortSignal.timeout(6000) }
    );
    if (res.ok) {
      return await res.text();
    }
  } catch {}

  // 3. Try paste.rs via CORS gateway
  try {
    const res = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://paste.rs/${id}`)}`,
      { signal: AbortSignal.timeout(6000) }
    );
    if (res.ok) {
      return await res.text();
    }
  } catch {}

  return null;
}

/**
 * Stores large content as a cloud paste to guarantee an ultra-short permalink
 */
export async function storeCloudPaste(content: string): Promise<string | null> {
  try {
    const res = await fetch('/api/paste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
      signal: AbortSignal.timeout(6000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.id) {
        return data.id;
      }
    }
  } catch {}
  return null;
}
