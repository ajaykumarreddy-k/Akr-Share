import { deflateSync, inflateSync, strToU8, strFromU8 } from 'fflate';

/**
 * Fast, chunked conversion of Uint8Array to URL-safe Base64 string.
 * Uses 32KB chunks to prevent call-stack overflows on large documents.
 */
const uint8ToBase64Url = (bytes: Uint8Array): string => {
  let bin = '';
  const len = bytes.length;
  const CHUNK_SIZE = 0x8000;
  for (let i = 0; i < len; i += CHUNK_SIZE) {
    bin += String.fromCharCode.apply(
      null,
      bytes.subarray(i, Math.min(i + CHUNK_SIZE, len)) as unknown as number[]
    );
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/**
 * Fast conversion of URL-safe Base64 string to Uint8Array.
 */
const base64UrlToUint8 = (str: string): Uint8Array => {
  const clean = str.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(clean + '='.repeat((4 - (clean.length % 4)) % 4));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
};

/**
 * Encodes code into an ultra-compact URL-safe permalink fragment.
 * Uses Deflate (level 9) compression to drastically reduce shared URL length (60-85% smaller).
 * Falls back to raw encoding only if compressed output happens to be larger.
 */
export const encodePaste = (s: string): string => {
  const rawBytes = strToU8(s);
  
  // Deflate with maximum compression (level 9)
  const compressedBytes = deflateSync(rawBytes, { level: 9 });

  // Use compressed version with 'z~' prefix if it is actually smaller
  if (compressedBytes.length < rawBytes.length) {
    return 'z~' + uint8ToBase64Url(compressedBytes);
  }

  // Otherwise, use uncompressed
  return uint8ToBase64Url(rawBytes);
};

/**
 * Decodes permalink payload back into string.
 * Supports:
 * 1. New ultra-compact Deflate payloads ('z~...')
 * 2. Legacy uncompressed UTF-8 Base64URL payloads (100% backward compatible)
 */
export const decodePaste = (s: string): string => {
  if (!s) return '';

  // 1. Compressed payload (starts with 'z~')
  if (s.startsWith('z~')) {
    const bytes = base64UrlToUint8(s.slice(2));
    const decompressed = inflateSync(bytes);
    return strFromU8(decompressed);
  }

  // 2. Legacy uncompressed UTF-8 payload (or auto-detect compressed fallback)
  const bytes = base64UrlToUint8(s);
  try {
    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return decoded;
  } catch {
    // If not valid UTF-8, attempt inflation as fallback
    try {
      const decompressed = inflateSync(bytes);
      return strFromU8(decompressed);
    } catch {
      return new TextDecoder().decode(bytes);
    }
  }
};
