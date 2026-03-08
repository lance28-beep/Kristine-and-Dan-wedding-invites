"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Heart, Music2 } from "lucide-react"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { bequta } from "@/app/fonts"

const CHAMPAGNE = "#F5E6D3"
const MUTED_GOLD = "#C6A85E"
const DEEP_NAVY = "#0C2650"
const NAVY_GRADIENT_BOTTOM = "linear-gradient(to bottom, #08467F, #072142)"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["600", "700"],
})

/*
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
})
*/

// Helper function to convert text to title case (first letter of each word uppercase)
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function Footer() {
  const year = new Date().getFullYear()
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTime = siteConfig.ceremony.time
  const receptionTime = siteConfig.reception.time
  const ceremonyVenue = siteConfig.ceremony.venue
  const receptionVenue = siteConfig.reception.venue

  // Format date with comma: "February 8 2026" -> "February 8, 2026"
  const formattedDate = ceremonyDate.replace(/(\w+ \d+) (\d+)/, "$1, $2")

  const [ceremonyMonth = "December", ceremonyDayRaw = "21", ceremonyYear = "2025"] = ceremonyDate.split(" ")
  const ceremonyDayNumber = ceremonyDayRaw.replace(/[^0-9]/g, "") || "21"

  const quotes = [
    `"I have found the one whom my soul loves." – Song of Solomon 3:4`,
    "Welcome to our wedding website! We've found a love that's a true blessing, and we give thanks to God for writing the beautiful story of our journey together.",
    "Thank you for your love, prayers, and support. We can't wait to celebrate this joyful day together!",
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
      }, 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      } else {
        setIsDeleting(false)
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
      }
    } else {
      const currentQuote = quotes[currentQuoteIndex]
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(typeTimeout)
      } else {
        setIsPaused(true)
        setIsDeleting(true)
      }
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const nav = [
    { label: "Home", href: "#home" },
    { label: "Events", href: "#details" },
    { label: "Gallery", href: "#gallery" },
    { label: "RSVP", href: "#guest-list" },
  ] as const

  return (
    <footer 
      className="relative z-20 mt-0 overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(to bottom, #072142, #0C2650, #08467F, #072142)" }}
    >
      {/* Header - same style as Love Story */}
      <div className="pt-12 sm:pt-14 md:pt-16 pb-6 sm:pb-8 text-center px-4 flex flex-col items-center gap-2">
        <h1 
          className={`${bequta.className} text-5xl md:text-7xl tracking-wider`}
          style={{ color: CHAMPAGNE }}
        >
          {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}
        </h1>
        <p 
          className={`${inter.className} text-xs md:text-base font-semibold tracking-[0.25em] uppercase`}
          style={{ color: "rgba(245, 230, 211, 0.85)" }}
        >
          {ceremonyDate}
        </p>
      </div>

      {/* Monogram - centered */}
      <div className="relative z-10 flex flex-col items-center pb-5 sm:pb-6 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 opacity-95">
            <Image
              src="/monogram/monogram_couple.png"
              alt={`${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname} monogram`}
              fill
              className="object-contain"
              priority={false}
              style={{
                filter: "brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(400%) hue-rotate(15deg) brightness(1.05) contrast(0.95)",
              }}
            />
          </div>
        </motion.div>
        <p
          className={`${cormorant.className} text-xs sm:text-sm md:text-base mt-2`}
          style={{ color: "rgba(245, 230, 211, 0.8)" }}
        >
          {toTitleCase(siteConfig.ceremony.venue)}
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pb-4 sm:pb-6">
        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-5 sm:mb-6" variants={staggerChildren} initial="initial" animate="animate">
          {/* Couple Info + Quote */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-5 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border flex-shrink-0 border-[#F5E6D3]/40">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: CHAMPAGNE }} fill={CHAMPAGNE} />
                </div>
                <h3 className={`${bequta.className} text-xl sm:text-2xl md:text-3xl font-normal`} style={{ color: CHAMPAGNE }}>{siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}</h3>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                <div className={`flex items-center gap-2 sm:gap-2.5 ${cormorant.className}`} style={{ color: "rgba(245, 230, 211, 0.9)" }}>
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: CHAMPAGNE }} />
                  <span className="text-sm sm:text-base font-medium">{ceremonyDate}</span>
                </div>
                <div className={`flex items-center gap-2 sm:gap-2.5 ${cormorant.className}`} style={{ color: "rgba(245, 230, 211, 0.9)" }}>
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: CHAMPAGNE }} />
                  <span className="text-xs sm:text-base leading-relaxed">{toTitleCase(ceremonyVenue)}</span>
                </div>
                <div className={`flex items-center gap-2 sm:gap-2.5 ${cormorant.className}`} style={{ color: "rgba(245, 230, 211, 0.9)" }}>
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: CHAMPAGNE }} />
                  <span className="text-xs sm:text-base font-medium">RSVP Deadline: {siteConfig.details.rsvp.deadline}</span>
                </div>
              </div>
            </div>

            <motion.div className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#F5E6D3]/30 bg-[#072142]/40 backdrop-blur-sm" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <blockquote className={`${cormorant.className} italic text-sm sm:text-base md:text-lg leading-relaxed min-h-[60px] sm:min-h-[70px] md:min-h-[80px]`} style={{ color: "rgba(245, 230, 211, 0.95)" }}>
                &quot;{displayedText}
                <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 ml-1 animate-pulse" style={{ backgroundColor: CHAMPAGNE }}>|</span>&quot;
              </blockquote>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: MUTED_GOLD }} />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full opacity-60" style={{ backgroundColor: MUTED_GOLD }} />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: MUTED_GOLD }} />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details */}
          <motion.div className="space-y-3 sm:space-y-4" variants={fadeInUp}>
            <motion.div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-[#F5E6D3]/25 bg-[#072142]/30 backdrop-blur-sm" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border border-[#F5E6D3]/40 flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: CHAMPAGNE }} />
                </div>
                <h4 className={`${bequta.className} font-semibold text-base sm:text-lg`} style={{ color: CHAMPAGNE }}>Ceremony</h4>
              </div>
              <div className={`space-y-2 ${cormorant.className} text-xs sm:text-sm leading-relaxed`} style={{ color: "rgba(245, 230, 211, 0.85)" }}>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" style={{ color: CHAMPAGNE }} />
                  <span>{toTitleCase(ceremonyVenue)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: CHAMPAGNE }} />
                  <span>{ceremonyTime}</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-[#F5E6D3]/25 bg-[#072142]/30 backdrop-blur-sm" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border border-[#F5E6D3]/40 flex-shrink-0">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: CHAMPAGNE }} fill={CHAMPAGNE} />
                </div>
                <h4 className={`${bequta.className} font-semibold text-base sm:text-lg`} style={{ color: CHAMPAGNE }}>Reception</h4>
              </div>
              <div className={`space-y-2 ${cormorant.className} text-xs sm:text-sm leading-relaxed`} style={{ color: "rgba(245, 230, 211, 0.85)" }}>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" style={{ color: CHAMPAGNE }} />
                  <span>{toTitleCase(receptionVenue)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: CHAMPAGNE }} />
                  <span>{receptionTime}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Follow Us + Quick Links */}
          <motion.div className="space-y-5 sm:space-y-6" variants={fadeInUp}>
            <div>
              <h4 className={`${bequta.className} font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2`} style={{ color: CHAMPAGNE }}>
                <div className="w-1.5 sm:w-2 h-6 sm:h-7 rounded-full" style={{ backgroundColor: MUTED_GOLD }} /> Follow Us
              </h4>
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#F5E6D3]/40 hover:border-[#F5E6D3] transition-all duration-200 hover:scale-110" aria-label="Facebook" style={{ color: CHAMPAGNE }}>
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#F5E6D3]/40 hover:border-[#F5E6D3] transition-all duration-200 hover:scale-110" aria-label="Instagram" style={{ color: CHAMPAGNE }}>
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#F5E6D3]/40 hover:border-[#F5E6D3] transition-all duration-200 hover:scale-110" aria-label="YouTube" style={{ color: CHAMPAGNE }}>
                  <Music2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#F5E6D3]/40 hover:border-[#F5E6D3] transition-all duration-200 hover:scale-110" aria-label="Twitter" style={{ color: CHAMPAGNE }}>
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
            <div>
              <h5 className={`${bequta.className} font-semibold text-sm sm:text-base mb-2.5 sm:mb-3`} style={{ color: CHAMPAGNE }}>Quick Links</h5>
              <div className="space-y-1.5 sm:space-y-2">
                {nav.map((item) => (
                  <a key={item.href} href={item.href} className={`block transition-colors duration-200 ${cormorant.className} text-xs sm:text-sm leading-relaxed hover:opacity-90`} style={{ color: "rgba(245, 230, 211, 0.9)" }}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row - Champagne text */}
        <motion.div className="border-t border-[#F5E6D3]/20 pt-5 sm:pt-6 md:pt-7" variants={fadeInUp}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-5">
            <div className="text-center md:text-left">
              <p className={`${cormorant.className} text-xs sm:text-sm leading-relaxed`} style={{ color: "rgba(245, 230, 211, 0.85)" }}>
                © {year} {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname} — crafted with love, prayers, and gratitude.
              </p>
              <p className={`${cormorant.className} text-xs sm:text-sm mt-1 leading-relaxed`} style={{ color: "rgba(245, 230, 211, 0.7)" }}>
                This celebration site was designed to share our story and joy with you.
              </p>
            </div>
            <div className="text-center md:text-right space-y-1">
              <p className={`${cormorant.className} text-xs sm:text-sm`} style={{ color: "rgba(245, 230, 211, 0.7)" }}>
                Developed by{" "}
                <a href="https://lance28-beep.github.io/portfolio-website/" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity underline" style={{ color: CHAMPAGNE }}>
                  Lance Valle
                </a>
              </p>
              <p className={`${cormorant.className} text-xs sm:text-sm`} style={{ color: "rgba(245, 230, 211, 0.7)" }}>
                Want a website like this? Visit{" "}
                <a href="https://www.facebook.com/WeddingInvitationNaga" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity underline" style={{ color: CHAMPAGNE }}>
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

 
    </footer>
  )
}
