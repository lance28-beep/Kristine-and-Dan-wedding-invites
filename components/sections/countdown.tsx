"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Cormorant_Garamond, Cinzel, Inter } from "next/font/google"
import { bequta } from "@/app/fonts"
import { siteConfig } from "@/content/site"
import Counter from "@/components/Counter"

// Gold accent - matches Welcome section transparent design
const GOLD = {
  main: "#E7D981",
  rgba: (a: number) => `rgba(231, 217, 129, ${a})`,
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownUnitProps {
  value: number
  label: string
}

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: "900",
})

/*
const cinzelRegular = Cinzel({
  subsets: ["latin"],
  weight: "400",
})
*/

function CountdownUnit({ value, label }: CountdownUnitProps) {
  const places = value >= 100 ? [100, 10, 1] : [10, 1]

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="relative w-full max-w-[88px] sm:max-w-[96px] md:max-w-[110px] lg:max-w-[120px]">
        <div
          className="relative rounded-xl sm:rounded-2xl border backdrop-blur-sm px-2.5 py-2.5 sm:px-3.5 sm:py-3.5 md:px-4 md:py-4 shadow-lg"
          style={{
            borderColor: GOLD.rgba(0.35),
            backgroundColor: GOLD.rgba(0.12),
            boxShadow: `0 10px 25px rgba(0,0,0,0.15)`,
          }}
        >
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={places}
              fontSize={26}
              padding={4}
              gap={2}
              textColor={GOLD.main}
              fontWeight={800}
              borderRadius={6}
              horizontalPadding={3}
              gradientHeight={0}
              gradientFrom="transparent"
              gradientTo="transparent"
              counterStyle={{ backgroundColor: "transparent" }}
              digitStyle={{
                minWidth: "1.15ch",
                fontFamily: "Arial, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                color: GOLD.main,
              }}
            />
          </div>
        </div>
      </div>
      <span
        className="text-[10px] sm:text-xs md:text-sm font-inter font-semibold uppercase tracking-[0.16em]"
        style={{ color: GOLD.rgba(0.9) }}
      >
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTimeDisplay = siteConfig.ceremony.time
  const [ceremonyMonth = "June", ceremonyDayRaw = "7", ceremonyYear = "2026"] = ceremonyDate.split(" ")
  const ceremonyDayNumber = ceremonyDayRaw.replace(/[^0-9]/g, "") || "7"
  const { brideNickname, groomNickname } = siteConfig.couple
  const ceremonyDay = siteConfig.ceremony.day || "Thursday"
  const ceremonyDayShort = ceremonyDay.slice(0, 3).toUpperCase()
  // Parse the date: December 20, 2025 at 10:30 AM PH Time (GMT+0800)
  // Extract time from "10:30 A.M., PH Time" -> "10:30 A.M."
  const timeStr = ceremonyTimeDisplay.split(",")[0].trim() // "10:30 A.M."
  
  // Create date string in ISO-like format for better parsing
  // December 20, 2025 -> 2025-12-20
  const monthMap: { [key: string]: string } = {
    "January": "01", "February": "02", "March": "03", "April": "04",
    "May": "05", "June": "06", "July": "07", "August": "08",
    "September": "09", "October": "10", "November": "11", "December": "12"
  }
  const monthNum = monthMap[ceremonyMonth] || "12"
  const dayNum = ceremonyDayNumber.padStart(2, "0")
  
  // Parse time: "3:00 PM" -> 15:00
  const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  let hour = 15 // default 3 PM
  let minutes = 0
  
  if (timeMatch) {
    hour = parseInt(timeMatch[1])
    minutes = parseInt(timeMatch[2])
    const ampm = timeMatch[3].toUpperCase()
    if (ampm === "PM" && hour !== 12) hour += 12
    if (ampm === "AM" && hour === 12) hour = 0
  }
  
  // Create date in GMT+8 (PH Time)
  // Using Date.UTC and adjusting for GMT+8 offset (subtract 8 hours to convert GMT+8 to UTC)
  const parsedTargetDate = new Date(Date.UTC(
    parseInt(ceremonyYear),
    parseInt(monthNum) - 1,
    parseInt(dayNum),
    hour - 8, // Convert GMT+8 to UTC
    minutes,
    0
  ))
  
  const targetTimestamp = Number.isNaN(parsedTargetDate.getTime())
    ? new Date(Date.UTC(2026, 1, 8, 8, 0, 0)).getTime() // Fallback: February 8, 2026, 4:00 PM GMT+8 = 8:00 AM UTC
    : parsedTargetDate.getTime()

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = targetTimestamp
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetTimestamp])

  const goldFilter = "brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(500%) hue-rotate(15deg) brightness(1.1) contrast(0.9)"

  return (
    <section
      id="countdown"
      className="relative w-full pt-10 sm:pt-12 md:pt-16 lg:pt-20 pb-0 overflow-hidden px-0"
    >
      {/* Main Card - glass effect, full width, no side margin */}
      <div
        className="relative w-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden rounded-none"
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

        {/* Corner decorations - same as Welcome */}
        <div className="absolute top-0 left-0 z-10 opacity-80 pointer-events-none">
          <img
            src="/image/left-bottom-corner.png"
            alt=""
            className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain scale-y-[-1]"
            style={{ filter: goldFilter }}
          />
        </div>
        <div className="absolute top-0 right-0 z-10 opacity-80 pointer-events-none">
          <img
            src="/image/left-bottom-corner.png"
            alt=""
            className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain scale-x-[-1] scale-y-[-1]"
            style={{ filter: goldFilter }}
          />
        </div>
        <div className="absolute bottom-0 left-0 z-10 opacity-80 pointer-events-none">
          <img
            src="/image/left-bottom-corner.png"
            alt=""
            className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain"
            style={{ filter: goldFilter }}
          />
        </div>
        <div className="absolute bottom-0 right-0 z-10 opacity-80 pointer-events-none">
          <img
            src="/image/left-bottom-corner.png"
            alt=""
            className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain scale-x-[-1]"
            style={{ filter: goldFilter }}
          />
        </div>

        {/* Content wrapper */}
        <div className="relative z-20">
      {/* Monogram - centered at top */}
      <div className="relative flex justify-center pt-8 sm:pt-10 md:pt-12 mb-6 sm:mb-8 md:mb-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 opacity-90">
            <Image
              src="/monogram/monogram_couple.png"
              alt={`${groomNickname} & ${brideNickname} Monogram`}
              fill
              className="object-contain"
              style={{ filter: goldFilter }}
              priority={false}
            />
          </div>
        </motion.div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px" style={{ backgroundColor: GOLD.rgba(0.4) }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD.main }} />
          <div className="w-8 sm:w-12 md:w-16 h-px" style={{ backgroundColor: GOLD.rgba(0.4) }} />
        </div>
        <h2 className={`${bequta.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-2 sm:mb-3 md:mb-4 drop-shadow-sm`} style={{ color: GOLD.main }}>
        Counting Down to Forever
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-light max-w-xl mx-auto leading-relaxed px-2" style={{ color: GOLD.rgba(0.9) }}>
        Join `{groomNickname}` and `{brideNickname}` as they count down to forever.
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: GOLD.rgba(0.7) }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: GOLD.rgba(0.5) }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: GOLD.rgba(0.7) }} />
        </div>
      </div>

      {/* Save The Date Card */}
      <div className="relative z-10">
        <div className="flex justify-center px-3 sm:px-4">
          <div className="max-w-2xl w-full">

            {/* Numeric countdown: Days / Hours / Minutes / Seconds */}
            <div className="mt-2 sm:mt-4 md:mt-6 font-inter">
              <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
                {/* 2x2 on mobile, 4 in a row from md+ */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-sm sm:max-w-md md:max-w-xl">
                  <CountdownUnit value={timeLeft.days} label="Days" />
                  <CountdownUnit value={timeLeft.hours} label="Hours" />
                  <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                  <CountdownUnit value={timeLeft.seconds} label="Seconds" />
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
            {/* Date Section */}
            <div className="relative p-6 sm:p-8 md:p-10 mb-6 sm:mb-8">
              <div className="w-full max-w-2xl mx-auto">
                <div
                  className={`${cinzel.className} flex flex-col items-center gap-1.5 sm:gap-2.5 md:gap-3 font-bold`}
                  style={{ color: GOLD.main }}
                >
                  <span className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.4em] sm:tracking-[0.5em]">
                    {ceremonyMonth}
                  </span>
                  <div className="flex w-full items-center gap-2 sm:gap-4 md:gap-5">
                    <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2.5">
                      <span className="h-[0.5px] flex-1" style={{ backgroundColor: GOLD.rgba(0.5) }} />
                      <span className="text-[0.6rem] sm:text-[0.7rem] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em]">
                        {ceremonyDayShort}
                      </span>
                      <span className="h-[0.5px] w-6 sm:w-8 md:w-10" style={{ backgroundColor: GOLD.rgba(0.5) }} />
                    </div>
                    <div className="relative flex items-center justify-center px-3 sm:px-4 md:px-5">
                      <span
                        className={`${inter.className} relative text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] font-black leading-none tracking-wider`}
                        style={{ color: GOLD.main }}
                      >
                        {ceremonyDayNumber.padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-1 items-center gap-1.5 sm:gap-2.5">
                      <span className="h-[0.5px] w-6 sm:w-8 md:w-10" style={{ backgroundColor: GOLD.rgba(0.5) }} />
                      <span className="text-[0.6rem] sm:text-[0.7rem] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em]">
                        {ceremonyTimeDisplay.split(",")[0]}
                      </span>
                      <span className="h-[0.5px] flex-1" style={{ backgroundColor: GOLD.rgba(0.5) }} />
                    </div>
                  </div>
                  <span className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.4em] sm:tracking-[0.5em]">
                    {ceremonyYear}
                  </span>
                </div>
              </div>
            </div>
        </div>
      </div>
      </div>
    </section>
  )
}
