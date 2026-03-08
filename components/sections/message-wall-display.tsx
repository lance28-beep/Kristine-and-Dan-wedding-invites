"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

// Matches Welcome / messages gold accent
const GOLD = {
  main: "#E7D981",
  rgba: (a: number) => `rgba(231, 217, 129, ${a})`,
}

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-lg backdrop-blur-md rounded-xl sm:rounded-2xl border-2" style={{ backgroundColor: GOLD.rgba(0.06), borderColor: GOLD.rgba(0.2) }}>
            <CardContent className="p-2.5 sm:p-3 md:p-4 lg:p-5">
              <div className="flex justify-between items-start mb-2 sm:mb-3 md:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                  <Skeleton className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full" style={{ backgroundColor: GOLD.rgba(0.2) }} />
                  <div className="space-y-1.5 sm:space-y-2">
                    <Skeleton className="h-3 w-20 sm:w-24 md:w-32" style={{ backgroundColor: GOLD.rgba(0.18) }} />
                    <Skeleton className="h-2.5 w-16 sm:w-20 md:w-24" style={{ backgroundColor: GOLD.rgba(0.12) }} />
                  </div>
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <Skeleton className="w-3 h-3 sm:w-4 sm:h-4 rounded" style={{ backgroundColor: GOLD.rgba(0.14) }} />
                  <Skeleton className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded" style={{ backgroundColor: GOLD.rgba(0.1) }} />
                </div>
              </div>
              <Skeleton className="h-12 sm:h-14 md:h-16 w-full rounded-lg" style={{ backgroundColor: GOLD.rgba(0.1) }} />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-6 sm:py-10 md:py-14 lg:py-16 xl:py-20 px-2 sm:px-4">
        <div className="relative inline-block mb-4 sm:mb-5 md:mb-6 lg:mb-8">
          <div className="absolute inset-0 rounded-full blur-xl scale-150 animate-pulse-slow" style={{ backgroundColor: GOLD.rgba(0.2) }} />
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto shadow-lg" style={{ backgroundColor: GOLD.main }}>
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-[#0C2650]" />
          </div>
          <div className="absolute -inset-2 sm:-inset-3 rounded-full border-2 animate-ping opacity-30" style={{ borderColor: GOLD.rgba(0.3) }} />
        </div>
        <h3 className={`${cormorant.className} text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4`} style={{ color: GOLD.main }}>
          No Messages Yet
        </h3>
        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg max-w-md mx-auto leading-relaxed mb-4 sm:mb-5 md:mb-6`} style={{ color: GOLD.main }}>
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 flex justify-center">
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm rounded-full border" style={{ backgroundColor: GOLD.rgba(0.1), borderColor: GOLD.rgba(0.3) }}>
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" style={{ color: GOLD.main }} />
            <span className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm`} style={{ color: GOLD.main }}>Your message will appear here</span>
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" style={{ color: GOLD.main, animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative shadow-lg backdrop-blur-md hover:shadow-xl transition-all duration-500 group overflow-hidden transform rounded-xl sm:rounded-2xl hover:scale-[1.01] border-2 ${
            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? "none" : "fadeInUp 0.6s ease-out forwards",
            backgroundColor: GOLD.rgba(0.08),
            borderColor: GOLD.rgba(0.25),
            boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 8px 26px ${GOLD.rgba(0.2)}`;
            e.currentTarget.style.borderColor = GOLD.rgba(0.4);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.1)";
            e.currentTarget.style.borderColor = GOLD.rgba(0.25);
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300" />
          <div className="absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: `linear-gradient(90deg, ${GOLD.rgba(0.4)}, ${GOLD.main}, ${GOLD.rgba(0.4)})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="absolute inset-2 sm:inset-3 rounded-xl pointer-events-none">
            <div className="absolute inset-0 rounded-xl border transition-colors duration-300 group-hover:border-opacity-100" style={{ borderColor: GOLD.rgba(0.25) }} />
          </div>
          
          <CardContent className="relative p-2 sm:p-2.5 md:p-3 lg:p-3.5">
            <div className="flex justify-between items-start mb-1.5 sm:mb-2 md:mb-2.5">
              <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-2.5">
                <div className="relative">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ring-2 ring-white/50" style={{ backgroundColor: GOLD.main }}>
                    <span className={`${cormorant.className} text-xs sm:text-sm md:text-base font-semibold drop-shadow-sm`} style={{ color: "#0C2650" }}>
                      {msg.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -inset-1 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ backgroundColor: GOLD.rgba(0.2) }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1 sm:gap-1.5">
                    <h4 className={`${cormorant.className} text-xs sm:text-sm md:text-base font-semibold truncate transition-colors duration-300`} style={{ color: GOLD.main }}>
                      {msg.name}
                    </h4>
                    <span className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs truncate`} style={{ color: GOLD.rgba(0.75) }}>
                      {new Date(msg.timestamp).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-all duration-300 group-hover:scale-110" style={{ color: GOLD.main, fill: GOLD.rgba(0.2) }} />
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" style={{ color: GOLD.main }} />
              </div>
            </div>
            
            <div className="relative pl-4 sm:pl-6 md:pl-8 pr-2 sm:pr-4 md:pr-6 py-2 sm:py-3">
              <div className="absolute left-0 top-0 flex flex-col items-start">
                <span className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none group-hover:scale-110 transition-all duration-300`} style={{ color: GOLD.rgba(0.25) }}>"</span>
                <div className="w-8 sm:w-10 md:w-12 h-0.5 mt-1" style={{ background: `linear-gradient(90deg, ${GOLD.rgba(0.25)}, transparent)` }} />
              </div>
              <p className={`${cormorant.className} text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose italic transition-colors duration-300 relative z-10`} style={{ color: GOLD.main }}>
                {msg.message}
              </p>
              <div className="absolute right-0 bottom-0 flex flex-col items-end">
                <div className="w-8 sm:w-10 md:w-12 h-0.5 mb-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD.rgba(0.25)})` }} />
                <span className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none group-hover:scale-110 transition-all duration-300`} style={{ color: GOLD.rgba(0.3) }}>"</span>
              </div>
            </div>
            
            <div className="mt-1.5 sm:mt-2 md:mt-3 flex items-center justify-between">
              <div className="flex items-center gap-0.5 sm:gap-1">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: GOLD.rgba(0.8) }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: GOLD.rgba(0.8) }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: GOLD.rgba(0.8) }} />
              </div>
              <div className="w-14 sm:w-16 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD.rgba(0.5)}, transparent)` }} />
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
