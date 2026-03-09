"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { Cormorant_Garamond } from "next/font/google"
import { bequta } from "@/app/fonts"
import { siteConfig } from "@/content/site"

const NAVY = "#0C2650"
const GOLD = "#E7D981"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const arialFont = {
  className: "font-sans",
  style: { fontFamily: "Arial, sans-serif" }
}

/*
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
})
*/

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "When is the wedding?",
    answer:
      `Our wedding will be held on ${siteConfig.ceremony.date} (${siteConfig.ceremony.day}) at 1:30pm. We kindly ask guests to arrive by 1:30 PM to help us begin promptly.`,
  },
  {
    question: "Where will the ceremony and reception take place?",
    answer:
      `The ceremony will be held at ${siteConfig.ceremony.location} in ${siteConfig.ceremony.address}. The reception will follow at ${siteConfig.reception.location} in ${siteConfig.reception.address}.`,
  },
  {
    question: "What time should I arrive?",
    answer:
      `Kindly arrive by ${siteConfig.ceremony.guestsTime} so we can begin the ceremony promptly at exactly ${siteConfig.ceremony.time}. The entourage will arrive at ${siteConfig.ceremony.entourageTime}. Your punctuality means so much to us!`,
  },
  {
    question: "Can I bring a plus one or additional guests?",
    answer:
      "Each invitation includes a specific number of reserved seats. Please check your invitation details in the RSVP section. If you need to request additional seats, you can use the 'Request to Join' feature, and we'll do our best to accommodate based on availability.",
  },
  {
    question: "Can I bring my children?",
    answer:
      "While we love your little ones, we kindly request an adults-only celebration so everyone can relax and enjoy the evening.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "Please refer to the attire guide below.",
  },
  {
    question: "Will there be assigned seating?",
    answer:
      "Yes, there will be assigned seating at the reception. Your table number will be displayed in the Book of Guests section once your RSVP is confirmed. Our reception team will gladly guide you to your table so you can relax and enjoy the celebration.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, parking is available at both venues. Please follow the parking signs and instructions from our venue coordinators.",
  },
  {
    question: "Can I take photos and videos during the ceremony?",
    answer:
      "We have a professional photographer and videographer capturing our special moments. We kindly ask that you keep your phones on silent and refrain from taking photos during the ceremony. However, we'd love to see your photos and videos from the reception! Please check the Snap & Share section for details on how to upload them.",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please let us know about any dietary restrictions or allergies when you RSVP. We want to ensure everyone can enjoy the celebration comfortably.",
  },
  {
    question: "How can I help the couple have a great time during their wedding?",
    answer:
      "• Pray with us for favorable weather and the continuous blessings of our Lord as we enter this new chapter of our lives as husband and wife.\n\n• RSVP as soon as your schedule is cleared.\n\n• Dress appropriately and follow our wedding motif.\n\n• Be on time.\n\n• Follow the seating arrangement in the reception.\n\n• Stay until the end of the program.\n\n• Join the activities and enjoy!",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section
      id="faq"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Section Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
        >
          Everything You Need to Know
        </p>

        <h2
          className={`${bequta.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4`}
        >
          Frequently Asked Questions
        </h2>
        
        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3`}>
          Common questions answered to help you prepare for our special day
        </p>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#E7D981]/60" />
          <div className="w-1.5 h-1.5 bg-[#E7D981]/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#E7D981]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#E7D981]/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#E7D981]/60" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-30 max-w-4xl mx-auto px-3 sm:px-5">
        {/* Main card */}
        <div className="relative bg-[#FAF7F2] backdrop-blur-md border border-[#0C2650]/20 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl overflow-hidden">
          
          {/* FAQ items */}
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6">
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-[#0C2650]/20 bg-white hover:border-[#0C2650]/40 transition-all duration-300 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0C2650]/30 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className={`${arialFont.className} font-normal pr-2 sm:pr-3 md:pr-4 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed transition-colors duration-200`} style={{ ...arialFont.style, color: NAVY }}>
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: NAVY }}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-[#FAF7F2]/80 border-t border-[#0C2650]/20">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className={`${cormorant.className} font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`} style={{ color: NAVY }}>
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="underline font-bold hover:opacity-80 transition-opacity"
                                style={{ color: NAVY }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById('guest-list')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : item.question === "Is there a dress code?" ? (
                            <div className="space-y-6 sm:space-y-8 pt-2">
                              {/* Principal Sponsor Attire */}
                              <div className="space-y-2 sm:space-y-3">
                                <h4 className={`${cormorant.className} font-bold text-sm sm:text-base md:text-lg uppercase tracking-widest`} style={{ color: NAVY }}>Principal Sponsor Attire</h4>
                                <div className={`${cormorant.className} text-xs sm:text-sm md:text-base space-y-1`} style={{ color: NAVY }}>
                                  <p><span className="font-semibold">Ninang:</span> Long gowns in curated shades of champagne and beige</p>
                                  <p><span className="font-semibold">Ninong:</span> Black suits</p>
                                </div>
                                <div className="flex gap-2 sm:gap-3 mt-3">
                                  {['#F5E6D3', '#E6D5B8', '#D2B48C'].map((color, i) => (
                                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#0C2650]/20 shadow-sm" style={{ backgroundColor: color }} />
                                  ))}
                                </div>
                              </div>

                              {/* Guest Attire */}
                              <div className="space-y-2 sm:space-y-3">
                                <h4 className={`${cormorant.className} font-bold text-sm sm:text-base md:text-lg uppercase tracking-widest`} style={{ color: NAVY }}>Guest Attire</h4>
                                <div className={`${cormorant.className} text-xs sm:text-sm md:text-base space-y-1`} style={{ color: NAVY }}>
                                  <p>Semi-formal or formal attire in gold, beige, champagne, navy or dark blue</p>
                                </div>
                                <div className="flex gap-2 sm:gap-3 mt-3">
                                  {['#C6A85E', '#E6D5B8', '#F5E6D3', '#0C2650', '#072142'].map((color, i) => (
                                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#0C2650]/20 shadow-sm" style={{ backgroundColor: color }} />
                                  ))}
                                </div>
                              </div>
                            </div>

                          ) : (
                            <p className={`${cormorant.className} font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`} style={{ color: NAVY }}>
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
