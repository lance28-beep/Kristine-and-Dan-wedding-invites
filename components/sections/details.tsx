"use client"

import { MapPin, Navigation, Shirt } from "lucide-react"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { motion } from "motion/react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { siteConfig } from "@/content/site"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
})

// Luxury navy wedding palette
const COLORS = {
  deepNavy: "#072142",
  primaryNavy: "#0C2650",
  accentBlue: "#08467F",
  champagne: "#F5E6D3",
  mutedGold: "#C6A85E",
  warmIvory: "#FAF7F2",
  goldRgba: (a: number) => `rgba(198, 168, 94, ${a})`,
}

// Hotels — main recommendations
const MAIN_HOTELS = [
  {
    name: "Richmonde Hotel Iloilo",
    label: "Prep Hotel",
    travelToChapel: "20 minutes drive to the chapel",
    travelToReception: null,
    image: "/detailsSection/Richmonde Hotel Iloilo.png",
  },
  {
    name: "Diversion 21 Hotel Iloilo",
    label: "Reception Venue",
    travelToChapel: "15 minutes drive to the chapel",
    travelToReception: null,
    image: "/detailsSection/Diversion 21 Hotel Iloilo.png",
  },
]

// Additional hotel options
const ADDITIONAL_HOTELS = [
  {
    name: "Sams' 21 Hotel",
    travelToChapel: "15 minutes drive to the chapel",
    travelToReception: "2 minute walk from reception venue",
    image: "/detailsSection/Sams’ 21 Hotel.png",
  },
  {
    name: "Seda Atria",
    travelToChapel: "20 minutes drive to chapel",
    travelToReception: "6 minutes drive to reception venue",
    image: "/detailsSection/Seda Atria  .png",
  },
]

// Restaurants & Cafés
const RESTAURANTS = [
  { name: "Dayneto's Seafood and Grill restaurant", image: "/detailsSection/Dayneto’s Seafood and Grill restaurant.png" },
  { name: "Urban Table", image: "/detailsSection/Urban Table .png" },
  { name: "Alicia’s Batchoy", image: "/detailsSection/Alicia’s Batchoy.png" },
  { name: "Monkey Grounds", image: "/detailsSection/Monkey Grounds.png" },
  { name: "Clinic Coffee", image: "/detailsSection/Clinic Coffee.png" },
  { name: "Neighbor Coffee", image: "/detailsSection/Neighbor Coffee.png" },
  { name: "Happy Endings Creamery", image: "/detailsSection/Happy endings creamery.png" },
]

// Places to explore
const PLACES = [
  { name: "Iloilo Esplanade", image: "/detailsSection/Iloilo Esplanade.png" },
  { name: "Jaro Cathedral", image: "/detailsSection/Jaro Cathedral.png" },
  { name: "Molo Church", image: "/detailsSection/Molo Church.png" },
  { name: "Molo Mansion", image: "/detailsSection/Molo Mansion.png" },
  { name: "Festive Walk Iloilo", image: "/detailsSection/Festive Walk Iloilo.png" },
]

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export function Details() {
  const ceremonyVenue = `${siteConfig.ceremony.location}, ${siteConfig.ceremony.address}`
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(ceremonyVenue)}`
  const receptionVenue = `${siteConfig.reception.location}, ${siteConfig.reception.address}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  const openInMaps = (link: string) => window.open(link, "_blank", "noopener,noreferrer")

  return (
    <section
      id="details"
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #072142, #0C2650, #08467F, #0C2650, #072142)",
      }}
    >
      {/* ─── EVENT DETAILS (Header + Ceremony & Reception) ─── */}
      <motion.div className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8" {...fadeUp}>
        <div className="max-w-5xl mx-auto">
          {/* Event Details Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div
              className="h-px w-16 sm:w-24 mx-auto mb-6"
              style={{ background: `linear-gradient(90deg, transparent, ${COLORS.mutedGold}, transparent)` }}
            />
            <h2
              className={`${cormorant.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 uppercase tracking-[0.12em]`}
              style={{ color: COLORS.champagne }}
            >
              Event Details
            </h2>
            <div
              className="h-px w-16 sm:w-24 mx-auto mb-6"
              style={{ background: `linear-gradient(90deg, transparent, ${COLORS.mutedGold}, transparent)` }}
            />
            <p
              className={`${cormorant.className} text-base sm:text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed`}
              style={{ color: COLORS.warmIvory }}
            >
              Everything you need to know about our special day
            </p>
          </div>

          {/* Ceremony & Reception Cards with Images + QR Codes */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Ceremony Card */}
            <motion.div
              className="group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              style={{
                backgroundColor: COLORS.primaryNavy,
                borderColor: COLORS.goldRgba(0.25),
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}
              whileHover={{ borderColor: COLORS.goldRgba(0.4) }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/Details/Mere Monique Home Chapel.png"
                  alt={siteConfig.ceremony.venue}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p
                    className={`${inter.className} text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1`}
                    style={{ color: COLORS.mutedGold }}
                  >
                    Ceremony
                  </p>
                  <h3 className={`${cormorant.className} text-lg sm:text-xl md:text-2xl font-semibold text-white`}>
                    {siteConfig.ceremony.venue}
                  </h3>
                  <p className={`${cormorant.className} text-sm text-white/90`}>{siteConfig.ceremony.address}</p>
                </div>
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <p className={`${inter.className} text-xs uppercase tracking-wider mb-4`} style={{ color: COLORS.mutedGold }}>
                  {siteConfig.ceremony.day} · {siteConfig.ceremony.time}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <button
                    onClick={() => openInMaps(ceremonyMapsLink)}
                    className={`flex items-center gap-2 ${cormorant.className} text-sm font-medium px-4 py-2.5 rounded-lg transition-all hover:-translate-y-0.5`}
                    style={{ backgroundColor: COLORS.mutedGold, color: COLORS.primaryNavy }}
                  >
                    <Navigation className="w-4 h-4" /> Get Directions
                  </button>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="p-2 rounded-lg border"
                      style={{ backgroundColor: COLORS.warmIvory, borderColor: COLORS.goldRgba(0.3) }}
                    >
                      <QRCodeSVG value={ceremonyMapsLink} size={72} level="M" includeMargin={false} fgColor="#0C2650" bgColor="#FAF7F2" />
                    </div>
                    <p className={`${cormorant.className} text-[10px] italic`} style={{ color: COLORS.champagne }}>
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reception Card */}
            <motion.div
              className="group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              style={{
                backgroundColor: COLORS.primaryNavy,
                borderColor: COLORS.goldRgba(0.25),
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}
              whileHover={{ borderColor: COLORS.goldRgba(0.4) }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/Details/JR Hall Diversion 21 Hotel.png"
                  alt={siteConfig.reception.venue}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p
                    className={`${inter.className} text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1`}
                    style={{ color: COLORS.mutedGold }}
                  >
                    Reception
                  </p>
                  <h3 className={`${cormorant.className} text-lg sm:text-xl md:text-2xl font-semibold text-white`}>
                    {siteConfig.reception.venue}
                  </h3>
                  <p className={`${cormorant.className} text-sm text-white/90`}>{siteConfig.reception.address}</p>
                </div>
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <p className={`${inter.className} text-xs uppercase tracking-wider mb-4`} style={{ color: COLORS.mutedGold }}>
                  {siteConfig.reception.time}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <button
                    onClick={() => openInMaps(receptionMapsLink)}
                    className={`flex items-center gap-2 ${cormorant.className} text-sm font-medium px-4 py-2.5 rounded-lg transition-all hover:-translate-y-0.5`}
                    style={{ backgroundColor: COLORS.mutedGold, color: COLORS.primaryNavy }}
                  >
                    <Navigation className="w-4 h-4" /> Get Directions
                  </button>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="p-2 rounded-lg border"
                      style={{ backgroundColor: COLORS.warmIvory, borderColor: COLORS.goldRgba(0.3) }}
                    >
                      <QRCodeSVG value={receptionMapsLink} size={72} level="M" includeMargin={false} fgColor="#0C2650" bgColor="#FAF7F2" />
                    </div>
                    <p className={`${cormorant.className} text-[10px] italic`} style={{ color: COLORS.champagne }}>
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ─── 1. DESTINATION FEATURE ─── */}
      <motion.div
        className="relative py-20 sm:py-24 md:py-32 lg:py-36 px-4 sm:px-6 md:px-8"
        style={{
          background: "linear-gradient(180deg, rgba(7,33,66,0.4) 0%, rgba(12,38,80,0.6) 50%, rgba(7,33,66,0.5) 100%)",
        }}
        {...fadeUp}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p
            className={`${inter.className} text-[10px] sm:text-xs tracking-[0.35em] uppercase mb-4`}
            style={{ color: COLORS.mutedGold }}
          >
            Destination
          </p>
          <h2
            className={`${cormorant.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight`}
            style={{ color: COLORS.champagne }}
          >
            Iloilo City
          </h2>
          <div
            className="h-px w-24 sm:w-32 mx-auto mb-8"
            style={{ background: `linear-gradient(90deg, transparent, ${COLORS.mutedGold}, transparent)` }}
          />
          <p
            className={`${cormorant.className} text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto`}
            style={{ color: "rgba(245, 230, 211, 0.92)", lineHeight: 1.75 }}
          >
            Iloilo City — where heritage meets modern charm. A place rich in culture, warm hospitality, and unforgettable
            flavors. We can&apos;t wait for you to experience it with us.
          </p>
        </div>
      </motion.div>

      {/* ─── 2. WHERE TO STAY ─── */}
      <motion.div className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8" {...fadeUp}>
        <div className="max-w-6xl mx-auto">
          <p
            className={`${inter.className} text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-2`}
            style={{ color: COLORS.mutedGold }}
          >
            Where to Stay
          </p>
          <h2
            className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-semibold mb-12`}
            style={{ color: COLORS.champagne }}
          >
            Recommended Hotels
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {MAIN_HOTELS.map((hotel) => (
              <motion.div
                key={hotel.name}
                className="group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                style={{
                  backgroundColor: COLORS.primaryNavy,
                  borderColor: COLORS.goldRgba(0.2),
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
                whileHover={{ borderColor: COLORS.goldRgba(0.4) }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                    <span
                      className={`${inter.className} inline-block text-[10px] sm:text-xs tracking-[0.2em] uppercase px-2 py-1 rounded mb-2`}
                      style={{ backgroundColor: COLORS.mutedGold, color: COLORS.primaryNavy }}
                    >
                      {hotel.label}
                    </span>
                    <h3 className={`${cormorant.className} text-xl sm:text-2xl md:text-3xl font-semibold text-white`}>
                      {hotel.name}
                    </h3>
                  </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.mutedGold }} />
                    <p className={`${cormorant.className} text-white/90`}>{hotel.travelToChapel}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Options */}
          <p
            className={`${inter.className} text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-6`}
            style={{ color: COLORS.champagne, opacity: 0.9 }}
          >
            You may also check out
          </p>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {ADDITIONAL_HOTELS.map((hotel) => (
              <motion.div
                key={hotel.name}
                className="group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                style={{
                  backgroundColor: COLORS.primaryNavy,
                  borderColor: COLORS.goldRgba(0.15),
                  boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
                }}
                whileHover={{ borderColor: COLORS.goldRgba(0.35) }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <h3 className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 ${cormorant.className} text-lg sm:text-xl font-semibold text-white`}>
                    {hotel.name}
                  </h3>
                </div>
                <div className="p-4 sm:p-5 space-y-1">
                  <p className={`${cormorant.className} text-sm text-white/90`}>{hotel.travelToChapel}</p>
                  <p className={`${cormorant.className} text-sm text-white/80`}>{hotel.travelToReception}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── 3. COUPLE'S FAVORITES ─── */}
      <motion.div
        className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
        style={{
          background: "linear-gradient(180deg, rgba(7,33,66,0.5) 0%, rgba(12,38,80,0.7) 100%)",
        }}
        {...fadeUp}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className={`${inter.className} text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-2`}
            style={{ color: COLORS.mutedGold }}
          >
            Our Favorites
          </p>
          <h2
            className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-semibold mb-6`}
            style={{ color: COLORS.champagne }}
          >
            In Iloilo City
          </h2>
          <p
            className={`${cormorant.className} text-base sm:text-lg max-w-2xl mb-12 leading-relaxed`}
            style={{ color: "rgba(245, 230, 211, 0.9)", lineHeight: 1.7 }}
          >
            While you&apos;re in Iloilo, here are some of our favorite places to eat, relax, and explore.
          </p>

          {/* Restaurants & Cafés */}
          <div className="mb-16">
            <h3
              className={`${cormorant.className} text-xl sm:text-2xl font-semibold mb-6`}
              style={{ color: COLORS.champagne }}
            >
              Restaurants & Cafés
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
              {RESTAURANTS.map((item) => (
                <motion.div
                  key={item.name}
                  className="group relative aspect-square rounded-xl overflow-hidden border transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
                  style={{
                    borderColor: COLORS.goldRgba(0.15),
                    backgroundColor: COLORS.primaryNavy,
                  }}
                  whileHover={{ borderColor: COLORS.goldRgba(0.4) }}
                  {...fadeUp}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute inset-0 flex items-end p-3 sm:p-4">
                    <p
                      className={`${cormorant.className} text-sm sm:text-base font-medium text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300`}
                    >
                      {item.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Places to Explore */}
          <div>
            <h3
              className={`${cormorant.className} text-xl sm:text-2xl font-semibold mb-6`}
              style={{ color: COLORS.champagne }}
            >
              Places to Explore
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
              {PLACES.map((item) => (
                <motion.div
                  key={item.name}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden border transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
                  style={{
                    borderColor: COLORS.goldRgba(0.15),
                    backgroundColor: COLORS.primaryNavy,
                  }}
                  whileHover={{ borderColor: COLORS.goldRgba(0.4) }}
                  {...fadeUp}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <p className={`${cormorant.className} text-sm sm:text-base font-medium text-white`}>{item.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── ATTIRE GUIDELINES ─── */}
      <motion.div className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8" {...fadeUp}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
              <div className="h-px w-10 sm:w-14 md:w-20" style={{ background: `linear-gradient(90deg, transparent, ${COLORS.mutedGold})` }} />
              <Shirt className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: COLORS.mutedGold }} />
              <div className="h-px w-10 sm:w-14 md:w-20" style={{ background: `linear-gradient(90deg, ${COLORS.mutedGold}, transparent)` }} />
            </div>
            <h2
              className={`${cormorant.className} text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 uppercase tracking-[0.12em]`}
              style={{ color: COLORS.champagne }}
            >
              Attire Guidelines
            </h2>
            <p
              className={`${cormorant.className} text-sm sm:text-base md:text-lg font-light`}
              style={{ color: COLORS.warmIvory }}
            >
              Please dress according to the guidelines below
            </p>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8 md:p-10 border"
            style={{
              backgroundColor: "rgba(250, 247, 242, 0.06)",
              borderColor: COLORS.goldRgba(0.25),
            }}
          >
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
              <div>
                <h3
                  className={`${cormorant.className} text-lg sm:text-xl font-semibold mb-4 uppercase tracking-wide`}
                  style={{ color: COLORS.champagne }}
                >
                  Principal Sponsor
                </h3>
                <p className={`${cormorant.className} text-sm sm:text-base leading-relaxed mb-2`} style={{ color: COLORS.warmIvory }}>
                  <span className="font-semibold" style={{ color: COLORS.mutedGold }}>Ninang:</span> {siteConfig.dressCode.sponsors.female}
                </p>
                <p className={`${cormorant.className} text-sm sm:text-base leading-relaxed`} style={{ color: COLORS.warmIvory }}>
                  <span className="font-semibold" style={{ color: COLORS.mutedGold }}>Ninong:</span> {siteConfig.dressCode.sponsors.male}
                </p>
                <div className="flex gap-2 mt-4">
                  {siteConfig.dressCode.colors.map((color) => (
                    <div
                      key={color}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2"
                      style={{ backgroundColor: color, borderColor: COLORS.goldRgba(0.4) }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3
                  className={`${cormorant.className} text-lg sm:text-xl font-semibold mb-4 uppercase tracking-wide`}
                  style={{ color: COLORS.champagne }}
                >
                  Guest Attire
                </h3>
                <p className={`${cormorant.className} text-sm sm:text-base leading-relaxed`} style={{ color: COLORS.warmIvory }}>
                  <span className="font-semibold" style={{ color: COLORS.mutedGold }}>Semi-formal or formal attire</span>{' '}
                  {siteConfig.dressCode.note}
                </p>
                <div className="flex gap-2 mt-4">
                  {siteConfig.dressCode.guestColors?.map((color) => (
                    <div
                      key={color}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2"
                      style={{ backgroundColor: color, borderColor: COLORS.goldRgba(0.4) }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── IMPORTANT REMINDERS ─── */}
      <motion.div
        className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8"
        style={{
          background: "linear-gradient(180deg, rgba(7,33,66,0.6) 0%, rgba(7,33,66,0.9) 100%)",
        }}
        {...fadeUp}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className={`${cormorant.className} text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10 sm:mb-12 uppercase tracking-[0.12em]`}
            style={{ color: COLORS.champagne }}
          >
            Important Reminders
          </h2>

          <div className="space-y-5 sm:space-y-6">
            <div
              className="rounded-xl p-5 sm:p-6 border"
              style={{ backgroundColor: "rgba(250, 247, 242, 0.05)", borderColor: COLORS.goldRgba(0.2) }}
            >
              <p className={`${cormorant.className} text-sm sm:text-base md:text-lg leading-relaxed`} style={{ color: COLORS.warmIvory }}>
                <span className="font-semibold" style={{ color: COLORS.mutedGold }}>Invitation Only:</span> As we celebrate this moment with our closest loved ones, we kindly ask that attendance be limited to those named on the invitation.
              </p>
            </div>
            <div
              className="rounded-xl p-5 sm:p-6 border"
              style={{ backgroundColor: "rgba(250, 247, 242, 0.05)", borderColor: COLORS.goldRgba(0.2) }}
            >
              <p className={`${cormorant.className} text-sm sm:text-base md:text-lg leading-relaxed`} style={{ color: COLORS.warmIvory }}>
                <span className="font-semibold" style={{ color: COLORS.mutedGold }}>Gift Policy:</span> We kindly ask for no boxed gifts. Monetary gifts are welcome but never expected.
              </p>
            </div>
            <div
              className="rounded-xl p-5 sm:p-6 border"
              style={{ backgroundColor: "rgba(250, 247, 242, 0.05)", borderColor: COLORS.goldRgba(0.2) }}
            >
              <p className={`${cormorant.className} text-sm sm:text-base md:text-lg leading-relaxed`} style={{ color: COLORS.warmIvory }}>
                <span className="font-semibold" style={{ color: COLORS.mutedGold }}>Adults-Only Event:</span> We love your little ones, but to keep the celebration intimate, we kindly request an adults-only event. (Children in our family and the entourage are the exception)
              </p>
            </div>
            <div
              className="rounded-xl p-5 sm:p-6 border"
              style={{ backgroundColor: "rgba(250, 247, 242, 0.05)", borderColor: COLORS.goldRgba(0.2) }}
            >
              <p className={`${cormorant.className} text-sm sm:text-base md:text-lg leading-relaxed`} style={{ color: COLORS.warmIvory }}>
                <span className="font-semibold" style={{ color: COLORS.mutedGold }}>Photo Policy:</span> We&apos;d love for everyone to be fully present. Please avoid posting photos during the celebration or ahead of time—our photographers will take care of the memories.
              </p>
            </div>
            <div
              className="rounded-xl p-5 sm:p-6 border"
              style={{ backgroundColor: "rgba(250, 247, 242, 0.05)", borderColor: COLORS.goldRgba(0.2) }}
            >
              <p className={`${cormorant.className} text-sm sm:text-base md:text-lg leading-relaxed`} style={{ color: COLORS.warmIvory }}>
                <span className="font-semibold" style={{ color: COLORS.mutedGold }}>RSVP Contact:</span> Please reach out to {siteConfig.details.rsvp.contact} for any questions.
              </p>
            </div>
            <div
              className="rounded-xl p-5 sm:p-6 border"
              style={{ backgroundColor: "rgba(250, 247, 242, 0.05)", borderColor: COLORS.goldRgba(0.2) }}
            >
              <p className={`${cormorant.className} text-sm sm:text-base md:text-lg leading-relaxed`} style={{ color: COLORS.warmIvory }}>
                <span className="font-semibold" style={{ color: COLORS.mutedGold }}>Theme Song:</span> {siteConfig.dressCode.themeSong}
              </p>
            </div>
          </div>

          <p
            className={`${cormorant.className} text-center text-sm sm:text-base md:text-lg mt-8 sm:mt-10 italic leading-relaxed`}
            style={{ color: "rgba(245, 230, 211, 0.9)" }}
          >
            Thank you for your understanding and cooperation. We look forward to celebrating with you!
          </p>
        </div>
      </motion.div>
    </section>
  )
}
