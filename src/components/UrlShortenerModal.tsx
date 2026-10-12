/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, Scissors, Sparkles, X, Loader2 } from 'lucide-react';
import { shortenUrl } from '../utils/urlShortener';

interface UrlShortenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePermalink: string;
  onToast: (msg: string) => void;
}

export const UrlShortenerModal: React.FC<UrlShortenerModalProps> = ({
  isOpen,
  onClose,
  activePermalink,
  onToast,
}) => {
  const [activeShortUrl, setActiveShortUrl] = useState<string>('');
  const [isActiveLoading, setIsActiveLoading] = useState<boolean>(false);
  const [copiedActive, setCopiedActive] = useState<boolean>(false);

  // Custom URL shortening
  const [customInput, setCustomInput] = useState<string>('');
  const [customShortUrl, setCustomShortUrl] = useState<string>('');
  const [isCustomLoading, setIsCustomLoading] = useState<boolean>(false);
  const [copiedCustom, setCopiedCustom] = useState<boolean>(false);

  // Automatically shorten the active permalink when modal opens
  useEffect(() => {
    if (isOpen && activePermalink) {
      setIsActiveLoading(true);
      shortenUrl(activePermalink)
        .then((short) => {
          setActiveShortUrl(short);
        })
        .finally(() => {
          setIsActiveLoading(false);
        });
    }
  }, [isOpen, activePermalink]);

  if (!isOpen) return null;

  const copyToClipboard = async (text: string, isCustom = false) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isCustom) {
        setCopiedCustom(true);
        setTimeout(() => setCopiedCustom(false), 2000);
      } else {
        setCopiedActive(true);
        setTimeout(() => setCopiedActive(false), 2000);
      }
      onToast('Short link copied to clipboard');
    } catch {
      prompt('Copy this short link:', text);
    }
  };

  const handleShortenCustom = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customInput.trim()) return;

    setIsCustomLoading(true);
    setCustomShortUrl('');
    try {
      const short = await shortenUrl(customInput.trim());
      setCustomShortUrl(short);
      onToast('URL shortened successfully!');
    } catch {
      onToast('Failed to shorten URL');
    } finally {
      setIsCustomLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241813]/40 backdrop-blur-xs animate-in fade-in duration-150 select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl border border-[#007AFF]/25 shadow-2xl overflow-hidden flex flex-col text-[#241813]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#007AFF]/15 bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF]">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-[#241813] flex items-center gap-2">
                <span>URL Shortener</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#007AFF] text-white">
                  instant tiny links
                </span>
              </h2>
              <p className="text-[11px] font-mono text-[#241813]/60">
                Turn giant permalinks into clean, pocket-sized share URLs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#241813]/15 flex items-center justify-center text-[#241813]/60 hover:text-[#241813] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Section 1: Current Paste Short Links */}
          <div className="bg-[#F8FAFC] border border-[#007AFF]/20 rounded-2xl p-4.5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#007AFF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Active Paste Links
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Direct 0s Redirect
              </span>
            </div>

            {/* Direct Instant Link (Bypasses all 3rd-party preview screens) */}
            {activePermalink ? (
              <div className="space-y-2">
                <div className="text-[11px] font-mono font-semibold text-[#241813] flex items-center justify-between">
                  <span>Direct Short Link (Instant — No Countdown)</span>
                  <span className="text-[#007AFF] font-bold">{activePermalink.length} chars</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-[#007AFF]/30 rounded-xl p-2.5 shadow-xs">
                  <input
                    type="text"
                    readOnly
                    value={activePermalink}
                    className="flex-1 bg-transparent border-0 text-xs sm:text-sm font-mono text-[#007AFF] font-bold focus:outline-hidden truncate"
                  />
                  <a
                    href={activePermalink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg border border-[#007AFF]/20 text-[#007AFF] hover:bg-[#007AFF]/10 transition-colors"
                    title="Open link in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => copyToClipboard(activePermalink)}
                    className="px-3 py-1.5 rounded-lg bg-[#007AFF] text-white hover:bg-[#0066D6] text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedActive ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[10px] font-mono text-emerald-700">
                  ✓ Opens immediately in 0 milliseconds. No TinyURL countdowns or preview warnings.
                </p>
              </div>
            ) : (
              <div className="text-xs font-mono text-[#241813]/60 py-2">
                Type or paste HTML in the studio to generate a shareable short link.
              </div>
            )}

            {/* External Shortener Option */}
            {activeShortUrl && activeShortUrl !== activePermalink && (
              <div className="pt-2 border-t border-[#007AFF]/15 space-y-2">
                <div className="text-[11px] font-mono text-[#241813]/70 flex items-center justify-between">
                  <span>External Short URL (TinyURL)</span>
                  <span className="text-[10px] text-amber-700 font-medium">May show 10s preview on localhost</span>
                </div>
                <div className="flex items-center gap-2 bg-white/70 border border-[#241813]/15 rounded-xl p-2 shadow-2xs">
                  <input
                    type="text"
                    readOnly
                    value={activeShortUrl}
                    className="flex-1 bg-transparent border-0 text-xs font-mono text-[#241813]/80 focus:outline-hidden truncate"
                  />
                  <button
                    onClick={() => copyToClipboard(activeShortUrl, true)}
                    className="px-2.5 py-1 rounded-lg border border-[#241813]/20 hover:bg-[#241813]/5 text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCustom ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Shorten Any Custom URL */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-[#241813] flex items-center justify-between">
              <span>Shorten Any Custom URL</span>
              <span className="text-[11px] font-normal text-[#241813]/50">
                paste any long link or old #v=...
              </span>
            </div>

            <form onSubmit={handleShortenCustom} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://akr-share.vercel.app/#v=..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#241813]/20 text-xs sm:text-sm font-mono focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-hidden bg-[#FAF8F5]/50"
                />
                <button
                  type="submit"
                  disabled={!customInput.trim() || isCustomLoading}
                  className="px-4 py-2.5 rounded-xl bg-[#241813] text-white hover:bg-black font-mono font-bold text-xs disabled:opacity-40 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {isCustomLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Scissors className="w-3.5 h-3.5" />
                  )}
                  <span>Shorten</span>
                </button>
              </div>
            </form>

            {customShortUrl && (
              <div className="bg-[#FAF8F5] border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between gap-2 animate-in fade-in">
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono text-emerald-700 font-bold uppercase">
                    Shortened Result
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-[#007AFF] truncate">
                    {customShortUrl}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={customShortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg border border-[#241813]/20 hover:bg-white text-[#241813] transition-colors"
                    title="Open link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => copyToClipboard(customShortUrl, true)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedCustom ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info note */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#007AFF]/10 flex items-center justify-between text-[11px] font-mono text-[#241813]/60">
          <span>Permanent • Zero Expiration • Instant Redirection</span>
          <button
            onClick={onClose}
            className="font-bold underline hover:text-[#007AFF] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
