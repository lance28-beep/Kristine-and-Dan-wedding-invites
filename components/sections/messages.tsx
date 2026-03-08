"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { MessageCircle, Heart, Sparkles, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"
import { Cormorant_Garamond } from "next/font/google"
import { bequta } from "@/app/fonts"
import { siteConfig } from "@/content/site"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

// Gold accent — matches Welcome / SpecialMessage style
const GOLD = {
  main: "#E7D981",
  rgba: (a: number) => `rgba(231, 217, 129, ${a})`,
}
/*
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})
*/

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfqfIjPgJHiNXd4TrquyCtFtMNG0WrlsyLGQ9EQuJbbxhWV4Q/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent! 💌",
        description: "Your heartfelt wishes have been delivered",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()
      
      // Reset submitted state after animation
      setTimeout(() => setIsSubmitted(false), 1000)
      
      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto px-3 sm:px-0">
      <style>{`
        .message-form-input::placeholder { color: #072142 !important; opacity: 0.85 !important; }
        .message-form-textarea::placeholder { color: #072142 !important; opacity: 0.85 !important; }
      `}</style>
      
      <Card className={`relative w-full border-2 backdrop-blur-md transition-all duration-500 group overflow-hidden rounded-xl sm:rounded-2xl ${isFocused ? 'scale-[1.01]' : ''} ${isSubmitted ? 'animate-bounce' : ''}`}
        style={{
          borderColor: isFocused ? GOLD.main : GOLD.rgba(0.4),
          backgroundColor: GOLD.rgba(0.08),
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        }}>
        {/* Glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        {isSubmitted && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none" style={{ background: `linear-gradient(135deg, ${GOLD.rgba(0.15)}, ${GOLD.rgba(0.08)})` }}>
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: GOLD.main }}>
                <Sparkles className="h-8 w-8 text-[#0C2650]" />
              </div>
              <p className="font-semibold text-lg" style={{ color: GOLD.main }}>Sent!</p>
            </div>
          </div>
        )}
        
        <CardContent className="relative p-3 sm:p-5 md:p-6 lg:p-8 xl:p-10">
          <div className="text-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            <div className="relative inline-block mb-2 sm:mb-3 md:mb-4">
              <div className="absolute inset-0 rounded-full blur-lg scale-150" style={{ backgroundColor: GOLD.rgba(0.2) }} />
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto shadow-lg" style={{ backgroundColor: GOLD.main }}>
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-[#0C2650]" />
              </div>
            </div>
            <h3 className={`${bequta.className} text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2`} style={{ color: GOLD.main }}>
              Share Your Love
            </h3>
            <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm`} style={{ color: GOLD.rgba(0.85) }}>
              Your words will be part of {coupleDisplayName}&apos;s keepsake for years to come.
            </p>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <label className={`${cormorant.className} block text-xs sm:text-sm md:text-base font-medium flex items-center gap-1.5 sm:gap-2`} style={{ color: GOLD.main }}>
                <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-300 ${focusedField === 'name' ? 'scale-110' : ''}`} style={{ backgroundColor: GOLD.rgba(0.2) }}>
                  <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" style={{ color: GOLD.main }} />
                </div>
                Your Name
              </label>
              <div className="relative">
                <Input
                  name="name"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Full Name"
                  className={`${cormorant.className} message-form-input w-full border-2 rounded-xl py-2 sm:py-2.5 md:py-3 lg:py-3.5 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base placeholder:italic transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg ${
                    focusedField === 'name' ? 'shadow-lg' : ''
                  }`}
                  style={{
                    backgroundColor: "rgba(250,247,242,0.9)",
                    borderColor: focusedField === 'name' ? GOLD.main : GOLD.rgba(0.35),
                    color: GOLD.main,
                  }}
                />
                {nameValue && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <div className="flex items-center justify-between">
                <label className={`${cormorant.className} block text-xs sm:text-sm md:text-base font-medium flex items-center gap-1.5 sm:gap-2`} style={{ color: GOLD.main }}>
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-300 ${focusedField === 'message' ? 'scale-110' : ''}`} style={{ backgroundColor: GOLD.rgba(0.2) }}>
                    <MessageCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" style={{ color: GOLD.main }} />
                  </div>
                  Your Message
                </label>
                {messageValue && (
                  <span className={`${cormorant.className} text-[10px] sm:text-xs transition-colors ${messageValue.length > 500 ? 'text-red-500' : ''}`} style={{ color: messageValue.length > 500 ? undefined : GOLD.rgba(0.7) }}>
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <div className="relative">
                <Textarea
                  name="message"
                  required
                  value={messageValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setMessageValue(e.target.value)
                    }
                  }}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={`Write a heartfelt message for ${coupleDisplayName}... share your wishes, memories, or words of love that will be treasured forever 💕`}
                  className={`${cormorant.className} message-form-textarea w-full border-2 rounded-xl min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-xs sm:text-sm md:text-base placeholder:italic placeholder:leading-relaxed transition-all duration-300 resize-none backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-5 ${focusedField === 'message' ? 'shadow-lg' : ''}`}
                  style={{
                    backgroundColor: "rgba(250,247,242,0.9)",
                    borderColor: focusedField === 'message' ? GOLD.main : GOLD.rgba(0.35),
                    color: GOLD.main,
                  }}
                />
                {messageValue && (
                  <div className="absolute right-3 top-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className={`${cormorant.className} w-full py-2 sm:py-2.5 md:py-3 lg:py-3.5 px-4 sm:px-5 md:px-6 lg:px-7 rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-500 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group border-2`}
              style={{ 
                backgroundColor: GOLD.main,
                borderColor: GOLD.rgba(0.8),
                color: "#0C2650",
                boxShadow: "0 4px 16px rgba(231,217,129,0.35)",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(231,217,129,0.45)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(231,217,129,0.35)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: "#0C2650" }} />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch("/api/messages", {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.warn("Unexpected messages response; expected an array", data)
          setMessages([])
          setLoading(false)
          return
        }
        
        const parsed = data
          .filter((m) => m.name || m.message || m.timestamp)
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <section id="messages" className="relative overflow-hidden py-12 sm:py-14 md:py-16 lg:py-20">
      <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-8 relative">
        <div className="w-full max-w-4xl relative">
          <div className="relative px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 lg:px-16 lg:py-14">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <div className="space-y-2 sm:space-y-2.5">
                <p className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em]`} style={{ color: GOLD.main }}>
                  Messages for {coupleDisplayName}
                </p>
                <h2 className={`${bequta.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl`} style={{ color: GOLD.main }}>
                  Love notes &amp; prayers
                </h2>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2 mb-2">
                <span className="h-px w-10 sm:w-16 md:w-20" style={{ backgroundColor: GOLD.rgba(0.5) }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD.main }} />
                <span className="h-px w-10 sm:w-16 md:w-20" style={{ backgroundColor: GOLD.rgba(0.5) }} />
              </div>
              <p className={`${cormorant.className} text-xs sm:text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed px-2 sm:px-4`} style={{ color: GOLD.main }}>
                Leave a short note for {coupleDisplayName}. Every wish and prayer becomes part of their forever story.
              </p>
            </div>

            {/* Form */}
            <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
              <MessageForm onMessageSent={fetchMessages} />
            </div>

            {/* Messages Display */}
            <div className="relative max-w-4xl mx-auto">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <div className="relative inline-block mb-3 sm:mb-4">
                  <div className="absolute inset-0 rounded-full blur-xl scale-150" style={{ backgroundColor: GOLD.rgba(0.2) }} />
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto shadow-lg hover:scale-110 transition-transform duration-300" style={{ backgroundColor: GOLD.main }}>
                    <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-[#0C2650]" />
                  </div>
                </div>
                <h3 className={`${bequta.className} text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2`} style={{ color: GOLD.main }}>
                  Messages from Loved Ones
                </h3>
                <p className={`${cormorant.className} text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2 sm:px-4`} style={{ color: GOLD.main }}>
                  Read the beautiful messages shared by family and friends
                </p>
              </div>
              <MessageWallDisplay messages={messages} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
