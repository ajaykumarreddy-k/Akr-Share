/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CreationOfCodeArtworkProps {
  className?: string;
}

export const CreationOfCodeArtwork: React.FC<CreationOfCodeArtworkProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full aspect-[16/9] sm:aspect-[2.35/1] overflow-hidden rounded-[24px] sm:rounded-[36px] bg-[#E8DDD0] select-none ${className}`}
    >
      <svg
        viewBox="0 0 1600 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Fresco Parchment & Atmospheric Sky Gradients */}
          <linearGradient id="frescoSky" x1="800" y1="0" x2="800" y2="680" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EDE2D3" />
            <stop offset="25%" stopColor="#E2D4C3" />
            <stop offset="50%" stopColor="#C9DDF2" />
            <stop offset="70%" stopColor="#8AB7E2" />
            <stop offset="100%" stopColor="#DFD1BF" />
          </linearGradient>

          <radialGradient id="centerGlow" cx="800" cy="320" r="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.9" />
            <stop offset="20%" stopColor="#0084FF" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#0070F3" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0070F3" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="sunburstGolden" cx="1040" cy="240" r="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFDE8A" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#F5B96B" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#E89B48" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#E89B48" stopOpacity="0" />
          </radialGradient>

          {/* Terracotta Mantle Gradients */}
          <linearGradient id="terracottaRed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D95C32" />
            <stop offset="40%" stopColor="#BA411D" />
            <stop offset="75%" stopColor="#8C2B10" />
            <stop offset="100%" stopColor="#5E1A08" />
          </linearGradient>

          <linearGradient id="whiteDrapery" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F5EFE6" />
            <stop offset="85%" stopColor="#D8CABE" />
            <stop offset="100%" stopColor="#A89688" />
          </linearGradient>

          {/* Anatomical Skin Tones */}
          <linearGradient id="skinAdam" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#C99477" />
            <stop offset="40%" stopColor="#E0B092" />
            <stop offset="75%" stopColor="#C28A6D" />
            <stop offset="100%" stopColor="#8E5E45" />
          </linearGradient>

          <linearGradient id="skinGod" x1="1" y1="0" x2="0" y2="0.6">
            <stop offset="0%" stopColor="#CE9C7E" />
            <stop offset="45%" stopColor="#E2B89A" />
            <stop offset="80%" stopColor="#BF8868" />
            <stop offset="100%" stopColor="#8A563D" />
          </linearGradient>

          {/* Glowing Code Symbol Gradients */}
          <linearGradient id="neonBracket" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#6EE7FF" />
            <stop offset="75%" stopColor="#0091FF" />
            <stop offset="100%" stopColor="#0055FF" />
          </linearGradient>

          <filter id="bracketGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur2" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="frescoCrackle" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.06  0 0 0 0.14 0" />
            <feBlend mode="multiply" in="SourceGraphic" result="blend" />
          </filter>
        </defs>

        {/* 1. Fresco Sky Background */}
        <rect width="1600" height="680" fill="url(#frescoSky)" />

        {/* Golden Sunburst Glow on Right behind God figure */}
        <circle cx="1040" cy="240" r="340" fill="url(#sunburstGolden)" />

        {/* Renaissance Clouds Formations */}
        {/* Soft Cumulus Masses */}
        <g opacity="0.85">
          <ellipse cx="800" cy="460" rx="460" ry="180" fill="#E8DED1" opacity="0.6" />
          <ellipse cx="420" cy="380" rx="260" ry="150" fill="#F4EDE2" opacity="0.8" />
          <ellipse cx="1180" cy="360" rx="300" ry="170" fill="#F8EFE0" opacity="0.75" />
          <circle cx="720" cy="300" r="140" fill="#FFFFFF" opacity="0.7" />
          <circle cx="890" cy="300" r="130" fill="#FFFFFF" opacity="0.75" />
          <circle cx="600" cy="240" r="110" fill="#EDE4D6" opacity="0.7" />
          <circle cx="980" cy="220" r="120" fill="#FFF2DC" opacity="0.85" />
          <circle cx="780" cy="200" r="90" fill="#F3ECDD" opacity="0.6" />
        </g>

        {/* Antique Fresco Plaster Cracks & Texture lines */}
        <g stroke="#9E8D7C" strokeWidth="1" opacity="0.4" strokeLinecap="round">
          <path d="M 120 40 Q 240 180 320 220 T 460 380" />
          <path d="M 680 30 Q 720 140 760 190" />
          <path d="M 1340 60 Q 1280 180 1190 280 T 1140 460" />
          <path d="M 880 40 Q 940 160 990 240" />
          <path d="M 400 480 Q 520 540 680 580" />
          <path d="M 980 520 Q 1120 560 1320 610" />
        </g>

        {/* 2. LEFT SIDE: ADAM FIGURE & ARM EXTENDING OUT */}
        {/* Adam's Rocky Earth Mound / Lower Drapery */}
        <path
          d="M 0 450 C 80 440, 160 480, 260 520 C 340 560, 420 620, 480 680 L 0 680 Z"
          fill="#A47B5E"
          opacity="0.8"
        />
        {/* Adam's Terracotta Drapery */}
        <path
          d="M 0 380 C 60 380, 140 440, 180 520 C 220 580, 240 650, 240 680 L 0 680 Z"
          fill="url(#terracottaRed)"
          opacity="0.9"
        />

        {/* Adam's Muscular Torso & Shoulder (Classical anatomy) */}
        <path
          d="M 0 480 C 40 420, 90 380, 140 370 C 180 360, 210 390, 230 430 C 250 480, 230 550, 190 600 Z"
          fill="url(#skinAdam)"
        />

        {/* Adam's Head / Classical Profile */}
        <circle cx="160" cy="330" r="54" fill="url(#skinAdam)" />
        {/* Curly Renaissance Hair */}
        <path
          d="M 115 320 C 110 280, 140 260, 180 265 C 210 270, 225 295, 220 330 C 200 320, 180 325, 165 315 Z"
          fill="#4A3022"
        />

        {/* Adam's Left Arm (Reaching Right toward Center) */}
        <g id="adam-arm">
          {/* Upper Arm & Bicep */}
          <path
            d="M 210 400 C 260 380, 320 370, 380 370 C 430 370, 480 380, 520 390 C 510 420, 450 430, 400 425 C 340 420, 280 430, 230 445 Z"
            fill="url(#skinAdam)"
          />
          {/* Forearm extending toward gap */}
          <path
            d="M 500 385 C 560 370, 620 360, 680 350 C 690 370, 660 390, 610 395 C 560 400, 510 410, 490 405 Z"
            fill="url(#skinAdam)"
          />
          {/* Adam's Wrist & Hand */}
          <path
            d="M 670 352 C 700 348, 725 345, 735 346 C 738 354, 720 362, 695 365 C 675 367, 665 365, 660 360 Z"
            fill="url(#skinAdam)"
          />
          {/* Relaxed Bent Fingers */}
          <path
            d="M 720 355 C 735 360, 745 370, 742 376 C 735 378, 725 370, 715 365 Z"
            fill="#B57A5C"
          />
          {/* Outstretched Index Finger (Pointing right, nearly touching symbol) */}
          <path
            d="M 725 346 C 740 344, 760 342, 770 343 C 774 345, 772 349, 758 352 C 744 354, 732 353, 725 350 Z"
            fill="#E0B092"
            stroke="#9E684D"
            strokeWidth="0.8"
          />
        </g>

        {/* 3. RIGHT SIDE: THE CREATOR FIGURE & OUTSTRETCHED ARM */}
        {/* Billowing Giant Terracotta Mantle / Cloak */}
        <path
          d="M 1600 80 C 1450 60, 1280 70, 1150 140 C 1050 200, 1020 320, 1060 420 C 1120 520, 1260 580, 1420 620 C 1510 640, 1560 650, 1600 660 Z"
          fill="url(#terracottaRed)"
        />
        {/* Deep Cloak Shadows */}
        <path
          d="M 1600 140 C 1480 120, 1340 140, 1220 220 C 1160 280, 1140 380, 1200 460 C 1300 540, 1450 580, 1600 600 Z"
          fill="#661C08"
          opacity="0.6"
        />

        {/* Flowing White Chiton / Robes */}
        <path
          d="M 1600 240 C 1500 230, 1380 250, 1300 320 C 1240 380, 1220 460, 1280 540 C 1360 600, 1480 620, 1600 630 Z"
          fill="url(#whiteDrapery)"
        />

        {/* The Creator's Head & Silver Hair/Beard */}
        <circle cx="1450" cy="200" r="60" fill="url(#skinGod)" />
        {/* Flowing White Hair & Beard */}
        <path
          d="M 1390 190 C 1370 230, 1390 280, 1420 310 C 1460 340, 1520 340, 1550 300 C 1530 250, 1520 210, 1480 180 Z"
          fill="#EAE4DA"
        />

        {/* Right Powerful Extended Arm (Commanding Gesture Reaching Left) */}
        <g id="god-arm">
          {/* Shoulder coming out of drapery */}
          <path
            d="M 1320 280 C 1260 260, 1180 270, 1120 290 C 1140 330, 1200 340, 1260 335 C 1310 330, 1350 310, 1360 295 Z"
            fill="url(#skinGod)"
          />
          {/* Forearm reaching straight forward */}
          <path
            d="M 1140 285 C 1070 290, 1000 300, 940 315 C 935 335, 965 345, 1020 340 C 1080 335, 1135 320, 1150 305 Z"
            fill="url(#skinGod)"
          />
          {/* Wrist & Hand */}
          <path
            d="M 950 315 C 915 320, 890 322, 875 322 C 872 332, 890 338, 920 336 C 940 334, 955 330, 960 325 Z"
            fill="url(#skinGod)"
          />
          {/* Other Folded Fingers */}
          <path
            d="M 890 326 C 878 332, 868 340, 872 346 C 880 348, 892 340, 902 334 Z"
            fill="#BA7854"
          />
          {/* Commanding Outstretched Index Finger (Pointing left toward Adam's finger) */}
          <path
            d="M 885 322 C 865 323, 842 326, 830 328 C 826 331, 829 335, 845 334 C 865 333, 878 330, 885 327 Z"
            fill="#E2B89A"
            stroke="#9E684D"
            strokeWidth="0.8"
          />
        </g>

        {/* 4. THE TOUCH POINT: RADIANT NEON BLUE CODE SPARK < • > */}
        {/* Soft Celestial Glow Sphere behind the touching gap */}
        <circle cx="800" cy="336" r="180" fill="url(#centerGlow)" opacity="0.9" />
        <circle cx="800" cy="336" r="70" fill="#00C8FF" opacity="0.45" filter="blur(16px)" />

        {/* Electrical Plasma Spark Tendrils linking fingers */}
        <g stroke="#E0F7FF" strokeWidth="1.5" opacity="0.9" filter="drop-shadow(0 0 6px #00C8FF)">
          <path d="M 770 343 Q 785 338 792 336" />
          <path d="M 830 328 Q 815 334 808 336" />
          <path d="M 780 340 L 788 344 L 795 338" />
          <path d="M 820 332 L 812 330 L 805 335" />
        </g>

        {/* Brilliant Glowing Code Symbol: < • > centered between fingertips */}
        <g id="code-touch-symbol" filter="url(#bracketGlow)">
          {/* Left Bracket < */}
          <path
            d="M 785 314 L 766 336 L 785 358 L 781 364 L 756 336 L 781 308 Z"
            fill="url(#neonBracket)"
          />

          {/* Central Radiant Dot • */}
          <circle cx="800" cy="336" r="7.5" fill="#FFFFFF" />
          <circle cx="800" cy="336" r="12" fill="#00C8FF" opacity="0.75" />

          {/* Right Bracket > */}
          <path
            d="M 815 314 L 834 336 L 815 358 L 819 364 L 844 336 L 819 308 Z"
            fill="url(#neonBracket)"
          />
        </g>

        {/* Lens Flare Spark Rays */}
        <g stroke="#FFFFFF" strokeWidth="1.5" opacity="0.85">
          <line x1="800" y1="280" x2="800" y2="392" strokeWidth="2" opacity="0.7" />
          <line x1="744" y1="336" x2="856" y2="336" strokeWidth="2" opacity="0.7" />
          <line x1="765" y1="301" x2="835" y2="371" strokeWidth="1" opacity="0.4" />
          <line x1="765" y1="371" x2="835" y2="301" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Subtle Stardust / Floating Plasma Particles */}
        <g fill="#FFFFFF" opacity="0.9">
          <circle cx="750" cy="310" r="1.5" />
          <circle cx="775" cy="360" r="1.2" />
          <circle cx="825" cy="305" r="1.8" />
          <circle cx="845" cy="355" r="1.4" />
          <circle cx="790" cy="290" r="2" />
          <circle cx="810" cy="380" r="1.6" />
          <circle cx="720" cy="330" r="1.2" />
          <circle cx="880" cy="340" r="1.5" />
        </g>
      </svg>
    </div>
  );
};
