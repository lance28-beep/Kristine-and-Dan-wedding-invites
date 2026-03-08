'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Playfair_Display, Cormorant_Garamond, Cinzel } from 'next/font/google';
import { siteConfig } from '@/content/site';

// Navy wedding palette - matches Hero section
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

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'] });
const cinzel = Cinzel({ subsets: ['latin'], weight: ['600', '700'] });

interface LoadingScreenProps {
  onComplete: () => void;
}

// Countdown boxes with color photos - numbers show days, hours, minutes
const COUNTDOWN_BOXES = [
  { src: '/loadingimg/image1.jpg' },
  { src: '/loadingimg/image2.jpg' },
  { src: '/loadingimg/image3.jpg' },
];

const MAIN_BW_IMAGE = '/mobile-background/couple (5).webp';
const MAIN_BW_DESKTOP = '/desktop-background/couple (5).webp';
const STAGGER_DELAY_MS = 4000; // Each image appears every 4 seconds
const BOX_TRANSITION_MS = 1200; // Slow, smooth transition
const TOTAL_DURATION_MS = COUNTDOWN_BOXES.length * STAGGER_DELAY_MS + 3000;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const [now, setNow] = useState(() => new Date());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Live countdown: days, hours, minutes until wedding (May 23, 2026, 2:00 PM)
  const countdown = useMemo(() => {
    const wedding = new Date('2026-05-23T14:00:00');
    const diff = wedding.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  }, [now]);

  const countdownText = useMemo(() => {
    const { days } = countdown;
    if (days === 0) return 'TODAY IS THE DAY';
    if (days === 1) return 'ONE DAY TO GO';
    if (days >= 28 && days <= 31) return 'ONE MONTH TO GO';
    if (days >= 58 && days <= 62) return 'TWO MONTHS TO GO';
    if (days >= 88 && days <= 93) return 'THREE MONTHS TO GO';
    if (days >= 118 && days <= 123) return 'FOUR MONTHS TO GO';
    if (days >= 148 && days <= 153) return 'FIVE MONTHS TO GO';
    return `${days} DAYS TO GO`;
  }, [countdown.days]);

  // Wedding date: 05.23.26 (month, day, year)
  const countdownNumbers = ['05', '23', '26'];
  const countdownLabels = ['MONTH', 'DAY', 'YEAR'];

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    COUNTDOWN_BOXES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleBoxes((prev) => [...prev, i]), i * STAGGER_DELAY_MS)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
      setProgress(pct);
    }, 50);

    const timer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`;
  const hashtag = `#${siteConfig.couple.groomNickname}And${siteConfig.couple.brideNickname}`;
  const productionCredit = '';

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background image with navy overlay */}
      <div className="absolute inset-0 bg-[#072142]">
        <Image
          src={isMobile ? MAIN_BW_IMAGE : MAIN_BW_DESKTOP}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Navy gradient overlays - elegant depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${COLORS.deepRoyalBlue}ee 0%, ${COLORS.primaryNavy}88 20%, transparent 50%, transparent 80%, ${COLORS.deepRoyalBlue}dd 100%)`,
          }}
        />
        {/* Soft champagne glow - romantic ambient light */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(ellipse 70% 40% at 50% 30%, ${COLORS.softChampagne}25, transparent 50%), radial-gradient(ellipse 80% 50% at 50% 85%, ${COLORS.softChampagne}30, transparent 55%)`,
          }}
        />
      </div>

      <div className="relative flex flex-col flex-1 min-h-0">
        {/* Top: headline + hashtag + countdown (readable over photo, no container) */}
        <div className="flex flex-col items-center justify-center w-full pt-12 sm:pt-16 md:pt-24 px-4 sm:px-6 flex-shrink-0">
          <div className="w-full max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span
                className="hidden sm:block h-px w-12 flex-shrink-0"
                style={{ backgroundColor: `${COLORS.softChampagne}77` }}
              />
              <p className="text-center">
                <span
                  className={`${cormorant.className} inline-block text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.36em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm border`}
                  style={{
                    color: COLORS.primaryNavy,
                    backgroundColor: `${COLORS.softChampagne}E8`,
                    borderColor: `${COLORS.mutedGold}66`,
                    textShadow: `0 1px 2px ${COLORS.softChampagne}99`,
                  }}
                >
                  Your invitation is on its way
                </span>
              </p>
              <span
                className="hidden sm:block h-px w-12 flex-shrink-0"
                style={{ backgroundColor: `${COLORS.softChampagne}77` }}
              />
          </div>

          <p className="text-center mb-4 sm:mb-5">
            <span
              className={`${cormorant.className} inline-block text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] px-3 py-1.5 rounded-full backdrop-blur-sm border`}
              style={{
                color: COLORS.primaryNavy,
                backgroundColor: `${COLORS.softChampagne}E8`,
                borderColor: `${COLORS.mutedGold}66`,
                textShadow: `0 1px 2px ${COLORS.softChampagne}99`,
              }}
            >
              {hashtag}
            </span>
          </p>

            <h2 className="text-center">
              <span
                className={`${cinzel.className} inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[0.08em] sm:tracking-[0.12em] uppercase max-w-md mx-auto leading-tight px-2`}
                style={{
                  color: COLORS.softChampagne,
                  textShadow: `0 0 16px ${COLORS.softChampagne}70, 0 0 28px ${COLORS.mutedGold}40, 0 2px 12px ${COLORS.deepRoyalBlue}99`,
                }}
              >
                {countdownText}
              </span>
            </h2>
          </div>
        </div>

        {/* Spacer - lets B&W image dominate (upper 2/3) */}
        <div className="flex-1 min-h-[12vh]" />

        {/* Middle: Three color countdown boxes - staggered reveal */}
        <div className="flex items-stretch justify-center gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 py-4 flex-shrink-0">
          {COUNTDOWN_BOXES.map((item, i) => {
            const isVisible = visibleBoxes.includes(i);
            return (
              <div
                key={i}
                className="relative flex-1 max-w-[28vw] sm:max-w-[140px] md:max-w-[160px] aspect-[3/4] overflow-hidden"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
                  transition: `opacity ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <Image
                  src={item.src}
                  alt={`${coupleNames}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 28vw, 160px"
                />
                {/* Bold wedding date number + label - right corner */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex flex-col items-end">
                  <span
                    className={`${playfair.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold select-none leading-none`}
                    style={{
                      color: COLORS.deepRoyalBlue,
                      textShadow: `0 0 14px ${COLORS.deepRoyalBlue}cc, 0 0 24px ${COLORS.softChampagne}50, 0 2px 8px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {countdownNumbers[i]}
                  </span>
                  <span
                    className={`${cinzel.className} text-[8px] sm:text-[9px] tracking-widest uppercase mt-0.5`}
                    style={{ 
                      color: COLORS.warmIvory,
                      textShadow: `0 1px 4px ${COLORS.deepRoyalBlue}99`,
                    }}
                  >
                    {countdownLabels[i]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: Names + production credit + progress bar */}
        <div className="flex flex-col items-center justify-center w-full py-6 sm:py-8 px-4 flex-shrink-0">
          <p
            className={`${cormorant.className} text-center text-sm sm:text-base tracking-[0.18em] uppercase mb-2`}
            style={{ 
              color: COLORS.warmIvory,
              textShadow: `0 2px 8px ${COLORS.deepRoyalBlue}99`,
            }}
          >
            Almost ready for
          </p>
          <div
            className={`${playfair.className} text-center text-2xl sm:text-3xl md:text-4xl mb-2 font-semibold tracking-wide`}
            style={{
              color: COLORS.softChampagne,
              textShadow: `0 0 14px ${COLORS.softChampagne}60, 0 0 24px ${COLORS.mutedGold}30, 0 2px 8px ${COLORS.deepRoyalBlue}90`,
            }}
          >
            {coupleNames}
          </div>
          {productionCredit && (
            <p
              className={`${cormorant.className} text-[10px] sm:text-xs tracking-wider`}
              style={{ color: COLORS.warmWhite }}
            >
              {productionCredit}
            </p>
          )}
          {/* Preparing message + progress bar */}
          <p
            className={`${cormorant.className} text-xs sm:text-sm tracking-[0.22em] mt-6 mb-3 uppercase`}
            style={{ 
              color: COLORS.warmWhite,
              textShadow: `0 2px 6px ${COLORS.deepRoyalBlue}99`,
            }}
          >
            Crafting your invitation experience
          </p>
          <div className="w-full max-w-xs mx-auto">
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: `${COLORS.accentBlue}55` }}
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: COLORS.mutedGold,
                  boxShadow: `0 0 12px ${COLORS.mutedGold}80, 0 0 20px ${COLORS.softChampagne}40`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
