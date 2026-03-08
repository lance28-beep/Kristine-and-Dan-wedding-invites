"use client"

import Link from "next/link"
import { useEffect } from "react"

const CHAMPAGNE = "#F5E6D3"
const MUTED_GOLD = "#C6A85E"
const DEEP_NAVY = "#0C2650"

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide the global navbar while on /gallery
    const navbar = document.querySelector("nav") as HTMLElement | null
    if (navbar) navbar.style.display = "none"
    return () => {
      if (navbar) navbar.style.display = ""
    }
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(to bottom, #072142, #0C2650, #08467F, #072142)" }}
    >
      {/* Top bar - same style as love-story (navy/champagne) */}
      <div
        className="sticky top-0 z-50 backdrop-blur-md border-b border-[#F5E6D3]/20 shadow-sm"
        style={{ backgroundColor: "rgba(7, 33, 66, 0.95)" }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm border transition-all duration-200 font-sans text-sm sm:text-base hover:opacity-90"
            style={{
              color: DEEP_NAVY,
              backgroundColor: MUTED_GOLD,
              borderColor: "rgba(198, 168, 94, 0.8)",
            }}
          >
            <span className="text-base sm:text-lg">←</span>
            <span className="hidden xs:inline">Back to main page</span>
            <span className="xs:hidden">Back</span>
          </Link>
          <div className="text-xs sm:text-sm font-sans font-medium" style={{ color: CHAMPAGNE }}>
            Gallery
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}






