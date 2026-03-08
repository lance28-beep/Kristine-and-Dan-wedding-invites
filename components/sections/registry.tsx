"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { bequta } from "@/app/fonts"

const GCASH_QR = [
  { id: "gcash1", src: "/QR/Gcash1.png", label: "GCash 1" },
  { id: "gcash2", src: "/QR/Gcash2.png", label: "GCash 2" },
] as const

export function Registry() {
  const [activeQr, setActiveQr] = useState<"gcash1" | "gcash2">("gcash1")

  return (
    <Section
      id="registry"
      className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
        </div>

        <h2 className={`${bequta.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-2 sm:mb-3 md:mb-4`}>
          Gift Guide
        </h2>

        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
          With all that we have we are truly blessed, your presence and prayer are that we request. But if you desire to give nonetheless, monetary gift is the one we suggest.
        </p>

        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
        </div>
      </div>

      {/* GCASH QR toggle */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <h3 className={`${bequta.className} text-xl sm:text-2xl md:text-3xl font-normal text-white text-center mb-4 sm:mb-6`}>
          GCASH
        </h3>
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          {/* Toggle buttons */}
          <div className="inline-flex rounded-lg border border-white/40 bg-white/5 p-1">
            {GCASH_QR.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveQr(item.id)}
                className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeQr === item.id
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Active QR image */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl overflow-hidden bg-white shadow-lg">
            <Image
              src={activeQr === "gcash1" ? "/QR/Gcash1.png" : "/QR/Gcash2.png"}
              alt={`GCash QR code - ${activeQr === "gcash1" ? "Account 1" : "Account 2"}`}
              fill
              className="object-contain p-2"
              sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-white/90 italic">
            Thank you from the bottom of our hearts.
          </p>
        </div>
      </div>
    </Section>
  )
}
