"use client"

import { useState, useEffect } from "react"
import { Heart, RefreshCw, TrendingUp, Mail, Users, MapPin, Calendar, Crown } from "lucide-react"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { bequta } from "@/app/fonts"
import Image from "next/image"

const GOLD = { main: "#E7D981", rgba: (a: number) => `rgba(231, 217, 129, ${a})` }
const NAVY = "#0C2650"
const goldFilter = "brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(500%) hue-rotate(15deg) brightness(1.1) contrast(0.9)"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
})

/*
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
})
*/

interface Guest {
  id: string | number
  name: string
  role: string
  email?: string
  contact?: string
  message?: string
  allowedGuests: number
  companions: { name: string; relationship: string }[]
  tableNumber: string
  isVip: boolean
  status: 'pending' | 'confirmed' | 'declined' | 'request'
  addedBy?: string
  createdAt?: string
  updatedAt?: string
}

export function BookOfGuests() {
  const [totalGuests, setTotalGuests] = useState(0)
  const [rsvpCount, setRsvpCount] = useState(0)
  const [confirmedGuests, setConfirmedGuests] = useState<Guest[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [previousTotal, setPreviousTotal] = useState(0)
  const [showIncrease, setShowIncrease] = useState(false)
  const [showAllGuests, setShowAllGuests] = useState(false)

  // Helper function to get initials from name
  const getInitials = (name: string): string => {
    const words = name.trim().split(' ')
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  // Helper function to format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Recently'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const fetchGuests = async (showLoading = false) => {
    if (showLoading) setIsRefreshing(true)
    
    try {
      // Fetch from local API route which connects to Google Sheets
      const response = await fetch("/api/guests", {
        cache: "no-store"
      })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      // Filter only confirmed/attending guests
      const attendingGuests = data.filter((guest) => guest.status === "confirmed")
      
      // Sort guests: VIPs first, then by updatedAt (most recent first)
      const sortedGuests = attendingGuests.sort((a, b) => {
        // VIPs come first
        if (a.isVip && !b.isVip) return -1
        if (!a.isVip && b.isVip) return 1
        
        // Then sort by most recent update
        const dateA = new Date(a.updatedAt || 0).getTime()
        const dateB = new Date(b.updatedAt || 0).getTime()
        return dateB - dateA
      })
      
      // Calculate total guests by summing allowedGuests for each confirmed guest
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        return sum + (guest.allowedGuests || 1)
      }, 0)
      
      // Show increase animation if count went up
      if (totalGuestCount > totalGuests && totalGuests > 0) {
        setPreviousTotal(totalGuests)
        setShowIncrease(true)
        setTimeout(() => setShowIncrease(false), 2000)
      }
      
      setTotalGuests(totalGuestCount)
      setRsvpCount(attendingGuests.length)
      setConfirmedGuests(sortedGuests)
      setLastUpdate(new Date())
    } catch (error: any) {
      console.error("Failed to load guests:", error)
    } finally {
      if (showLoading) {
        setTimeout(() => setIsRefreshing(false), 500)
      }
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up automatic polling every 30 seconds for real-time updates
    const pollInterval = setInterval(() => {
      fetchGuests()
    }, 30000) // 30 seconds

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests(true)
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      clearInterval(pollInterval)
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [totalGuests])

  return (
    <section id="guests" className="relative w-full z-10 py-4 sm:py-8 md:py-12 lg:py-16 overflow-hidden isolate px-0">
      <div
        className="relative w-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden rounded-none"
        style={{ backgroundColor: GOLD.rgba(0.1), backdropFilter: "blur(10px)" }}
      >
        <div className="absolute inset-3 md:inset-6 border pointer-events-none rounded-sm" style={{ borderColor: GOLD.rgba(0.3) }} />
        <div className="absolute inset-4 md:inset-7 border-2 pointer-events-none rounded-sm" style={{ borderColor: GOLD.rgba(0.5) }} />
        <div className="absolute top-0 left-0 z-10 opacity-80 pointer-events-none">
          <img src="/image/left-bottom-corner.png" alt="" className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain scale-y-[-1]" style={{ filter: goldFilter }} />
        </div>
        <div className="absolute top-0 right-0 z-10 opacity-80 pointer-events-none">
          <img src="/image/left-bottom-corner.png" alt="" className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain scale-x-[-1] scale-y-[-1]" style={{ filter: goldFilter }} />
        </div>
        <div className="absolute bottom-0 left-0 z-10 opacity-80 pointer-events-none">
          <img src="/image/left-bottom-corner.png" alt="" className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain" style={{ filter: goldFilter }} />
        </div>
        <div className="absolute bottom-0 right-0 z-10 opacity-80 pointer-events-none">
          <img src="/image/left-bottom-corner.png" alt="" className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] xl:max-w-[250px] object-contain scale-x-[-1]" style={{ filter: goldFilter }} />
        </div>

        <div className="relative z-20">
      {/* Section Header */}
      <div className="relative z-10 text-center mb-3 sm:mb-4 md:mb-6 px-2 sm:px-3 md:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.6rem] sm:text-[0.7rem] md:text-xs uppercase tracking-[0.25em] text-[#E7D981] mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 md:mb-5`}
        >
          Our Cherished Guests
        </p>

        <h2
          className={`${bequta.className} text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#E7D981] mb-1 sm:mb-2 md:mb-3`}
        >
          Book of Guests
        </h2>

        <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm text-[#E7D981] font-light max-w-lg mx-auto leading-relaxed px-2`}>
          Meet the cherished souls joining us in celebration — your presence makes our day truly special
        </p>

        {/* Decorative element */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2.5 md:mt-3">
          <div className="w-6 sm:w-10 md:w-12 h-px bg-gradient-to-r from-transparent via-[#E7D981]/80 to-transparent" />
          <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#E7D981]/80 rounded-full" />
          <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#E7D981]/60 rounded-full" />
          <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#E7D981]/80 rounded-full" />
          <div className="w-6 sm:w-10 md:w-12 h-px bg-gradient-to-l from-transparent via-[#E7D981]/80 to-transparent" />
        </div>
      </div>

      {/* Guests content */}
      <div className="relative mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        {/* Stats card - Simplified */}
        <div className="text-center mb-2.5 sm:mb-4 md:mb-6 px-2 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-white backdrop-blur-md border border-[#0C2650]/20 rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-6 shadow-md">
              
              {/* Refresh button */}
              <button
                onClick={() => fetchGuests(true)}
                disabled={isRefreshing}
                className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 sm:p-1.5 rounded-full bg-[#E7D981]/10 hover:bg-[#E7D981]/20 transition-all duration-300 disabled:opacity-50 group z-10"
                title="Refresh counts"
              >
                <RefreshCw className={`h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#E7D981] transition-transform ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'} duration-500`} />
              </button>

              {/* Main Count with inline text - navy */}
              <div className="mb-1.5 sm:mb-2.5">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
                  <h3 className={`${inter.className} text-xl sm:text-3xl md:text-4xl font-bold transition-all duration-500 ${showIncrease ? 'scale-110' : ''}`} style={{ color: NAVY }}>
                    {totalGuests}
                  </h3>
                  {showIncrease && (
                    <TrendingUp className="h-3.5 w-3.5 sm:h-5 sm:w-5 animate-bounce" style={{ color: NAVY }} />
                  )}
                  <p className={`${inter.className} text-sm sm:text-lg md:text-xl font-medium leading-tight`} style={{ color: NAVY }}>
                    {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
                  </p>
                </div>
              </div>

              {/* RSVP Count - navy */}
              <p className={`${inter.className} text-xs sm:text-base mb-2 sm:mb-3`} style={{ color: NAVY, opacity: 0.9 }}>
                {rsvpCount} {rsvpCount === 1 ? "RSVP entry" : "RSVP entries"}
              </p>
              
              {/* Message - navy */}
              <p className={`${inter.className} text-[10px] sm:text-xs md:text-sm leading-tight`} style={{ color: NAVY, opacity: 0.9 }}>
                Thank you for confirming your RSVP! Your presence means the world to us.
              </p>
            </div>
          </div>
        </div>

        {/* Guest List Display */}
        {confirmedGuests.length > 0 && (
          <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-6 mb-6 sm:mb-8 md:mb-10">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {(showAllGuests ? confirmedGuests : confirmedGuests.slice(0, 5)).map((guest) => (
                <div
                  key={guest.id}
                  className="relative group bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#0C2650]/20 hover:border-[#0C2650]/40"
                >
                  {/* Guest Header */}
                  <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-2.5 md:mb-3">
                    {/* Avatar - Mobile Optimized */}
                    <div className="relative flex-shrink-0">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-md ring-2 ring-white/50" style={{ backgroundColor: NAVY }}>
                        <span className="text-white font-semibold text-xs sm:text-base md:text-lg">
                          {getInitials(guest.name)}
                        </span>
                      </div>
                      {/* VIP Badge - Mobile Optimized */}
                      {guest.isVip && (
                        <div className="absolute -top-0.5 -right-0.5">
                          <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-r from-[#E7D981] to-[#F5E1C0] rounded-full shadow-md">
                            <Crown className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3.5 md:w-3.5 text-white fill-current" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Guest Info - Mobile Optimized - navy text */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 sm:mb-1.5">
                        <h3 className={`${bequta.className} text-xs sm:text-base md:text-lg font-semibold sm:font-bold leading-tight mb-0.5`} style={{ color: NAVY }}>
                          {guest.name}
                        </h3>
                        {guest.role && (
                          <p className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs font-medium`} style={{ color: NAVY, opacity: 0.85 }}>
                            {guest.role}
                          </p>
                        )}
                      </div>

                      {/* Email - navy */}
                      {guest.email && (
                        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] md:text-xs mb-1.5 sm:mb-2 md:mb-3" style={{ color: NAVY, opacity: 0.8 }}>
                          <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" style={{ color: NAVY }} />
                          <span className="truncate">{guest.email}</span>
                        </div>
                      )}

                      {/* Info Badges - navy */}
                      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 md:gap-2 mb-1.5 sm:mb-2 md:mb-3">
                        <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-[#0C2650]/5 border border-[#0C2650]/25 rounded sm:rounded-md md:rounded-lg">
                          <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" style={{ color: NAVY }} />
                          <span className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs font-semibold`} style={{ color: NAVY }}>
                            {guest.allowedGuests} {guest.allowedGuests === 1 ? 'Guest' : 'Guests'}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-[#0C2650]/5 border border-[#0C2650]/30 sm:border-2 rounded sm:rounded-md md:rounded-lg">
                          <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" style={{ color: NAVY }} />
                          <span className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs font-semibold sm:font-bold`} style={{ color: NAVY }}>
                            {guest.tableNumber && guest.tableNumber.trim() !== "" ? (
                              <>Table {guest.tableNumber}</>
                            ) : (
                              <span className="font-medium opacity-70">Not Assigned</span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Message - navy text */}
                      {guest.message && guest.message.trim() !== "" && (
                        <div className="relative mb-1.5 sm:mb-2.5 md:mb-3 p-2 sm:p-3 md:p-5 bg-[#FAF7F2] rounded sm:rounded-lg md:rounded-2xl border border-[#0C2650]/20 shadow-sm overflow-hidden">
                          <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 opacity-[0.06]">
                            <svg viewBox="0 0 100 100" style={{ color: NAVY }} fill="currentColor">
                              <path d="M0,0 L100,0 L0,100 Z" />
                            </svg>
                          </div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 opacity-[0.06]">
                            <svg viewBox="0 0 100 100" style={{ color: NAVY }} fill="currentColor">
                              <path d="M100,100 L0,100 L100,0 Z" />
                            </svg>
                          </div>
                          <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 md:top-2 md:left-2 opacity-25" style={{ color: NAVY }}>
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                            </svg>
                          </div>
                          <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 md:bottom-2 md:right-2 opacity-25" style={{ color: NAVY }}>
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 7h-3l-2 4v6h6v-6h-3zm-8 0H7l-2 4v6h6v-6h-3z" />
                            </svg>
                          </div>
                          <div className="relative px-0.5 sm:px-1">
                            <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-base leading-tight sm:leading-relaxed italic font-medium`} style={{ color: NAVY }}>
                              {guest.message}
                            </p>
                          </div>
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 sm:w-0.5 md:w-1 h-8 sm:h-12 md:h-16 bg-gradient-to-b from-transparent rounded-r-full" style={{ background: `linear-gradient(to bottom, transparent, ${NAVY}, transparent)` }} />
                        </div>
                      )}

                      {/* Companions - navy */}
                      {guest.companions && guest.companions.length > 0 && (
                        <div className="pt-1.5 sm:pt-2 md:pt-2.5 border-t border-[#0C2650]/20">
                          <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
                            <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" style={{ color: NAVY }} />
                            <span className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs font-semibold`} style={{ color: NAVY }}>Companions</span>
                          </div>
                          <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {guest.companions.map((companion, idx) => (
                              <div key={idx} className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-white border border-[#0C2650]/25 rounded sm:rounded-md md:rounded-lg hover:border-[#0C2650]/40 transition-colors">
                                <span className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs font-medium whitespace-nowrap`} style={{ color: NAVY }}>{companion.name}</span>
                                {companion.relationship && companion.relationship.trim() !== "" && (
                                  <span className={`${cormorant.className} text-[8px] sm:text-[9px] md:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full border whitespace-nowrap`} style={{ color: NAVY, backgroundColor: 'rgba(12, 38, 80, 0.08)', borderColor: 'rgba(12, 38, 80, 0.2)' }}>
                                    {companion.relationship}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer - navy */}
                      <div className="flex items-center gap-1 pt-1.5 sm:pt-2 md:pt-2.5 mt-1.5 sm:mt-2 md:mt-2.5 border-t border-[#0C2650]/20">
                        <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" style={{ color: NAVY, opacity: 0.7 }} />
                        <span className={`${cormorant.className} text-[8px] sm:text-[9px] md:text-[10px]`} style={{ color: NAVY, opacity: 0.8 }}>
                          Confirmed {formatDate(guest.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View More Button */}
            {!showAllGuests && confirmedGuests.length > 5 && (
              <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
                <button
                  onClick={() => setShowAllGuests(true)}
                  className={`${cormorant.className} px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-[#E7D981] backdrop-blur-md border-2 border-[#E7D981] rounded-lg sm:rounded-xl text-white font-semibold text-sm sm:text-base md:text-lg hover:bg-[#c9b96a] hover:border-[#a63a59] transition-all duration-300 shadow-md hover:shadow-lg`}
                >
                  View More ({confirmedGuests.length - 5} more)
                </button>
              </div>
            )}
          </div>
        )}

      </div>
        </div>
      </div>
    </section>
  )
}
