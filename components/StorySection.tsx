import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Cormorant_Garamond, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["700", "900"],
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const COLORS = {
  deepNavy: "#072142",
  primaryNavy: "#0C2650",
  accentBlue: "#08467F",
  champagne: "#F5E6D3",
  mutedGold: "#C6A85E",
  warmIvory: "#FAF7F2",
}

interface StorySectionProps {
  imageSrc: string;
  title?: string;
  text: React.ReactNode;
  layout: 'image-left' | 'image-right';
  theme: 'dark' | 'light';
  isFirst?: boolean;
  isLast?: boolean;
  year?: string;
  month?: string;
  gradientFrom?: string;
  gradientTo?: string;
  showTopDivider?: boolean;
}

export const StorySection: React.FC<StorySectionProps> = ({ 
  imageSrc, 
  title, 
  text, 
  layout, 
  theme,
  isFirst = false,
  isLast = false,
  year,
  month,
  gradientFrom = COLORS.primaryNavy,
  gradientTo = COLORS.accentBlue,
  showTopDivider = false,
}) => {
  const bgGradient = `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`;
  
  // Animation Hook
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } 
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Visual Styles
  const imageFrameClass = 'bg-white/95 p-1.5 md:p-3 shadow-lg backdrop-blur-sm';

  // Rotation
  const rotation = layout === 'image-left' ? 'rotate-1 md:rotate-2' : '-rotate-1 md:-rotate-2';

  // FORCED Side-by-Side Layout (Visual structure preserved on Mobile)
  // Instead of switching to flex-col, we keep flex-row (or reverse)
  const flexDirection = layout === 'image-left' ? 'flex-row' : 'flex-row-reverse';
  const textAlignment = layout === 'image-left' ? 'text-left' : 'text-left md:text-right'; // Keep text left aligned usually looks better in tight columns, or alternate

  return (
    <div className="relative overflow-hidden" style={{ background: bgGradient }}>
      {/* Gold divider between sections */}
      {showTopDivider && (
        <div 
          className="absolute top-0 left-0 right-0 h-px z-20 opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${COLORS.mutedGold}, transparent)` }}
        />
      )}
      <div 
        ref={sectionRef}
        className={`container mx-auto px-2 md:px-12 py-12 md:py-32 relative z-10 transition-all duration-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Gap is very small on mobile (gap-2) to fit content side-by-side */}
        <div className={`flex ${flexDirection} items-center justify-between gap-3 md:gap-16`}>
          
          {/* Image Column - Approx 45% width on mobile */}
          <div className="w-[45%] md:w-5/12 flex flex-col items-center justify-center shrink-0 gap-4">
            <div className={`
              relative w-full md:max-w-md 
              transition-all duration-500 delay-200 ease-out
              ${rotation}
              ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
            `}>
               <div className={`${imageFrameClass} w-full`}>
                 <div 
                   className="w-full overflow-hidden relative group cursor-pointer"
                   onClick={() => setIsModalOpen(true)}
                 >
                   <img 
                     src={imageSrc} 
                     alt="Story Moment" 
                     className="w-full h-auto transition-transform duration-500 group-hover:scale-105 block"
                   />
                 </div>
               </div>
            </div>
            
            {(year || month) && (
              <div 
                className={`relative text-center ${inter.className}
                  transition-all duration-500 delay-300
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ color: COLORS.warmIvory }}
              >
                {/* Soft radial glow behind year/month */}
                <div 
                  className="absolute inset-0 -m-4 rounded-full opacity-40 blur-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${COLORS.mutedGold}40, transparent 70%)` }}
                  aria-hidden
                />
                <div className="relative z-10">
                  {month && <div className="text-xs md:text-xl tracking-[0.25em] uppercase mb-1 font-bold">{month}</div>}
                  {year && <div className="text-xl md:text-4xl font-black tracking-[0.15em] uppercase">{year}</div>}
                </div>
              </div>
            )}
          </div>
          {/* Text Column - Approx 55% width on mobile */}
          <div className="w-[55%] md:w-5/12" style={{ color: COLORS.warmIvory }}>
            {title && (
              <h2 
                className={`${cormorant.className} text-2xl md:text-5xl lg:text-6xl mb-2 md:mb-6 tracking-wide leading-tight font-semibold
                  transition-all duration-500 delay-300
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
                style={{ color: COLORS.champagne }}
              >
                {title}
              </h2>
            )}
            
            <div 
              className={`${cormorant.className} text-[11px] leading-[1.6] sm:text-sm md:text-xl md:leading-[1.8] space-y-2 md:space-y-4 font-normal
                transition-all duration-500 delay-500
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ color: COLORS.warmIvory }}
            >
              {text}
            </div>
          </div>
        </div>
      </div>
      {/* Modal using Portal for correct z-index layering */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
                className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-2 right-2 z-10 text-white/90 hover:text-white transition-colors focus:outline-none p-1.5 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img 
                  src={imageSrc} 
                  alt={title || "Story Moment"} 
                  className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-md shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

