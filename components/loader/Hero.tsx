import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

// Navy wedding palette - matches Hero section & LoadingScreen
const COLORS = {
  primaryNavy: '#0C2650',
  deepRoyalBlue: '#072142',
  accentBlue: '#08467F',
  softChampagne: '#F5E6D3',
  warmIvory: '#FAF7F2',
  mutedGold: '#C6A85E',
  softBlush: '#E8CFCF',
  warmWhite: 'rgba(250, 247, 242, 0.95)',
} as const;

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

const desktopImages: string[] = [
  '/desktop-background/couple (1).webp',
  '/desktop-background/couple (2).webp',
  '/desktop-background/couple (3).webp',
  '/desktop-background/couple (4).webp',
  '/desktop-background/couple (5).webp',
];

const mobileImages: string[] = [
  '/mobile-background/couple (1).webp',
  '/mobile-background/couple (2).webp',
  '/mobile-background/couple (3).webp',
  '/mobile-background/couple (4).webp',
  '/mobile-background/couple (5).webp',
];

export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 768px)');
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
    }, 5500);
    return () => clearInterval(timer);
  }, [mounted]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setContentVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [visible]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gentleFloat {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-8px);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const images = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile]);

  return (
      <div className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: i === index ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
            }}
          >
            <Image
              src={src}
              alt="Couple"
              fill
              quality={90}
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        
        {/* Navy gradient overlays - elegant depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${COLORS.deepRoyalBlue}88 0%, ${COLORS.primaryNavy}66 30%, transparent 55%), linear-gradient(to top, ${COLORS.deepRoyalBlue}cc 0%, ${COLORS.primaryNavy}99 40%, transparent 70%)`,
          }}
        />
        {/* Soft champagne glow - romantic ambient light */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${COLORS.softChampagne}30, transparent 55%), radial-gradient(ellipse at center, transparent 30%, ${COLORS.deepRoyalBlue}50 100%)`,
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        
        {/* Top Logo/Monogram */}
        <div 
          className={`mb-auto mt-8 transition-all duration-1000 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex items-center justify-center">
            {/* Monogram Image with subtle animation */}
            <div 
              className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 transition-transform duration-700 ease-out hover:scale-105"
              style={{
                animation: contentVisible ? 'gentleFloat 3s ease-in-out infinite' : 'none'
              }}
            >
              <Image
                src="/monogram/monogram_couple.png"
                alt="Dan & Kristine monogram"
                fill
                className="object-contain drop-shadow-lg"
                priority
                style={{
                  filter:
                    `brightness(0) invert(1) drop-shadow(0 0 6px ${COLORS.softChampagne}) drop-shadow(0 0 12px ${COLORS.mutedGold})`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-5 sm:gap-6 pb-14 sm:pb-16 md:pb-20">
          {/* "You are" - font style unchanged (Great Vibes) */}
          <h2
            className={`text-6xl md:text-8xl transform -rotate-6 transition-all duration-1000 ease-out delay-200 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              color: COLORS.softChampagne,
              textShadow: `0 0 10px ${COLORS.softChampagne}, 0 0 20px ${COLORS.mutedGold}60`,
            }}
          >
            You are
          </h2>
          
          {/* "Invited!" - font style unchanged (Cinzel) */}
          <h1
            className={`text-5xl md:text-7xl font-bold tracking-wider uppercase transition-all duration-1000 ease-out delay-300 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              color: COLORS.softChampagne,
              textShadow: `0 0 10px ${COLORS.softChampagne}, 0 0 20px ${COLORS.mutedGold}60`,
              letterSpacing: '0.05em',
            }}
          >
            Invited!
          </h1>

          <button
            onClick={() => onOpen()}
            className={`px-10 py-4 font-serif text-sm tracking-[0.2em] uppercase rounded-sm border transition-all duration-500 ease-out delay-500 shadow-lg hover:shadow-xl ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              backgroundColor: COLORS.mutedGold,
              borderColor: COLORS.mutedGold,
              color: COLORS.primaryNavy,
              boxShadow: `0 8px 24px ${COLORS.mutedGold}50`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#D4B96A';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = '#D4B96A';
              e.currentTarget.style.boxShadow = `0 12px 28px ${COLORS.mutedGold}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.mutedGold;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = COLORS.mutedGold;
              e.currentTarget.style.boxShadow = `0 8px 24px ${COLORS.mutedGold}50`;
            }}
          >
            <span
              style={{ fontFamily: '"Cinzel", serif', fontWeight: 600, color: COLORS.primaryNavy }}
            >
              Open Invitation
            </span>
          </button>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};