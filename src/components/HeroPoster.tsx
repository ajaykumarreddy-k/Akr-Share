/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import mainBannerImg from '../assets/main.png';

interface HeroPosterProps {
  onExploreClick: () => void;
}

export const HeroPoster: React.FC<HeroPosterProps> = ({ onExploreClick }) => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[#FAF8F5] text-[#241813] px-4 sm:px-10 lg:px-16 py-6 sm:py-10 flex flex-col justify-between"
    >
      {/* 1. Top Row: Renaissance & Code Dual-Tone Monospace Header */}
      <div className="w-full flex items-center justify-between text-xs sm:text-sm font-mono pb-4 sm:pb-6 border-b border-[#241813]/15">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#C84E29] tracking-tight">2026.10</span>
          <span className="text-[#0084FF] font-extrabold">//</span>
          <span className="font-semibold text-[#241813]">CREATION OF CODE</span>
        </div>

        <div className="flex items-center gap-2 font-bold tracking-wider text-xs sm:text-sm">
          <span className="text-[#C84E29]">@AKR-PASTE</span>
          <span className="text-[#241813]/40">×</span>
          <span className="text-[#0084FF]">OPEN-SOURCE</span>
        </div>

        <div>
          <button
            onClick={onExploreClick}
            className="group px-3.5 py-1.5 rounded-full border border-[#C84E29] text-[#C84E29] hover:bg-[#C84E29] hover:text-white transition-all font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          >
            <span>[launch studio]</span>
            <span className="transform transition-transform group-hover:translate-x-0.5 text-[#0084FF] group-hover:text-white">&rarr;</span>
          </button>
        </div>
      </div>

      {/* 2. Full-Width Visual Card: The Creation of Code Masterpiece */}
      <div className="w-full my-4 sm:my-6">
        <div className="w-full aspect-[16/9] sm:aspect-[2.35/1] max-h-[500px] overflow-hidden rounded-[24px] sm:rounded-[36px] border border-[#241813]/20 bg-[#E8DDD0] shadow-sm relative group">
          <img
            src={mainBannerImg}
            alt="The Creation of Code — AKR-paste share"
            className="w-full h-full object-cover object-center block select-none transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            loading="eager"
          />
        </div>
      </div>

      {/* 3. Metadata Strip with Palette Badges & Social Links */}
      <div className="w-full flex flex-wrap items-center justify-between gap-y-2 text-xs sm:text-sm font-mono tracking-tight border-b border-[#241813]/15 pb-4">
        {/* Left: Product & Runtime Specs with Terracotta Accent Separators */}
        <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-1 text-[#241813]">
          <span className="text-[#C84E29] font-semibold">client-side engine</span>
          <span className="text-[#0084FF] font-bold">·</span>
          <span>zero backend required</span>
          <span className="text-[#C84E29] font-bold">·</span>
          <span>base64url hash permalinks</span>
          <span className="text-[#0084FF] font-bold">·</span>
          <span className="text-[#0084FF] font-semibold">isolated dom</span>
        </div>

        {/* Right: GitHub, LinkedIn, MIT License with Color Accents */}
        <div className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-bold">
          <a
            href="https://github.com/ajaykumarreddy-k"
            target="_blank"
            rel="noreferrer"
            className="text-[#241813] hover:text-[#C84E29] hover:underline transition-colors flex items-center gap-1"
          >
            <span>git--</span>
          </a>
          <a
            href="https://www.linkedin.com/in/ajay-kumar-reddy-krishnareddy-gari-a4885b282/"
            target="_blank"
            rel="noreferrer"
            className="text-[#241813] hover:text-[#C84E29] hover:underline transition-colors flex items-center gap-1"
          >
            <span>linkedin--</span>
          </a>
          <span className="text-[#241813]/30">·</span>
          <span className="text-[#C84E29] bg-[#C84E29]/10 px-2 py-0.5 rounded text-[11px]">
            mit license
          </span>
        </div>
      </div>

      {/* 4. Giant Typography (On the Same Line) + Renaissance/Code Palette Strip */}
      <div className="w-full relative my-6 sm:my-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
        
        {/* Main Title: akr-paste (Terracotta Red) + share (Celestial Blue) on the SAME LINE */}
        <div className="w-full overflow-visible pb-4 sm:pb-6">
          <div className="select-none font-extrabold tracking-[-0.075em] leading-[1.1] flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4 gap-y-2 py-1">
            {/* Primary Word in Renaissance Terracotta Red */}
            <span className="text-[clamp(3.2rem,8.8vw,8.2rem)] text-[#C84E29] whitespace-nowrap inline-block pb-1">
              akr-paste
            </span>

            {/* Secondary Word in Glowing Celestial Code Blue */}
            <span className="text-[clamp(3.2rem,8.8vw,8.2rem)] text-[#0084FF] whitespace-nowrap inline-block pb-1">
              share
            </span>

            {/* Version Badge on Same Baseline in Classical Umber */}
            <span className="text-[clamp(1.4rem,3.2vw,3rem)] font-bold text-[#241813] tracking-tight whitespace-nowrap ml-1 sm:ml-2 inline-block">
              html v.
            </span>
          </div>
        </div>

        {/* Right Vertical Spec Strip (Palette extracted directly from main.png) */}
        <div className="hidden lg:flex flex-col items-center justify-center py-2 px-5 text-[11px] font-mono border-l border-[#241813]/15 shrink-0 space-y-3">
          <div className="text-center space-y-0.5">
            <div className="font-bold text-[#C84E29]">#C84E29</div>
            <div className="text-[10px] text-[#241813]/60">TERRACOTTA</div>
          </div>

          <div className="w-4 h-[1px] bg-[#241813]/20"></div>

          <div className="text-center space-y-0.5">
            <div className="font-bold text-[#0084FF]">#0084FF</div>
            <div className="text-[10px] text-[#241813]/60">CELESTIAL</div>
          </div>

          <div className="w-4 h-[1px] bg-[#241813]/20"></div>

          <div className="text-center space-y-0.5">
            <div className="font-bold text-[#E5A852]">#E5A852</div>
            <div className="text-[10px] text-[#241813]/60">SUNLIT OCHRE</div>
          </div>
        </div>

      </div>

      {/* 5. Editorial Paragraphs & Launch Studio Action Button */}
      <div className="w-full pt-6 border-t border-[#241813]/15 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-6 sm:gap-10 items-center">
        
        {/* Left Column: Launch Studio Mission */}
        <div className="text-xs sm:text-[13px] leading-[1.65] text-[#241813] font-normal">
          <p>
            <span className="font-bold text-[#C84E29]">akr-paste share</span> is a zero-configuration raw html pastebin and instant dom renderer. author or drop single-file markup directly into the code studio, view immediate live execution in an isolated sandbox, and publish permanent shareable permalinks in one click.
          </p>
        </div>

        {/* Middle Column: Architecture & Standards */}
        <div className="text-xs sm:text-[13px] leading-[1.65] text-[#241813] font-normal">
          <p>
            <span className="font-bold text-[#0084FF]">built for creators</span>, creative coders, and developers to share interactive prototypes, widgets, and web experiments without build tools or signups. features utf-8 base64url hash encoding, responsive viewports, and clean standalone html export.
          </p>
        </div>

        {/* Action Button: Rounded Pill with Arrow */}
        <div className="flex justify-start md:justify-end shrink-0">
          <button
            onClick={onExploreClick}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-[#C84E29] bg-white text-[#C84E29] hover:bg-[#C84E29] hover:text-white transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
            aria-label="Launch AKR-paste Studio"
            title="Launch HTML Studio"
          >
            <svg
              className="w-11 h-5 transform transition-transform group-hover:translate-x-1"
              viewBox="0 0 48 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M4 10H42M42 10L32 3M42 10L32 17"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

      </div>

    </section>
  );
};
