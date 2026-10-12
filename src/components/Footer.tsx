import React from 'react';
import footerCloudsImg from '../assets/footer-final.png';

export const Footer: React.FC = () => {
  const scrollToStudio = () => {
    const el = document.getElementById('editor-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="open-source"
      className="relative w-full overflow-hidden flex flex-col bg-white select-none"
    >
      {/* 1. Halftone Clouds Artwork: Exactly untouched */}
      <div className="relative w-full overflow-hidden pointer-events-none">
        <img
          src={footerCloudsImg}
          alt="Halftone Clouds Artwork"
          className="w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover object-bottom block"
        />
      </div>

      {/* 2. Editorial Composition (Matching Chronicle Minimalist Aesthetic) */}
      <div className="relative z-10 w-full px-4 sm:px-8 pt-8 sm:pt-12 pb-0 flex flex-col items-center text-center">
        
        {/* Crisp Headline with Tight Modern Typography */}
        <h2 className="text-3xl sm:text-5xl md:text-[54px] font-semibold tracking-[-0.035em] text-[#111111] max-w-3xl leading-[1.15]">
          Reconnect to what matters
        </h2>

        {/* Sleek Dark Pill Button */}
        <div className="mt-5 sm:mt-6">
          <button
            onClick={scrollToStudio}
            className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#18181B] text-white text-xs sm:text-[13px] font-medium hover:bg-black hover:scale-[1.02] transition-all shadow-sm cursor-pointer active:scale-95"
          >
            Launch HTML Studio
          </button>
        </div>

        {/* Tastefully Spaced Underlined Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-7 sm:gap-11 text-xs sm:text-[13px] text-[#111111] font-medium mt-8 sm:mt-10">
          <a
            href="https://github.com/ajaykumarreddy-k"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 decoration-[#111111]/35 hover:decoration-[#111111] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ajay-kumar-reddy-krishnareddy-gari-a4885b282/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 decoration-[#111111]/35 hover:decoration-[#111111] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#features"
            className="underline underline-offset-4 decoration-[#111111]/35 hover:decoration-[#111111] transition-colors"
          >
            Features
          </a>
          <a
            href="#specifications"
            className="underline underline-offset-4 decoration-[#111111]/35 hover:decoration-[#111111] transition-colors"
          >
            Specs
          </a>
          <a
            href="#editor-studio"
            className="underline underline-offset-4 decoration-[#111111]/35 hover:decoration-[#111111] transition-colors"
          >
            Studio
          </a>
        </div>

        {/* Grand Faded Architectural Watermark Dissolving at Bottom Edge */}
        <div className="relative w-full overflow-hidden text-center select-none pointer-events-none mt-8 sm:mt-12 flex justify-center items-end">
          <div
            className="w-full text-center leading-none"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0) 95%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0) 95%)',
            }}
          >
            <span className="text-[clamp(4.5rem,15vw,13rem)] font-black tracking-[-0.03em] text-[#18181B]/[0.07] uppercase inline-block select-none transform translate-y-2 sm:translate-y-4">
              akr-paste
            </span>
          </div>
        </div>

        {/* Subtle Bottom Credit */}
        <div className="w-full text-center text-[11px] font-mono text-[#18181B]/40 pb-6 pt-1">
          &copy; {new Date().getFullYear()} AKR-paste share · open-source MIT
        </div>

      </div>
    </footer>
  );
};
