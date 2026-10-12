/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const ComparisonSpec: React.FC = () => {
  return (
    <section id="specifications" className="relative w-full px-4 sm:px-10 lg:px-16 pt-16 pb-12 sm:pt-20 sm:pb-16 border-t border-[#007AFF]/15 bg-white text-[#007AFF]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Specifications & Philosophy */}
        <div className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[#007AFF] font-bold mb-3">
            02. technical benchmarks
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#007AFF] lowercase mb-4">
            speed &amp; zero bloat specifications.
          </h2>
          <p className="text-xs sm:text-sm text-[#007AFF]/85 leading-relaxed mb-6">
            When you just want to paste an HTML document and send a rendered link to a colleague or client, you shouldn&apos;t need accounts, heavy bundler frameworks, or advert clutter.
          </p>

          <div className="border border-[#007AFF]/20 rounded-2xl p-5 bg-[#F4F8FC] space-y-4 font-mono text-xs text-[#007AFF]">
            <div className="flex items-center justify-between border-b border-[#007AFF]/10 pb-2">
              <span className="text-[#007AFF]/70">bundle payload</span>
              <span className="font-bold tabular-nums">&lt; 14.2 KB</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#007AFF]/10 pb-2">
              <span className="text-[#007AFF]/70">render latency</span>
              <span className="font-bold tabular-nums">&lt; 12 ms</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#007AFF]/10 pb-2">
              <span className="text-[#007AFF]/70">account requirement</span>
              <span className="font-bold">None (100% anonymous)</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#007AFF]/10 pb-2">
              <span className="text-[#007AFF]/70">storage architecture</span>
              <span className="font-bold">Client Hash (#v=)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#007AFF]/70">license type</span>
              <span className="font-bold">MIT Open Source</span>
            </div>
          </div>
        </div>

        {/* Right Column: Comparison Matrix */}
        <div className="lg:col-span-7">
          <div className="text-xs font-mono uppercase tracking-widest text-[#007AFF] font-bold mb-3">
            platform comparison
          </div>
          <div className="border border-[#007AFF]/20 rounded-[28px] overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#007AFF]/15 bg-[#FAFCFF] text-[#007AFF]">
                    <th className="py-3.5 px-4 sm:px-6 font-bold">capability</th>
                    <th className="py-3.5 px-4 font-bold text-[#007AFF] bg-[#007AFF]/5">akr-paste</th>
                    <th className="py-3.5 px-4 font-normal text-[#007AFF]/60">codepen / jsfiddle</th>
                    <th className="py-3.5 px-4 font-normal text-[#007AFF]/60">github gist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#007AFF]/10 text-[#007AFF]">
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium">single-file html paste</td>
                    <td className="py-3 px-4 font-bold bg-[#007AFF]/5">Yes (native)</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">Split 3 tabs</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">Raw text only</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium">instant live dom render</td>
                    <td className="py-3 px-4 font-bold bg-[#007AFF]/5">Yes (&lt;12ms)</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">Yes (heavy UI)</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">No (requires previewer)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium">zero signup or accounts</td>
                    <td className="py-3 px-4 font-bold bg-[#007AFF]/5">Yes (100% open)</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">Signup encouraged</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">GitHub account needed</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium">ad-free presentation</td>
                    <td className="py-3 px-4 font-bold bg-[#007AFF]/5">Pure clean view</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">Banner ads / Pro upsells</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">Clean text</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium">100% open source &amp; self-hostable</td>
                    <td className="py-3 px-4 font-bold bg-[#007AFF]/5">Yes (MIT)</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">Proprietary closed source</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">Proprietary platform</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium">standalone .html export</td>
                    <td className="py-3 px-4 font-bold bg-[#007AFF]/5">One-click</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">Export zip file</td>
                    <td className="py-3 px-4 text-[#007AFF]/70">Raw file download</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
