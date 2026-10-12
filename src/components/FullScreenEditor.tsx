/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { encodePaste, decodePaste } from '../utils/shareEncoding';
import { shortenUrl } from '../utils/urlShortener';
import { PrismCodeEditor } from './PrismCodeEditor';
import { UrlShortenerModal } from './UrlShortenerModal';
import { Scissors, Loader2 } from 'lucide-react';

interface FullScreenEditorProps {
  onBackToPoster?: () => void;
  showBackToPosterButton?: boolean;
}

const DEFAULT_SAMPLE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AKR-paste Demo</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: grid;
      place-items: center;
      height: 100vh;
      margin: 0;
      background: #FFFFFF;
      color: #007AFF;
    }
    .card {
      border: 1.5px solid #007AFF;
      border-radius: 24px;
      padding: 40px;
      text-align: center;
      max-width: 420px;
      box-shadow: 0 10px 30px rgba(0, 122, 255, 0.08);
    }
    h1 {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
      opacity: 0.8;
      line-height: 1.5;
      margin-bottom: 24px;
    }
    button {
      padding: 10px 24px;
      border: 0;
      border-radius: 999px;
      background: #007AFF;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.15s ease;
    }
    button:active {
      transform: scale(0.96);
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>akr-paste share</h1>
    <p>raw html live rendered in an isolated dom sandbox with zero configuration.</p>
    <button onclick="this.textContent = 'Clicks: ' + (++n)">Click to test state</button>
  </div>
  <script>
    let n = 0;
  </script>
</body>
</html>`;

export const FullScreenEditor: React.FC<FullScreenEditorProps> = ({
  onBackToPoster,
  showBackToPosterButton = true,
}) => {
  const [code, setCode] = useState<string>(DEFAULT_SAMPLE);
  const [sizeText, setSizeText] = useState<string>('0.0 KB');
  const [isMobileStage, setIsMobileStage] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [isShortenerOpen, setIsShortenerOpen] = useState<boolean>(false);
  const [isShortening, setIsShortening] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const renderTimeoutRef = useRef<number | null>(null);

  const MAX_BYTES = 500 * 1024; // 500 KB URL-hash limit guard

  const showToastMsg = useCallback((msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  // Compute size
  useEffect(() => {
    const bytes = new Blob([code]).size;
    setSizeText(`${(bytes / 1024).toFixed(1)} KB`);
  }, [code]);

  // Load from hash on mount
  useEffect(() => {
    const handleHash = () => {
      const match = window.location.hash.match(/^#v=(.+)$/);
      if (match) {
        try {
          const decoded = decodePaste(match[1]);
          setCode(decoded);
          const hasEditParam = new URLSearchParams(window.location.search).get('edit') !== null;
          if (!hasEditParam) {
            setIsViewOnly(true);
          } else {
            setIsViewOnly(false);
          }
        } catch {
          showToastMsg('Invalid shared link');
        }
      } else {
        setIsViewOnly(false);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [showToastMsg]);

  // Live render debounce (300ms)
  useEffect(() => {
    if (renderTimeoutRef.current) {
      window.clearTimeout(renderTimeoutRef.current);
    }
    renderTimeoutRef.current = window.setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = code;
      }
    }, 200);

    return () => {
      if (renderTimeoutRef.current) {
        window.clearTimeout(renderTimeoutRef.current);
      }
    };
  }, [code]);

  // Actions
  const handleShare = async () => {
    if (!code.trim()) {
      showToastMsg('Nothing to share');
      return;
    }
    if (new Blob([code]).size > MAX_BYTES) {
      showToastMsg('Too large (max 500 KB)');
      return;
    }

    setIsShortening(true);
    showToastMsg('Shortening link...');

    try {
      const encoded = encodePaste(code);
      const permalink = `${window.location.origin}${window.location.pathname}#v=${encoded}`;
      history.replaceState(null, '', `#v=${encoded}`);
      
      // Automatically shorten the link
      const short = await shortenUrl(permalink);
      await navigator.clipboard.writeText(short);
      
      if (short !== permalink) {
        showToastMsg(`Short link copied: ${short}`);
      } else {
        showToastMsg('Compressed permalink copied');
      }
    } catch {
      const encoded = encodePaste(code);
      const permalink = `${window.location.origin}${window.location.pathname}#v=${encoded}`;
      history.replaceState(null, '', `#v=${encoded}`);
      prompt('Copy share link:', permalink);
    } finally {
      setIsShortening(false);
    }
  };

  const handleOpenFull = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'akr-page.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setCode('');
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    showToastMsg('Editor cleared');
  };

  const handleSample = () => {
    setCode(DEFAULT_SAMPLE);
    showToastMsg('Sample code loaded');
  };

  const handleExitViewOnly = () => {
    setIsViewOnly(false);
    // Add ?edit to URL
    const url = new URL(window.location.href);
    url.searchParams.set('edit', '1');
    history.replaceState(null, '', url.toString());
  };

  // Viewer mode (when opening a shared link directly without ?edit)
  if (isViewOnly) {
    return (
      <div className="relative w-screen h-screen m-0 p-0 overflow-hidden bg-white">
        <iframe
          ref={iframeRef}
          srcDoc={code}
          title="AKR-paste Shared View"
          className="w-full h-full border-0 block"
          sandbox="allow-scripts allow-forms allow-modals allow-popups"
        />

        {/* Discreet Badge at Bottom Right */}
        <div className="fixed bottom-3 right-3 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#007AFF]/30 shadow-lg rounded-full px-3.5 py-1.5 text-xs font-mono text-[#007AFF]">
          <span className="font-semibold">Made with AKR-paste share</span>
          <span className="text-[#007AFF]/30">·</span>
          <button
            onClick={handleExitViewOnly}
            className="font-bold underline hover:opacity-80 cursor-pointer"
          >
            Edit this paste
          </button>
        </div>
      </div>
    );
  }

  // Full-Screen Editor Workspace
  return (
    <div
      id="editor-studio"
      className="w-full min-h-[680px] h-[92vh] flex flex-col bg-[#F8FAFC] text-[#007AFF] font-sans overflow-hidden select-none"
    >
      {/* Editor Header Bar */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-white border-b border-[#007AFF]/20 gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-3">
          {showBackToPosterButton && onBackToPoster && (
            <button
              onClick={onBackToPoster}
              className="px-2.5 py-1 rounded-md border border-[#007AFF]/30 bg-white text-[#007AFF] hover:bg-[#007AFF]/5 text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1"
              title="Return to poster view"
            >
              <span>&uarr; top poster</span>
            </button>
          )}

          <h1 className="text-sm sm:text-base font-extrabold tracking-tight flex items-center gap-2">
            <span className="text-[#C84E29]">akr-paste</span>
            <span className="text-[#0084FF]">share</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#241813]/25 text-[#241813]/70 bg-[#F4F8FC]">
              HTML Paste &amp; Share
            </span>
          </h1>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={handleSample}
            className="px-2.5 py-1.5 rounded-lg border border-[#007AFF]/25 bg-white text-[#007AFF] hover:bg-[#007AFF]/5 cursor-pointer transition-colors"
          >
            Sample
          </button>
          <button
            onClick={handleClear}
            className="px-2.5 py-1.5 rounded-lg border border-[#007AFF]/25 bg-white text-[#007AFF] hover:bg-[#007AFF]/5 cursor-pointer transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleDownload}
            className="px-2.5 py-1.5 rounded-lg border border-[#007AFF]/25 bg-white text-[#007AFF] hover:bg-[#007AFF]/5 cursor-pointer transition-colors"
          >
            Download
          </button>
          <button
            onClick={handleOpenFull}
            className="px-2.5 py-1.5 rounded-lg border border-[#007AFF]/25 bg-white text-[#007AFF] hover:bg-[#007AFF]/5 cursor-pointer transition-colors"
          >
            Open full
          </button>
          <button
            onClick={() => setIsShortenerOpen(true)}
            className="px-2.5 py-1.5 rounded-lg border border-[#007AFF]/25 bg-white text-[#007AFF] hover:bg-[#007AFF]/5 cursor-pointer transition-colors flex items-center gap-1.5"
            title="Open URL Shortener Studio"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Shortener</span>
          </button>
          <button
            onClick={handleShare}
            disabled={isShortening}
            className="px-3.5 py-1.5 rounded-lg border border-[#007AFF] bg-[#007AFF] text-white hover:bg-[#0066D6] font-semibold cursor-pointer shadow-sm active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-80"
          >
            {isShortening ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Shortening...</span>
              </>
            ) : (
              <>
                <span>Share link</span>
                <Scissors className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Split Grid (50% Code Textarea, 50% Live Preview Stage) */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-0 min-w-0 bg-white">
        
        {/* Left Pane: Code Textarea with Prism.js Syntax Highlighting */}
        <section className="flex flex-col min-h-0 min-w-0 border-r border-[#007AFF]/15 bg-[#FAFCFF]">
          <div className="px-4 py-2 bg-white border-b border-[#007AFF]/15 flex items-center justify-between text-xs font-mono text-[#007AFF]/80">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#007AFF]">HTML / CSS / JS</span>
              <span className="text-[10px] text-[#007AFF]/70 px-1.5 py-0.2 border border-[#007AFF]/25 rounded bg-[#F4F8FC]">
                Prism Highlighting
              </span>
            </div>
            <span className="text-[11px] text-[#007AFF]/60 tabular-nums">{sizeText}</span>
          </div>

          <PrismCodeEditor
            value={code}
            onChange={setCode}
            placeholder="Paste your HTML here…"
          />
        </section>

        {/* Right Pane: Live Render Stage */}
        <section className="flex flex-col min-h-0 min-w-0 bg-[#F4F6F9]">
          <div className="px-4 py-2 bg-white border-b border-[#007AFF]/15 flex items-center justify-between text-xs font-mono text-[#007AFF]">
            <span className="font-bold">Preview</span>
            <div className="flex items-center gap-1 text-[11px]">
              <button
                onClick={() => setIsMobileStage(false)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  !isMobileStage
                    ? 'bg-[#007AFF] text-white font-semibold'
                    : 'text-[#007AFF] hover:bg-[#007AFF]/10'
                }`}
              >
                Desktop
              </button>
              <button
                onClick={() => setIsMobileStage(true)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  isMobileStage
                    ? 'bg-[#007AFF] text-white font-semibold'
                    : 'text-[#007AFF] hover:bg-[#007AFF]/10'
                }`}
              >
                Mobile (390px)
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto flex justify-center items-stretch bg-[#F4F6F9] p-0 sm:p-2">
            <div
              className={`h-full bg-white transition-all duration-200 overflow-hidden ${
                isMobileStage
                  ? 'w-[390px] border-x border-[#007AFF]/20 shadow-md'
                  : 'w-full border-0'
              }`}
            >
              <iframe
                ref={iframeRef}
                srcDoc={code}
                title="AKR-paste Preview"
                className="w-full h-full border-0 block bg-white"
                sandbox="allow-scripts allow-forms allow-modals allow-popups"
              />
            </div>
          </div>
        </section>

      </main>

      {/* Floating Toast Notification */}
      <div
        role="status"
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-[#007AFF] text-white text-xs font-mono font-medium shadow-lg transition-all duration-200 pointer-events-none ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {toastMessage}
      </div>

      {/* URL Shortener Modal */}
      <UrlShortenerModal
        isOpen={isShortenerOpen}
        onClose={() => setIsShortenerOpen(false)}
        activePermalink={
          typeof window !== 'undefined' && code.trim()
            ? `${window.location.origin}${window.location.pathname}#v=${encodePaste(code)}`
            : ''
        }
        onToast={showToastMsg}
      />
    </div>
  );
};
