/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const FeatureBento: React.FC = () => {
  return (
    <section id="features" className="relative w-full px-4 sm:px-10 lg:px-16 py-16 sm:py-24 border-t border-[#007AFF]/15 bg-white text-[#007AFF]">
      {/* Section Header */}
      <div className="mb-12 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-[#007AFF] font-bold mb-3">
          01. core architecture &amp; features
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#007AFF] lowercase">
          the akr-paste engine
        </h2>
        <p className="text-xs sm:text-sm text-[#007AFF]/80 mt-3 leading-relaxed">
          Standard code platforms introduce heavy multi-pane bundles, mandatory signups, and advertising trackers. AKR-paste share is a pure, single-file HTML live engine with client-side base64url state persistence.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Card 1 */}
        <div className="md:col-span-7 border border-[#007AFF]/20 rounded-[28px] p-6 sm:p-8 bg-white hover:border-[#007AFF]/40 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#007AFF]/70 mb-6">
              <span>01. ingestion</span>
              <span>zero build-step</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#007AFF] lowercase mb-3">
              raw html, css &amp; javascript
            </h3>
            <p className="text-xs sm:text-sm text-[#007AFF]/85 leading-relaxed max-w-xl">
              Paste complete HTML files with inline style blocks, script tags, canvas elements, SVG illustrations, or external CDN links. Parsed directly in memory with zero transpilation latency.
            </p>
          </div>

          <div className="mt-8 bg-[#F4F8FC] border border-[#007AFF]/15 rounded-2xl p-4 font-mono text-xs text-[#007AFF]">
            <div className="flex items-center gap-2 mb-2 text-[11px] text-[#007AFF]/60 font-bold">
              <span>supported web capabilities:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>· HTML5 Canvas &amp; WebGL</div>
              <div>· CSS Grid, Flexbox &amp; 3D</div>
              <div>· Web Audio &amp; SVG animations</div>
              <div>· Tailwind &amp; Font stylesheets</div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="md:col-span-5 border border-[#007AFF]/20 rounded-[28px] p-6 sm:p-8 bg-white hover:border-[#007AFF]/40 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#007AFF]/70 mb-6">
              <span>02. isolation</span>
              <span>secure dom</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#007AFF] lowercase mb-3">
              isolated dom sandbox
            </h3>
            <p className="text-xs sm:text-sm text-[#007AFF]/85 leading-relaxed">
              Every paste runs inside a strict sandboxed iframe container (<code className="font-mono text-[#007AFF]">sandbox=&quot;allow-scripts allow-forms allow-modals allow-popups&quot;</code>). Protects privacy while allowing full interactive web app execution.
            </p>
          </div>

          <div className="mt-8 p-4 bg-[#F4F8FC] border border-[#007AFF]/15 rounded-2xl text-xs font-mono text-[#007AFF]">
            <div className="text-[11px] text-[#007AFF]/60 mb-1">containment perimeter:</div>
            <div className="font-bold">zero-cookie cross-origin isolation</div>
            <div className="text-[10px] text-[#007AFF]/70 mt-1">prevents session leakage or host dom tampering</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="md:col-span-5 border border-[#007AFF]/20 rounded-[28px] p-6 sm:p-8 bg-white hover:border-[#007AFF]/40 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#007AFF]/70 mb-6">
              <span>03. sharing</span>
              <span>base64url hash</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#007AFF] lowercase mb-3">
              instant permanent link
            </h3>
            <p className="text-xs sm:text-sm text-[#007AFF]/85 leading-relaxed">
              Encoding your entire HTML application directly into a UTF-8 Base64URL fragment (<code className="font-mono text-[#007AFF]">#v=...</code>). The recipient receives a self-contained, immortal URL with zero server dependency.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between p-3.5 bg-[#F4F8FC] border border-[#007AFF]/15 rounded-2xl text-xs font-mono text-[#007AFF]">
            <span className="truncate max-w-[200px]">https://.../#v=...</span>
            <span className="font-bold underline">one-click copy</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="md:col-span-7 border border-[#007AFF]/20 rounded-[28px] p-6 sm:p-8 bg-white hover:border-[#007AFF]/40 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#007AFF]/70 mb-6">
              <span>04. transparency</span>
              <span>mit licensed</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#007AFF] lowercase mb-3">
              100% open source &amp; self-hostable
            </h3>
            <p className="text-xs sm:text-sm text-[#007AFF]/85 leading-relaxed max-w-xl">
              Zero vendor lock-in. Run it on your local machine, host on Cloud Run, GitHub Pages, or your private corporate VPS. AKR-paste share collects no analytics and requires no account.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#007AFF]/15 text-xs font-mono text-[#007AFF]">
            <div className="flex items-center gap-4">
              <span>github repository</span>
              <span>·</span>
              <span>permissive mit license</span>
              <span>·</span>
              <span>zero tracking</span>
            </div>
            <a
              href="https://github.com/ajaykumarreddy-k"
              target="_blank"
              rel="noreferrer"
              className="font-bold underline hover:opacity-80"
            >
              view on github &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
