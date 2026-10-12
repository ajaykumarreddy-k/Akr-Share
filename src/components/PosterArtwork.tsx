/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface PosterArtworkProps {
  className?: string;
  interactive?: boolean;
}

export const PosterArtwork: React.FC<PosterArtworkProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full aspect-[16/9] sm:aspect-[2.1/1] overflow-hidden rounded-[22px] sm:rounded-[28px] bg-[#9BC4E2] select-none ${className}`}
    >
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="skyGrad" x1="600" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A9CE4" />
            <stop offset="45%" stopColor="#7CB4E8" />
            <stop offset="100%" stopColor="#A8D0EE" />
          </linearGradient>

          {/* Cloud Gradients */}
          <radialGradient id="cloudCore" cx="420" cy="270" r="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F4F8FA" />
            <stop offset="100%" stopColor="#D5E4F0" />
          </radialGradient>
          <radialGradient id="cloudHighlight1" cx="360" cy="210" r="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E2EDF7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cloudHighlight2" cx="500" cy="240" r="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#DBE8F3" />
          </radialGradient>

          {/* Wall Gradients */}
          <linearGradient id="wallFace" x1="600" y1="280" x2="600" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ECEEF0" />
            <stop offset="35%" stopColor="#E3E6E9" />
            <stop offset="100%" stopColor="#D3D7DC" />
          </linearGradient>

          <linearGradient id="parapetTop" x1="600" y1="270" x2="600" y2="305" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBFCFD" />
            <stop offset="60%" stopColor="#EFF1F3" />
            <stop offset="100%" stopColor="#DDE1E5" />
          </linearGradient>

          {/* Metal Ladder Gradients */}
          <linearGradient id="ladderSteel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B424D" />
            <stop offset="35%" stopColor="#6C7685" />
            <stop offset="65%" stopColor="#96A1B0" />
            <stop offset="90%" stopColor="#4A525E" />
            <stop offset="100%" stopColor="#252B33" />
          </linearGradient>

          <linearGradient id="ladderRung" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8C97A6" />
            <stop offset="50%" stopColor="#515B68" />
            <stop offset="100%" stopColor="#2D333B" />
          </linearGradient>

          {/* Soft Shadow Filter for Wall & Ladder */}
          <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="8" dy="12" stdDeviation="8" floodColor="#1E2A38" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* 1. Sky Background */}
        <rect width="1200" height="600" fill="url(#skyGrad)" />

        {/* Subtle high-altitude cirrus clouds */}
        <path
          d="M 50 140 Q 200 120 380 150 Q 550 170 700 130"
          stroke="#FFFFFF"
          strokeWidth="38"
          strokeLinecap="round"
          opacity="0.22"
          filter="blur(16px)"
        />
        <path
          d="M 680 90 Q 850 70 1050 100"
          stroke="#FFFFFF"
          strokeWidth="48"
          strokeLinecap="round"
          opacity="0.18"
          filter="blur(20px)"
        />

        {/* 2. Realistic Cumulus Cloud Formations */}
        {/* Cloud Base Shadows */}
        <ellipse cx="440" cy="310" rx="360" ry="140" fill="#CAD8E5" opacity="0.7" filter="blur(24px)" />

        {/* Back Cloud Masses */}
        <circle cx="210" cy="340" r="110" fill="#E2EDF5" />
        <circle cx="280" cy="270" r="130" fill="#EBF2F8" />
        <circle cx="610" cy="280" r="125" fill="#E2EDF5" />
        <circle cx="560" cy="210" r="110" fill="#F0F5FA" />

        {/* Main Volumetric Cumulus Cloud Lobes */}
        <circle cx="440" cy="220" r="135" fill="url(#cloudHighlight2)" />
        <circle cx="370" cy="190" r="120" fill="url(#cloudHighlight1)" />
        <circle cx="460" cy="180" r="95" fill="#FFFFFF" />
        <circle cx="420" cy="155" r="75" fill="#FFFFFF" />
        <circle cx="340" cy="225" r="105" fill="#FFFFFF" />
        <circle cx="270" cy="285" r="95" fill="#F4F8FB" />
        <circle cx="180" cy="340" r="85" fill="#E8F0F7" />
        <circle cx="525" cy="235" r="115" fill="#F4F8FA" />
        <circle cx="580" cy="290" r="100" fill="#EAF0F6" />
        <circle cx="650" cy="340" r="80" fill="#DDE7F0" />

        {/* Cloud Micro-tufts for realism */}
        <circle cx="400" cy="138" r="42" fill="#FFFFFF" />
        <circle cx="440" cy="142" r="48" fill="#FFFFFF" />
        <circle cx="365" cy="160" r="45" fill="#FFFFFF" />
        <circle cx="485" cy="162" r="40" fill="#FFFFFF" />
        <circle cx="320" cy="195" r="50" fill="#FFFFFF" />

        {/* Soft atmospheric cloud overlay */}
        <path
          d="M 120 380 C 120 280, 260 210, 360 170 C 420 140, 480 150, 520 180 C 600 220, 680 290, 720 380 Z"
          fill="url(#cloudCore)"
          opacity="0.6"
        />

        {/* 3. Modern Architectural Facade Wall */}
        {/* Drop shadow of the wall edge on lower plane */}
        <g id="architectural-wall">
          {/* Main Wall Face with subtle perspective angle matching reference */}
          <path
            d="M 0 380 L 1200 170 L 1200 600 L 0 600 Z"
            fill="url(#wallFace)"
          />

          {/* Parapet / Coping Edge Strip at top of wall */}
          <path
            d="M 0 380 L 1200 170 L 1200 188 L 0 398 Z"
            fill="url(#parapetTop)"
          />

          {/* Parapet underside shadow line */}
          <path
            d="M 0 398 L 1200 188"
            stroke="#9BA4AF"
            strokeWidth="3"
            opacity="0.85"
          />
          <path
            d="M 0 401 L 1200 191"
            stroke="#BCC3CB"
            strokeWidth="1.5"
          />

          {/* Vertical Seams / Architectural Panel Divisions */}
          {/* Panel Line 1 (Far Left) */}
          <line x1="80" y1="386" x2="80" y2="600" stroke="#7E8794" strokeWidth="2.5" opacity="0.8" />
          <line x1="82" y1="386" x2="82" y2="600" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />

          {/* Panel Line 2 */}
          <line x1="220" y1="361" x2="220" y2="600" stroke="#7E8794" strokeWidth="2.5" opacity="0.8" />
          <line x1="222" y1="361" x2="222" y2="600" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />

          {/* Panel Line 3 (Left of Ladder) */}
          <line x1="390" y1="331" x2="390" y2="600" stroke="#7E8794" strokeWidth="2.5" opacity="0.8" />
          <line x1="392" y1="331" x2="392" y2="600" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />

          {/* Panel Line 4 (Right of Ladder) */}
          <line x1="600" y1="294" x2="600" y2="600" stroke="#7E8794" strokeWidth="2.5" opacity="0.8" />
          <line x1="602" y1="294" x2="602" y2="600" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />

          {/* Panel Line 5 */}
          <line x1="780" y1="263" x2="780" y2="600" stroke="#7E8794" strokeWidth="2.5" opacity="0.8" />
          <line x1="782" y1="263" x2="782" y2="600" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />

          {/* Panel Line 6 */}
          <line x1="960" y1="231" x2="960" y2="600" stroke="#7E8794" strokeWidth="2.5" opacity="0.8" />
          <line x1="962" y1="231" x2="962" y2="600" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />

          {/* Panel Line 7 (Far Right) */}
          <line x1="1120" y1="203" x2="1120" y2="600" stroke="#7E8794" strokeWidth="2.5" opacity="0.8" />
          <line x1="1122" y1="203" x2="1122" y2="600" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />

          {/* Horizontal Panel Seams */}
          <path d="M 0 495 L 1200 285" stroke="#87919E" strokeWidth="2.5" opacity="0.75" />
          <path d="M 0 497 L 1200 287" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.85" />
        </g>

        {/* 4. Roof Ladder Shadow Cast on Wall */}
        <g id="ladder-shadow" filter="url(#softShadow)" opacity="0.45">
          {/* Shadow of curved loop rails */}
          <path
            d="M 470 200 C 470 140, 500 135, 520 180 L 520 480"
            stroke="#1A2533"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 545 185 C 545 130, 575 125, 595 170 L 595 470"
            stroke="#1A2533"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Shadow of rungs */}
          {[270, 310, 350, 390, 430, 470].map((y, i) => (
            <line
              key={i}
              x1="518"
              y1={y}
              x2="595"
              y2={y - 12}
              stroke="#1A2533"
              strokeWidth="9"
            />
          ))}
        </g>

        {/* 5. Steel Safety Ladder with Loop Top Rails (Exact match to reference photo) */}
        <g id="steel-ladder">
          {/* Left Vertical Rail with Curved Loop Grab Rail extending above parapet */}
          <path
            d="M 462 600 L 462 250 C 462 170, 488 150, 510 152 C 528 154, 532 178, 532 235 L 532 312"
            stroke="url(#ladderSteel)"
            strokeWidth="10.5"
            strokeLinecap="round"
          />
          {/* Left Rail Inner Highlight */}
          <path
            d="M 463 590 L 463 250 C 463 175, 487 155, 508 156 C 525 158, 530 180, 530 235 L 530 310"
            stroke="#B8C4D4"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Right Vertical Rail with Curved Loop Grab Rail extending above parapet */}
          <path
            d="M 536 600 L 536 238 C 536 158, 562 138, 584 140 C 602 142, 606 166, 606 220 L 606 298"
            stroke="url(#ladderSteel)"
            strokeWidth="10.5"
            strokeLinecap="round"
          />
          {/* Right Rail Inner Highlight */}
          <path
            d="M 537 590 L 537 238 C 537 163, 561 143, 582 144 C 599 146, 604 168, 604 220 L 604 296"
            stroke="#B8C4D4"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Horizontal Rungs */}
          {[
            { y: 220, x1: 462, x2: 536 },
            { y: 265, x1: 462, x2: 536 },
            { y: 310, x1: 462, x2: 536 },
            { y: 355, x1: 462, x2: 536 },
            { y: 400, x1: 462, x2: 536 },
            { y: 445, x1: 462, x2: 536 },
            { y: 490, x1: 462, x2: 536 },
            { y: 535, x1: 462, x2: 536 },
            { y: 580, x1: 462, x2: 536 },
          ].map((rung, index) => (
            <g key={index}>
              {/* Rung bar */}
              <line
                x1={rung.x1}
                y1={rung.y}
                x2={rung.x2}
                y2={rung.y}
                stroke="url(#ladderRung)"
                strokeWidth="8"
                strokeLinecap="square"
              />
              {/* Rung top reflective specular highlight */}
              <line
                x1={rung.x1 + 1}
                y1={rung.y - 2.5}
                x2={rung.x2 - 1}
                y2={rung.y - 2.5}
                stroke="#C5D2E2"
                strokeWidth="2"
                opacity="0.8"
              />
            </g>
          ))}

          {/* Wall Mounting Standoff Brackets */}
          {[325, 465, 575].map((y, idx) => (
            <g key={idx}>
              {/* Left standoff */}
              <rect x="444" y={y - 5} width="18" height="10" fill="#3D4552" rx="2" />
              <circle cx="448" cy={y} r="2.5" fill="#1C2128" />
              {/* Right standoff */}
              <rect x="536" y={y - 5} width="18" height="10" fill="#3D4552" rx="2" />
              <circle cx="550" cy={y} r="2.5" fill="#1C2128" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};
