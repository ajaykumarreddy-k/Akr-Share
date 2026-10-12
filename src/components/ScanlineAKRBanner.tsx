/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Horizontal bar coordinates for letterforms
interface BarSegment {
  left: number; // percentage (0 - 100)
  width: number; // percentage
}

// 18 scanline rows per letter
const LETTER_A: BarSegment[][] = [
  [{ left: 32, width: 36 }],
  [{ left: 26, width: 48 }],
  [{ left: 22, width: 20 }, { left: 58, width: 20 }],
  [{ left: 18, width: 20 }, { left: 62, width: 20 }],
  [{ left: 15, width: 20 }, { left: 65, width: 20 }],
  [{ left: 12, width: 20 }, { left: 68, width: 20 }],
  [{ left: 10, width: 20 }, { left: 70, width: 20 }],
  [{ left: 8, width: 20 }, { left: 72, width: 20 }],
  [{ left: 8, width: 84 }], // Crossbar
  [{ left: 8, width: 84 }], // Crossbar
  [{ left: 8, width: 20 }, { left: 72, width: 20 }],
  [{ left: 8, width: 20 }, { left: 72, width: 20 }],
  [{ left: 8, width: 20 }, { left: 72, width: 20 }],
  [{ left: 8, width: 20 }, { left: 72, width: 20 }],
  [{ left: 8, width: 20 }, { left: 72, width: 20 }],
  [{ left: 8, width: 20 }, { left: 72, width: 20 }],
  [{ left: 8, width: 20 }, { left: 72, width: 20 }],
  [{ left: 8, width: 20 }, { left: 72, width: 20 }],
];

const LETTER_K: BarSegment[][] = [
  [{ left: 10, width: 20 }, { left: 70, width: 20 }],
  [{ left: 10, width: 20 }, { left: 62, width: 20 }],
  [{ left: 10, width: 20 }, { left: 54, width: 20 }],
  [{ left: 10, width: 20 }, { left: 46, width: 20 }],
  [{ left: 10, width: 20 }, { left: 38, width: 20 }],
  [{ left: 10, width: 20 }, { left: 30, width: 22 }],
  [{ left: 10, width: 20 }, { left: 26, width: 22 }],
  [{ left: 10, width: 20 }, { left: 28, width: 22 }],
  [{ left: 10, width: 20 }, { left: 34, width: 20 }],
  [{ left: 10, width: 20 }, { left: 40, width: 20 }],
  [{ left: 10, width: 20 }, { left: 46, width: 20 }],
  [{ left: 10, width: 20 }, { left: 52, width: 20 }],
  [{ left: 10, width: 20 }, { left: 58, width: 20 }],
  [{ left: 10, width: 20 }, { left: 64, width: 20 }],
  [{ left: 10, width: 20 }, { left: 70, width: 20 }],
  [{ left: 10, width: 20 }, { left: 74, width: 20 }],
  [{ left: 10, width: 20 }, { left: 78, width: 20 }],
  [{ left: 10, width: 20 }, { left: 80, width: 20 }],
];

const LETTER_R: BarSegment[][] = [
  [{ left: 10, width: 68 }],
  [{ left: 10, width: 76 }],
  [{ left: 10, width: 20 }, { left: 68, width: 20 }],
  [{ left: 10, width: 20 }, { left: 70, width: 20 }],
  [{ left: 10, width: 20 }, { left: 72, width: 20 }],
  [{ left: 10, width: 20 }, { left: 72, width: 20 }],
  [{ left: 10, width: 20 }, { left: 70, width: 20 }],
  [{ left: 10, width: 76 }],
  [{ left: 10, width: 68 }],
  [{ left: 10, width: 20 }, { left: 36, width: 20 }],
  [{ left: 10, width: 20 }, { left: 42, width: 20 }],
  [{ left: 10, width: 20 }, { left: 48, width: 20 }],
  [{ left: 10, width: 20 }, { left: 54, width: 20 }],
  [{ left: 10, width: 20 }, { left: 60, width: 20 }],
  [{ left: 10, width: 20 }, { left: 66, width: 20 }],
  [{ left: 10, width: 20 }, { left: 72, width: 20 }],
  [{ left: 10, width: 20 }, { left: 78, width: 20 }],
  [{ left: 10, width: 20 }, { left: 82, width: 20 }],
];

interface LetterCellProps {
  letterData: BarSegment[][];
  label: string;
}

const LetterCell: React.FC<LetterCellProps> = ({ letterData, label }) => {
  return (
    <div className="relative flex-1 min-h-[220px] sm:min-h-[280px] md:min-h-[340px] px-3 sm:px-6 py-6 flex flex-col justify-between group">
      {/* 18 horizontal scanline rows */}
      <div className="w-full flex-1 flex flex-col justify-between gap-[3px] sm:gap-[4px]">
        {letterData.map((row, rowIdx) => (
          <div key={rowIdx} className="relative w-full h-[6px] sm:h-[8px] md:h-[10px]">
            {row.map((bar, barIdx) => (
              <div
                key={barIdx}
                className="absolute top-0 bottom-0 bg-white rounded-[2px] transition-all duration-200 group-hover:bg-[#E0E7FF] group-hover:shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                style={{
                  left: `${bar.left}%`,
                  width: `${bar.width}%`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Subtle bottom letter label */}
      <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase mt-4 text-center">
        glyph // {label}
      </div>
    </div>
  );
};

export const ScanlineAKRBanner: React.FC = () => {
  return (
    <div className="relative w-full bg-[#0E15EC] text-white overflow-hidden select-none border-t border-b border-[#3B46FF]">
      {/* Background CRT scanlines texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 z-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* Monumental AKR Scanline Letters Container */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-6 sm:py-10 relative z-20">
        <div className="grid grid-cols-3 divide-x divide-white/20 border-x border-white/20">
          <LetterCell letterData={LETTER_A} label="A" />
          <LetterCell letterData={LETTER_K} label="K" />
          <LetterCell letterData={LETTER_R} label="R" />
        </div>
      </div>
    </div>
  );
};
