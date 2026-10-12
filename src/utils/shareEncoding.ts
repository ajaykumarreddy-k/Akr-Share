/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// UTF-8 safe base64url encoding and decoding as provided in user's specification
export const encodePaste = (s: string): string => {
  const b = new TextEncoder().encode(s);
  let bin = '';
  b.forEach((x) => (bin += String.fromCharCode(x)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const decodePaste = (s: string): string => {
  const clean = s.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(clean + '='.repeat((4 - (clean.length % 4)) % 4));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
};
