/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';

interface PrismCodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const PrismCodeEditor: React.FC<PrismCodeEditorProps> = ({
  value,
  onChange,
  placeholder = 'Paste your HTML here…',
  className = '',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Line count computation
  const lineCount = useMemo(() => {
    return value.split('\n').length;
  }, [value]);

  // Prism Highlighted HTML string
  const highlightedCode = useMemo(() => {
    try {
      const codeToHighlight = value.endsWith('\n') ? value + ' ' : value;
      return Prism.highlight(
        codeToHighlight || '',
        Prism.languages.markup || Prism.languages.html,
        'html'
      );
    } catch {
      return value;
    }
  }, [value]);

  // Synchronize scroll across pre and line-numbers
  const handleScroll = () => {
    if (!textareaRef.current) return;
    const { scrollTop, scrollLeft } = textareaRef.current;

    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  };

  // Tab key handling (2 spaces)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const nextVal = value.substring(0, start) + '  ' + value.substring(end);
      onChange(nextVal);

      // Restore cursor position
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className={`relative flex-1 min-h-0 w-full flex bg-[#FAFCFF] overflow-hidden ${className}`}>
      {/* 1. Synchronized Line Numbers Column */}
      <div
        ref={lineNumbersRef}
        className="w-12 py-4 select-none text-right pr-3 font-mono text-xs text-[#007AFF]/35 bg-[#F4F8FC] border-r border-[#007AFF]/10 overflow-hidden leading-[1.6] shrink-0"
        aria-hidden="true"
      >
        {Array.from({ length: Math.max(lineCount, 30) }, (_, i) => (
          <div key={i + 1} className="h-[20.8px] leading-[20.8px]">
            {i + 1}
          </div>
        ))}
      </div>

      {/* 2. Code Area: Prism Highlight Layer (Behind) + Native Textarea (Front) */}
      <div className="relative flex-1 min-h-0 min-w-0 h-full overflow-hidden">
        {/* Prism Highlighted Code Layer */}
        <pre
          ref={preRef}
          aria-hidden="true"
          className="absolute inset-0 m-0 p-4 font-mono text-xs sm:text-[13px] leading-[1.6] pointer-events-none overflow-hidden whitespace-pre tab-[2] bg-transparent text-[#1F2937]"
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            tabSize: 2,
          }}
        >
          <code
            className="language-html inline-block min-w-full"
            dangerouslySetInnerHTML={{ __html: highlightedCode || (placeholder ? `<span style="color:#9CA3AF">${placeholder}</span>` : '') }}
          />
        </pre>

        {/* Transparent Interactive Native Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          placeholder={placeholder}
          className="absolute inset-0 w-full h-full p-4 resize-none border-0 bg-transparent text-transparent caret-[#007AFF] font-mono text-xs sm:text-[13px] leading-[1.6] focus:outline-none focus:ring-0 overflow-auto whitespace-pre tab-[2] selection:bg-[#007AFF]/25 selection:text-transparent"
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};
