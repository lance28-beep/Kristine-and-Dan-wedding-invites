"use client"

import type React from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, MapPin } from "lucide-react"
import { motion } from "motion/react"
import { Cormorant_Garamond } from "next/font/google"
import { bequta } from "@/app/fonts"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const { groomNickname, brideNickname } = siteConfig.couple
const ceremonyVenue = siteConfig.ceremony.venue
const receptionVenue = siteConfig.reception.venue

const NAVY = "#0C2650"

type TimelineIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface TimelineEvent {
  time: string
  title: string
  description?: string
  location?: string
  icon: TimelineIcon
  imageSrc?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    time: "2:00 PM",
    title: "Ceremony",
    description: `Join us as ${groomNickname} & ${brideNickname} exchange vows and begin their life together.`,
    location: ceremonyVenue,
    icon: RingsIcon,
    imageSrc: "/weddingtimeline/WeddingCeremony.png",
  },
  {
    time: "3:00 PM",
    title: "Post ceremony photos",
    description: "Capture precious moments with family and friends after the ceremony.",
    location: ceremonyVenue,
    icon: CameraIcon,
    imageSrc: "/weddingtimeline/arrivalimage.png",
  },
  {
    time: "4:00 PM",
    title: "Cocktails and Pica-pica",
    description: "Enjoy drinks and light bites as we transition into the reception.",
    location: receptionVenue,
    icon: CocktailIcon,
    imageSrc: "/weddingtimeline/CockTailHour.png",
  },
  {
    time: "7:00 PM",
    title: "Dinner",
    description: "Share a relaxed meal together as we continue the celebration.",
    location: receptionVenue,
    icon: DinnerIcon,
    imageSrc: "/weddingtimeline/DinnerService.png",
  },
  {
    time: "8:00 PM",
    title: "Party Party",
    description: `Celebrate with ${groomNickname} & ${brideNickname} as the evening festivities begin.`,
    location: receptionVenue,
    icon: FireworksIcon,
    imageSrc: "/weddingtimeline/reception welcom.png",
  },
  {
    time: "9:00 PM",
    title: "Send off",
    description: `Help us send off ${groomNickname} & ${brideNickname} with love and well-wishes.`,
    location: receptionVenue,
    icon: CarIcon,
    imageSrc: "/weddingtimeline/SendOff.png",
  },
]

export function WeddingTimeline() {
  return (
    <Section
      id="wedding-timeline"
      className="relative py-8 sm:py-10 md:py-14 lg:py-18 overflow-hidden"
    >
      {/* Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm tracking-[0.3em] uppercase text-white mb-2`}
        >
          Day Schedule
        </p>

        <h2 className={`${bequta.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-1.5 sm:mb-3 md:mb-4`}>
          Wedding Timeline
        </h2>

        <p className={`${cormorant.className} text-[11px] sm:text-sm md:text-base lg:text-lg text-white max-w-xl mx-auto leading-relaxed px-2`}>
          A simple overview of the key moments of our day, from ceremony to send-off.
        </p>

        {/* Simple divider - white */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/50" />
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/50" />
        </div>
      </div>

      {/* Timeline - improved desktop layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* Vertical timeline line - desktop (white) */}
        <div className="hidden md:block absolute left-[4rem] md:left-[5rem] lg:left-[6rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/35 via-white/60 to-white/35 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white" />
        </div>

        {/* Mobile timeline line - white */}
        <div className="md:hidden absolute left-10 sm:left-11 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/40 via-white/60 to-white/40 pointer-events-none" />

        <div className="space-y-4 sm:space-y-5 md:space-y-8 lg:space-y-10">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.title} event={event} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const Icon = event.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative"
    >
      {/* Desktop layout: left-aligned with icon on left */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        {/* Icon on the left - centered vertically */}
        <div className="relative z-10 flex-shrink-0 flex items-center">
          <IconBadge Icon={Icon} imageSrc={event.imageSrc} />
        </div>

        {/* Card on the right */}
        <div className="flex-1">
          <TimelineCard event={event} Icon={Icon} />
        </div>
      </div>

      {/* Mobile layout: compact stacked */}
      <div className="md:hidden flex items-center gap-4">
        <div className="relative z-10 flex-shrink-0 flex items-center">
          <IconBadge Icon={Icon} mobile imageSrc={event.imageSrc} />
        </div>
        <div className="flex-1 min-w-0">
          <TimelineCard event={event} Icon={Icon} mobile />
        </div>
      </div>
    </motion.div>
  )
}

function TimelineCard({ event, Icon, mobile }: { event: TimelineEvent; Icon: TimelineIcon; mobile?: boolean }) {
  return (
    <div
      className={`rounded-lg sm:rounded-xl border border-[#0C2650]/20 bg-[#FAF7F2] backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 ${
        mobile ? "p-3" : "p-4 sm:p-5 md:p-6 lg:p-7"
      } max-w-md`}
    >
      <div className={`${mobile ? "space-y-2" : "space-y-3 md:space-y-4"}`}>
        {/* Time - navy */}
        <div className="flex items-center gap-1.5">
          <Clock
            className={`${mobile ? "w-3.5 h-3.5" : "w-4 h-4 md:w-5 md:h-5"} flex-shrink-0`}
            style={{ color: NAVY }}
          />
          <p
            className={`${mobile ? "text-[10px]" : "text-xs sm:text-sm md:text-base"} font-bold tracking-[0.15em] uppercase`}
            style={{ color: NAVY }}
          >
            {event.time}
          </p>
        </div>

        {/* Title - navy */}
        <h3
          className={`${mobile ? "text-sm sm:text-base" : "text-base sm:text-lg md:text-xl lg:text-2xl"} ${bequta.className} font-semibold leading-tight`}
          style={{ color: NAVY }}
        >
          {event.title}
        </h3>

        {/* Description - navy */}
        {event.description && (
          <p
            className={`${mobile ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm md:text-base"} ${cormorant.className} leading-relaxed`}
            style={{ color: NAVY, opacity: 0.9 }}
          >
            {event.description}
          </p>
        )}

        {/* Location - navy */}
        {event.location && (
          <div
            className={`flex items-start gap-1.5 ${
              mobile ? "pt-1.5" : "pt-2 md:pt-3"
            }`}
            style={{ borderTop: "1px solid rgba(12, 38, 80, 0.2)" }}
          >
            <MapPin
              className={`${mobile ? "w-3 h-3" : "w-3.5 h-3.5 md:w-4 md:h-4"} mt-0.5 flex-shrink-0`}
              style={{ color: NAVY }}
            />
            <p className={`${mobile ? "text-[10px]" : "text-xs md:text-sm"} ${cormorant.className} leading-relaxed`} style={{ color: NAVY, opacity: 0.85 }}>
              {event.location}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function IconBadge({
  Icon,
  mobile,
  imageSrc,
}: {
  Icon: TimelineIcon
  mobile?: boolean
  imageSrc?: string
}) {
  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt=""
        width={200}
        height={200}
        className={`${
          mobile ? "w-20 h-20" : "w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
        } object-contain filter brightness-0 invert`}
      />
    )
  }
  
  return (
    <div
      className={`${
        mobile ? "w-10 h-10" : "w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
      } rounded-full border-2 border-white/80 bg-transparent flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300`}
    >
      <Icon
        className={`${
          mobile ? "w-5 h-5" : "w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
        } text-white`}
      />
    </div>
  )
}

/* Hand-drawn–style timeline icons */

const iconStroke = "#ffffff"

function GuestsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 16a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
      <path d="M21 16a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 21 16Z" />
      <path d="M4 24.5c1.2-3 3.9-4.5 7-4.5s5.8 1.5 7 4.5" />
      <path d="M17.5 19.5A6 6 0 0 1 26 24" />
    </svg>
  )
}

function ChurchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 3v6" />
      <path d="M13.5 6H18.5" />
      <path d="M8 26V14l8-5 8 5v12" />
      <path d="M6 26h20" />
      <path d="M14 26v-6a2 2 0 0 1 4 0v6" />
      <path d="M11 18h-3" />
      <path d="M24 18h-3" />
    </svg>
  )
}

function RingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="20" r="6" />
      <circle cx="20" cy="20" r="6" />
      <path d="M14 9 16 5l2 4" />
      <path d="M13 7h6" />
    </svg>
  )
}

function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="9" width="22" height="16" rx="3" />
      <circle cx="16" cy="17" r="5" />
      <path d="M11 7h3l1-2h4l1 2h3" />
    </svg>
  )
}

function FireworksIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 5v4" />
      <path d="M9 7l2.5 2.5" />
      <path d="M23 7 20.5 9.5" />
      <path d="M8 14h4" />
      <path d="M20 14h4" />
      <path d="M11 21 8 24" />
      <path d="M21 21 24 24" />
      <circle cx="16" cy="14" r="3" />
    </svg>
  )
}

function MicrophoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="13" y="5" width="6" height="11" rx="3" />
      <path d="M11 12v1a5 5 0 0 0 10 0v-1" />
      <path d="M16 17v4" />
      <path d="M12 25h8" />
    </svg>
  )
}

function DinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="16" cy="16" r="7" />
      <path d="M7 8v12" />
      <path d="M9.5 8v12" />
      <path d="M23 8v12" />
      <path d="M5 24h22" />
    </svg>
  )
}

function CarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 21v-4l3-6h14l3 6v4" />
      <path d="M8 21h16" />
      <circle cx="11" cy="22.5" r="1.8" />
      <circle cx="21" cy="22.5" r="1.8" />
      <path d="M14 11.5 16 9l2 2.5" />
    </svg>
  )
}

function CocktailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 28h16" />
      <path d="M16 28V12" />
      <path d="M10 12h12l-1-4H11l-1 4Z" />
      <circle cx="16" cy="8" r="2" />
      <path d="M12 16h8" />
    </svg>
  )
}

function CakeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="8" y="18" width="16" height="8" rx="1" />
      <rect x="10" y="12" width="12" height="6" rx="1" />
      <rect x="12" y="8" width="8" height="4" rx="1" />
      <circle cx="14" cy="10" r="0.8" />
      <circle cx="18" cy="10" r="0.8" />
      <circle cx="13" cy="15" r="0.8" />
      <circle cx="19" cy="15" r="0.8" />
      <path d="M16 5v3" />
    </svg>
  )
}

function DanceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="10" cy="12" r="3" />
      <circle cx="22" cy="12" r="3" />
      <path d="M10 15v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
      <path d="M12 23v2" />
      <path d="M20 23v2" />
      <path d="M8 18h16" />
      <path d="M16 5v4" />
      <path d="M13 7l3-2 3 2" />
    </svg>
  )
}