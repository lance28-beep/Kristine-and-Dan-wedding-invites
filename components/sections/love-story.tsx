"use client"

import React from 'react';
import Link from 'next/link';
import { Inter, Cormorant_Garamond } from "next/font/google";
import { StorySection } from '@/components/StorySection';
import { bequta } from "@/app/fonts"

const inter = Inter({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const NAVY_GRADIENTS = [
  { from: "#072142", to: "#0C2650" },
  { from: "#0C2650", to: "#08467F" },
  { from: "#08467F", to: "#072142" },
] as const;

const CHAMPAGNE = "#F5E6D3";
const MUTED_GOLD = "#C6A85E";
const DEEP_NAVY = "#0C2650";

const storyEvents = [
  {
    place: "Perennial Fund Services' Office",
    memories: "This was the place where their story first stirred — where ordinary days became extraordinary, and friendship gave way to love. Now, they return not as workmates, but as soulmates, ready to mark a day that will echo through every tomorrow.",
    year: "2017",
    month: "June",
    img: "/gallery/gallery (83).webp"
  },
  {
    place: "Purple Beetle",
    memories: "On the 8th of April 2018, beneath the quiet sky, the groom bared his heart and whispered his love to the bride — a moment that turned time into memory.",
    year: "2018",
    month: "Apr",
    img: "/gallery/gallery (84).webp"
  },
  {
    place: "Sagada",
    memories: "Couples first adventure together, the chill clung sweetly to their skin as the sun rose in golden hush — a quiet symphony of warmth and wonder, just like them.",
    year: "2018",
    month: "Oct",
    img: "/gallery/gallery (62).webp"
  },
  {
    place: "Monte Maria",
    memories: "Year after year, he wished to celebrate his birthday in this sacred space, where gratitude met devotion. And afterward, at The Only Place - Restaurant, they’d dine together — a tradition of joy, warmth, and love served with every dish",
    year: "2018/2019",
    month: "June",
    img: "/gallery/gallery (60).webp"
  },
  {
    place: "Bohol",
    memories: "Just like the company they belong to — Perennial, a name that speaks of forever — their love is a promise that no matter the season, it will always return, always grow, always stay. And as their teammates watched, they bore witness to something rare: a romance rooted in friendship, nurtured by time, and destined to endure. #BohoLoveGoodbye #And I will take whatever you can give",
    year: "2019",
    month: "June",
    img: "/gallery/gallery (76).webp"
  },
  {
    place: "Cagayan De Oro",
    memories: "They traveled with hearts wide open, making memories that flowed like the river beneath them. Through rushing currents and laughter’s echo, they danced with the water — a celebration of friendship, freedom, and the joy of being together.",
    year: "2019",
    month: "Oct",
    img: "/gallery/gallery (69).webp"
  },
  {
    place: "Camuiguin",
    memories: "Like Camiguin — the Island Born of Fire — their love was bold, untamed, and warm to the touch. Each shore they walked, each island they explored, carried the heat of a passion that never cooled. In the glow of volcanic sunsets and the hush of ocean breeze, they felt it: A love that burns gently, deeply, and forever.",
    year: "2019",
    month: "Oct",
    img: "/gallery/gallery (66).webp"
  },
  {
    place: "Iligan",
    memories: "In Iligan, the City of Majestic Waterfalls, they didn’t just explore nature — they discovered each other. Amid the hush of cascading waters and the cool stillness of mountain streams, their hearts quietly aligned. Here, love flowed as gently and endlessly as the waterfalls themselves.",
    year: "2019",
    month: "Oct",
    img: "/gallery/gallery (58).webp"
  },
  {
    place: "Bukidnon",
    memories: "In Bukidnon, where pineapples grow golden and the land invites adventure, their love found its rhythm. Sweet as the fruit they tasted, bold as the ATV trails they conquered — every turn, every laugh, every muddy splash became part of their story.",
    year: "2019",
    month: "Oct",
    img: "/gallery/gallery (75).webp"
  },
  {
    place: "Virtual Space",
    memories: "As the pandemic swept across the world, their love became its own defiance. Through the lenses of their cameras, they discovered angles of resilience— love that stays, love that fights, love that endures",
    year: "2020",
    month: "Pandemic",
    img: "/gallery/gallery (85).webp"
  },
  {
    place: "Rosario Church",
    memories: "Here, where hearts once hesitated, they found their way again. A second chance, wrapped in warmth and wonder — proving that love, when reborn, blooms even brighter.",
    year: "2021",
    month: "May",
    img: "/gallery/gallery (52).webp"
  },
  {
    place: "Boracay",
    memories: "Parasailing — a moment of nerves and wonder, until the view calmed their hearts. High above the world, he asked her to be his girlfriend — and the sky became their witness.",
    year: "2022",
    month: "June",
    img: "/gallery/gallery (71).webp"
  },
  {
    place: "Singapore",
    memories: "One year after love was confessed, she flew to Singapore to celebrate their first anniversary — proving that distance means nothing when hearts are bound.",
    year: "2023",
    month: "July",
    img: "/gallery/gallery (54).webp"
  },
  {
    place: "Puerto Galera",
    memories: "In a land where the sea meets the shore like a lover’s touch, they marked their second anniversary — surrounded by stunning views and the soft rhythm of waves echoing the tenderness between them",
    year: "2024",
    month: "June",
    img: "/gallery/gallery (72).webp"
  },
  {
    place: "Cebu",
    memories: "They believed love was meant to be shared. With their parents by their side, they explored a new town — tasting its food, embracing its customs, and weaving new memories into the fabric of their story. It was a celebration not just of their love, but of the family that shaped it",
    year: "2024",
    month: "Oct",
    img: "/gallery/gallery (56).webp"
  },
  {
    place: "South Korea - Lotte World",
    memories: "In a foreign land where no one knew their names, he knelt — not for tradition, but for love. It was here their journey began, with a question that sealed their hearts and a promise whispered into the wind. A road to forever.",
    year: "2025",
    month: "Apr",
    img: "/gallery/gallery (53).webp"
  },
  {
    place: "Valentino Resort - Lipa Batangas",
    memories: "Amidst the rush of work and life’s responsibilities, they chose stillness. For their 3rd Anniversary, they escaped to a haven of warmth — where good food comforted the soul, gentle massages eased the weight of time, and love was celebrated in quiet, tender ways",
    year: "2025",
    month: "June",
    img: "/gallery/gallery (64).webp"
  }
]

export function LoveStory() {
  return (
    <div 
      className="min-h-screen overflow-x-hidden"
      style={{ background: "linear-gradient(to bottom, #072142, #0C2650, #08467F, #072142)" }}
    >
      
      {/* Header */}
      <div className="pt-16 pb-10 md:pb-12 text-center px-4 flex flex-col items-center gap-2">
        <h1 
          className={`${bequta.className} text-5xl md:text-7xl tracking-wider`}
          style={{ color: CHAMPAGNE }}
        >
          Love Story
        </h1>
        <p 
          className={`${inter.className} text-xs md:text-base font-semibold tracking-[0.25em] uppercase`}
          style={{ color: "rgba(245, 230, 211, 0.85)" }}
        >
          Timeline & Memories
        </p>
      </div>

      {storyEvents.map((event, index) => {
        const g = NAVY_GRADIENTS[index % NAVY_GRADIENTS.length];
        return (
          <StorySection
            key={index}
            theme={index % 2 === 0 ? 'dark' : 'light'}
            layout={index % 2 === 0 ? 'image-left' : 'image-right'}
            isFirst={index === 0}
            isLast={index === storyEvents.length - 1}
            imageSrc={event.img}
            // title={event.place}
            text={<p>{event.memories}</p>}
            // year={event.year}
            // month={event.month}
            gradientFrom={g.from}
            gradientTo={g.to}
            showTopDivider={index > 0}
          />
        );
      })}
      
      {/* Footer Decoration */}
      <div 
        className="pt-12 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 text-center z-0 relative px-4"
        style={{ background: "linear-gradient(to bottom, #08467F, #072142)" }}
      >
        <div 
          className="w-16 sm:w-20 h-px mx-auto mb-6 sm:mb-8 opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${MUTED_GOLD}, transparent)` }}
        />
        <Link 
          href="#guest-list"
          className={`${cormorant.className} relative inline-flex items-center justify-center px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 text-sm md:text-base tracking-[0.2em] uppercase font-semibold rounded-sm border transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(198,168,94,0.4)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A85E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#072142]`}
          style={{
            color: DEEP_NAVY,
            backgroundColor: MUTED_GOLD,
            borderColor: "rgba(198, 168, 94, 0.8)",
          }}
        >
          <span className="relative z-10">Join us</span>
        </Link>
      </div>

    </div>
  );
}
