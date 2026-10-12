/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeroPoster } from './components/HeroPoster';
import { FullScreenEditor } from './components/FullScreenEditor';
import { FeatureBento } from './components/FeatureBento';
import { ComparisonSpec } from './components/ComparisonSpec';
import { Footer } from './components/Footer';

export default function App() {
  const [isSharedView, setIsSharedView] = useState<boolean>(false);

  // Check if opening directly from a shared link without ?edit
  useEffect(() => {
    const checkHash = () => {
      const hasHash = window.location.hash.startsWith('#v=');
      const hasEditParam = new URLSearchParams(window.location.search).get('edit') !== null;
      if (hasHash && !hasEditParam) {
        setIsSharedView(true);
      } else {
        setIsSharedView(false);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const scrollToStudio = () => {
    const el = document.getElementById('editor-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If in direct shared link viewer mode, render only the full-screen iframe view
  if (isSharedView) {
    return (
      <FullScreenEditor
        onBackToPoster={() => {
          setIsSharedView(false);
          history.replaceState(null, '', window.location.pathname);
        }}
        showBackToPosterButton={true}
      />
    );
  }

  // Full Landing Site
  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#241813] font-sans selection:bg-[#C84E29] selection:text-white flex flex-col">
      {/* 1. Full-Screen Reference Poster Landing */}
      <HeroPoster onExploreClick={scrollToStudio} />

      {/* 2. Embedded HTML Paste & Share Launch Studio */}
      <section className="w-full border-t border-[#007AFF]/20 bg-[#F8FAFC]">
        <FullScreenEditor
          onBackToPoster={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          showBackToPosterButton={true}
        />
      </section>

      {/* 3. Features & Architecture Bento (01 - 04) */}
      <FeatureBento />

      {/* 4. Technical Specifications & Benchmarks */}
      <ComparisonSpec />

      {/* 5. Quiet Swiss Footer with Git & LinkedIn */}
      <Footer />
    </div>
  );
}
