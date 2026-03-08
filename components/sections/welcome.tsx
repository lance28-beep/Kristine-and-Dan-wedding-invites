"use client"

import { siteConfig } from "@/content/site"
import { Cormorant_Garamond } from "next/font/google"
import { bequta } from "@/app/fonts"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

// Gold accent from reference - matches SpecialMessage style
const GOLD = {
  main: "#E7D981",
  rgba: (a: number) => `rgba(231, 217, 129, ${a})`,
}

export function Welcome() {
  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom

  return (
    <section
      id="welcome"
      className="relative overflow-hidden py-12 sm:py-14 md:py-16 lg:py-20"
    >
      <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-8 relative">
        {/* Main Card - glass effect with gold tint */}
        <div
          className="w-full max-w-4xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden"
          style={{
            backgroundColor: GOLD.rgba(0.1),
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Double Border Frame */}
          <div
            className="absolute inset-3 md:inset-6 border pointer-events-none rounded-sm"
            style={{ borderColor: GOLD.rgba(0.3) }}
          />
          <div
            className="absolute inset-4 md:inset-7 border-2 pointer-events-none rounded-sm"
            style={{ borderColor: GOLD.rgba(0.5) }}
          />

          {/* Top Left Corner Decoration */}
          <div className="absolute top-0 left-0 z-10 opacity-80 pointer-events-none">
            <img
              src="/image/left-bottom-corner.png"
              alt=""
              className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain scale-y-[-1]"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(500%) hue-rotate(15deg) brightness(1.1) contrast(0.9)",
              }}
            />
          </div>

          {/* Top Right Corner Decoration */}
          <div className="absolute top-0 right-0 z-10 opacity-80 pointer-events-none">
            <img
              src="/image/left-bottom-corner.png"
              alt=""
              className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain scale-x-[-1] scale-y-[-1]"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(500%) hue-rotate(15deg) brightness(1.1) contrast(0.9)",
              }}
            />
          </div>

          {/* Bottom Left Corner Decoration */}
          <div className="absolute bottom-0 left-0 z-10 opacity-80 pointer-events-none">
            <img
              src="/image/left-bottom-corner.png"
              alt=""
              className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(500%) hue-rotate(15deg) brightness(1.1) contrast(0.9)",
              }}
            />
          </div>

          {/* Bottom Right Corner Decoration */}
          <div className="absolute bottom-0 right-0 z-10 opacity-80 pointer-events-none">
            <img
              src="/image/left-bottom-corner.png"
              alt=""
              className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain scale-x-[-1]"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(500%) hue-rotate(15deg) brightness(1.1) contrast(0.9)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center text-center px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 lg:px-16 lg:py-14 space-y-4 sm:space-y-5 md:space-y-6">
            {/* Header */}
            <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
              <p
                className={`${cormorant.className} text-[0.65rem] sm:text-[0.7rem] md:text-xs lg:text-sm uppercase tracking-[0.24em] sm:tracking-[0.28em]`}
                style={{ color: GOLD.main }}
              >
                {groomName} &amp; {brideName}
              </p>
              <h2
                className={`${bequta.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.9rem]`}
                style={{ color: GOLD.main }}
              >
                Welcome to our wedding website
              </h2>

              {/* Verse */}
              <div className="space-y-0.5 sm:space-y-1 pt-1">
                <p
                  className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm lg:text-base italic leading-relaxed`}
                  style={{ color: GOLD.main }}
                >
                  &quot;In God&apos;s perfect time, love grows and all things become beautiful.&quot;
                </p>
                <p
                  className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm lg:text-base italic leading-relaxed`}
                  style={{ color: GOLD.main }}
                >
                  &quot;Love bears all things, hopes all things, endures all things.&quot;
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <span
                  className="h-px w-10 sm:w-16 md:w-20"
                  style={{ backgroundColor: GOLD.rgba(0.5) }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: GOLD.main }}
                />
                <span
                  className="h-px w-10 sm:w-16 md:w-20"
                  style={{ backgroundColor: GOLD.rgba(0.5) }}
                />
              </div>
            </div>

            {/* Body text */}
            <div
              className={`${cormorant.className} text-[0.75rem] sm:text-[0.85rem] md:text-sm lg:text-base leading-relaxed sm:leading-6 md:leading-7 space-y-2.5 sm:space-y-3 md:space-y-4 max-w-2xl`}
              style={{ color: GOLD.main }}
            >
              <p>
                We&apos;ve found a love that&apos;s a true blessing, and we give thanks to God for
                writing the beautiful story of our journey together. With hearts full of gratitude,
                we&apos;re excited to share this blessing with you! Thank you for your love, prayers,
                and support. We can&apos;t wait to celebrate this joyful day together!
              </p>
              <p>
                Feel free to browse through important information and other helpful reminders —
                everything you need to join us in this celebration!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
