import React from 'react';
import footerCloudsImg from '../assets/footer-final.png';

interface HalftoneCloudsFooterProps {
  className?: string;
}

export const HalftoneCloudsFooter: React.FC<HalftoneCloudsFooterProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden select-none m-0 p-0 bg-white ${className}`}>
      <img
        src={footerCloudsImg}
        alt="Halftone Clouds Footer"
        className="w-full h-[95px] sm:h-[130px] md:h-[160px] lg:h-[180px] object-cover object-[center_70%] block pointer-events-none"
        loading="lazy"
      />
    </div>
  );
};
