"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Instagram, Facebook, Twitter, Share2, Copy, Download, Check } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"

const GOLD = { main: "#E7D981", rgba: (a: number) => `rgba(231, 217, 129, ${a})` }
const NAVY = "#0C2650"
const goldFilter = "brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(500%) hue-rotate(15deg) brightness(1.1) contrast(0.9)"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond } from "next/font/google"
import { bequta } from "@/app/fonts"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

/*
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
})
*/

export function SnapShare() {
  const [copiedHashtagIndex, setCopiedHashtagIndex] = useState<number | null>(null)
  const [copiedAllHashtags, setCopiedAllHashtags] = useState(false)
  const [copiedDriveLink, setCopiedDriveLink] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const driveLink = "https://drive.google.com/drive/folders/1QkeY6ta6ff3-EpqocueEliUahA-Sec_Z?usp=sharing"
  const hashtags = [siteConfig.snapShare.hashtag]
  const allHashtagsText = hashtags.join(" ")
  const groomNickname = siteConfig.couple.groomNickname
  const brideNickname = siteConfig.couple.brideNickname
  const sanitizedGroomName = groomNickname.replace(/\s+/g, "")
  const sanitizedBrideName = brideNickname.replace(/\s+/g, "")

  const shareText = `Celebrate ${groomNickname} & ${brideNickname}'s wedding! Explore the details and share your special memories: ${websiteUrl} ${allHashtagsText} ✨`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])


  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    }

    const target = urls[platform]
    if (target) {
      window.open(target, "_blank", "width=600,height=400")
    }
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `${sanitizedGroomName.toLowerCase()}-${sanitizedBrideName.toLowerCase()}-wedding-qr.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const downloadDriveQRCode = () => {
    const canvas = document.getElementById("drive-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "drive-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const copyHashtag = async (hashtag: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hashtag)
      setCopiedHashtagIndex(index)
      setTimeout(() => setCopiedHashtagIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyAllHashtags = async () => {
    try {
      await navigator.clipboard.writeText(allHashtagsText)
      setCopiedAllHashtags(true)
      setTimeout(() => setCopiedAllHashtags(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyDriveLink = async () => {
    if (driveLink) {
      try {
        await navigator.clipboard.writeText(driveLink)
        setCopiedDriveLink(true)
        setTimeout(() => setCopiedDriveLink(false), 2000)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section id="snap-share" className="relative w-full overflow-hidden py-10 sm:py-16 md:py-20 lg:py-24 px-0">
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

        <div className="relative z-20 max-w-6xl mx-auto px-3 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-16">
        <motion.div
          className="text-center mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-12 md:mb-14"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className={`${cormorant.className} text-[0.6rem] sm:text-[0.7rem] md:text-xs uppercase tracking-[0.28em] text-[#E7D981] mt-8 sm:mt-10 md:mt-12 mb-2 sm:mb-3`}>
            Share Your Memories
          </p>
          <h2 className={`${bequta.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#E7D981] mt-2 sm:mt-3 mb-2 sm:mb-4`}>
            Capture & Share the Celebration
          </h2>
          <p className={`${cormorant.className} text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2 text-white`}>
            Capture the beautiful moments of {groomNickname} & {brideNickname}&apos;s wedding day. Share your favorite memories so our keepsake gallery glows with every smile, embrace, and celebration from this special day.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#E7D981]/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E7D981]/80" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#E7D981]/50" />
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-10" variants={staggerChildren} initial="initial" animate="animate">
          <motion.div
            className="h-full lg:order-1"
            variants={fadeInUp}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-[#FAF7F2] rounded-xl sm:rounded-[22px] p-3 sm:p-5 md:p-8 shadow-xl h-full flex flex-col justify-start border border-[#0C2650]/20">
              <div className="flex flex-col w-full">
                <h4 className={`${bequta.className} text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-4 text-center`} style={{ color: NAVY }}>
                  Our Favorite Moments
                </h4>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:gap-4">
                  <motion.div
                    className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-[#0C2650]/20 hover:border-[#0C2650]/40 transition-all"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Image src="/mobile-background/couple (4).webp" alt="Wedding moment 1" fill className="object-cover" style={{ imageOrientation: "from-image" }} />
                  </motion.div>
                  <motion.div
                    className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-[#0C2650]/20 hover:border-[#0C2650]/40 transition-all"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Image src="/mobile-background/couple (5).webp" alt="Wedding moment 2" fill className="object-cover" style={{ imageOrientation: "from-image" }} />
                  </motion.div>
                  <motion.div
                    className="relative col-span-2 aspect-[3/2] rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-[#0C2650]/20 hover:border-[#0C2650]/40 transition-all"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Image src="/desktop-background/couple (5).webp" alt="Wedding moment 3" fill className="object-cover" />
                  </motion.div>
                </div>
                <p className={`${cormorant.className} text-xs sm:text-sm text-center mt-3 sm:mt-5 px-1.5 leading-relaxed`} style={{ color: NAVY, opacity: 0.9 }}>
                  Share your snapshots to be featured in our keepsake gallery.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-3 sm:space-y-5 lg:space-y-6 h-full flex flex-col lg:order-2" variants={fadeInUp}>
            {/* <div className="flex-1">
              <div className="bg-[#FAF7F2] rounded-xl sm:rounded-[22px] p-3 sm:p-5 md:p-8 shadow-xl text-center h-full flex flex-col border border-[#0C2650]/20">
                <h4 className={`${bequta.className} text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3`} style={{ color: NAVY }}>
                  Share Our Wedding Website
                </h4>
                <p className={`${cormorant.className} text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed px-1`} style={{ color: NAVY, opacity: 0.9 }}>
                  Spread the word about {groomNickname} & {brideNickname}&apos;s wedding celebration. Share this QR code with friends and family so they can join the celebration.
                </p>
                <div className="mx-auto inline-flex flex-col items-center bg-white/90 backdrop-blur-sm p-2.5 sm:p-5 md:p-7 rounded-xl sm:rounded-2xl shadow-md border border-[#0C2650]/20 mb-3 sm:mb-4 flex-1 justify-center">
                  <div className="mb-2 sm:mb-3 p-1.5 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-[#0C2650]/20">
                    <div className="bg-white p-1.5 sm:p-3 rounded-lg shadow-sm border border-[#0C2650]/15">
                      <QRCodeCanvas 
                        id="snapshare-qr" 
                        value={websiteUrl} 
                        size={isMobile ? 140 : 220} 
                        includeMargin 
                        className="bg-white" 
                        fgColor={NAVY}
                      />
                    </div>
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-1.5 sm:gap-2 mx-auto px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#0C2650] text-white border border-[#0C2650] shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200 text-xs sm:text-sm font-semibold"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Download QR</span>
                  </button>
                </div>
                <p className={`${cormorant.className} text-xs sm:text-sm mt-auto leading-relaxed`} style={{ color: NAVY, opacity: 0.85 }}>
                  Scan with any camera app to open the full invitation and schedule.
                </p>
              </div>
            </div> */}

            {/* <div className="bg-[#FAF7F2] rounded-lg sm:rounded-[20px] p-3 sm:p-5 md:p-7 shadow-xl border border-[#0C2650]/20">
              <h5 className={`${bequta.className} text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-center`} style={{ color: NAVY }}>
                Use Our Hashtags
              </h5>
              <p className={`${cormorant.className} text-xs sm:text-sm text-center mb-3 sm:mb-4 leading-relaxed`} style={{ color: NAVY, opacity: 0.9 }}>
                Tag your photos and posts with our wedding hashtags to join the celebration!
              </p>
              
              <div className="space-y-2.5 sm:space-y-3 mb-3 sm:mb-4">
                {hashtags.map((hashtag, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#0C2650]/20 shadow-sm hover:shadow-md transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                      <span className={`${cormorant.className} font-bold text-sm sm:text-base md:text-lg break-all flex-1 text-center sm:text-left`} style={{ color: NAVY }}>
                        {hashtag}
                      </span>
                      <button
                        onClick={() => copyHashtag(hashtag, index)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 whitespace-nowrap flex-shrink-0 ${
                          copiedHashtagIndex === index ? "bg-emerald-600" : "bg-[#0C2650] hover:opacity-90"
                        }`}
                      >
                        {copiedHashtagIndex === index ? (
                          <>
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className={`${cormorant.className} text-xs sm:text-sm font-medium`}>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className={`${cormorant.className} text-xs sm:text-sm font-medium`}>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={copyAllHashtags}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-lg text-white border-2 transition-all duration-200 shadow-md hover:shadow-lg ${
                  copiedAllHashtags ? "bg-emerald-600 border-emerald-600" : "bg-[#0C2650] border-[#0C2650] hover:opacity-90"
                }`}
              >
                {copiedAllHashtags ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className={`${cormorant.className} text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]`}>All Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className={`${cormorant.className} text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]`}>Copy All Hashtags</span>
                  </>
                )}
              </button>
            </div> */}

            {/* <div className="bg-[#FAF7F2] rounded-lg sm:rounded-[20px] p-3 sm:p-5 md:p-7 shadow-xl border border-[#0C2650]/20">
              <h5 className={`${bequta.className} text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-center`} style={{ color: NAVY }}>
                Share on Social Media
              </h5>
              <p className={`${cormorant.className} text-xs sm:text-sm text-center mb-3 sm:mb-4 leading-relaxed`} style={{ color: NAVY, opacity: 0.9 }}>
                Help spread the word about {groomNickname} & {brideNickname}&apos;s wedding celebration. Share the event across your favorite platforms.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => shareOnSocial("instagram")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-white border border-[#0C2650]/25 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-[#0C2650]/5 transition-all duration-200 shadow-sm hover:shadow-md hover:border-[#0C2650]/40"
                  style={{ color: NAVY }}
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>Instagram</span>
                </button>
                <button
                  onClick={() => shareOnSocial("facebook")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-white border border-[#0C2650]/25 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-[#0C2650]/5 transition-all duration-200 shadow-sm hover:shadow-md hover:border-[#0C2650]/40"
                  style={{ color: NAVY }}
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>Facebook</span>
                </button>
                <button
                  onClick={() => shareOnSocial("tiktok")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-white border border-[#0C2650]/25 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-[#0C2650]/5 transition-all duration-200 shadow-sm hover:shadow-md hover:border-[#0C2650]/40"
                  style={{ color: NAVY }}
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>TikTok</span>
                </button>
                <button
                  onClick={() => shareOnSocial("twitter")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-white border border-[#0C2650]/25 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-[#0C2650]/5 transition-all duration-200 shadow-sm hover:shadow-md hover:border-[#0C2650]/40"
                  style={{ color: NAVY }}
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>Twitter</span>
                </button>
              </div>
            </div> */}

            {driveLink && (
              <div>
                <div className="bg-[#FAF7F2] rounded-xl sm:rounded-[22px] p-3 sm:p-5 md:p-7 shadow-xl text-center border border-[#0C2650]/20">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#0C2650]/30 bg-white/80 px-2.5 py-1 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.32em] mb-2 sm:mb-3" style={{ color: NAVY }}>
                    Upload Your Photos & Videos
                  </div>
                  <p className={`${cormorant.className} text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 px-1`} style={{ color: NAVY, opacity: 0.9 }}>
                    Help us capture our special day! Scan the QR or use the actions below to drop your clips into our shared Drive.
                  </p>
                  <div className="mx-auto inline-flex flex-col items-center bg-white/90 backdrop-blur-sm p-2.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-md border border-[#0C2650]/20 mb-3 sm:mb-4">
                    <div className="mb-2 sm:mb-3 p-1.5 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-[#0C2650]/20">
                      <div className="bg-white p-1.5 sm:p-3 rounded-lg shadow-sm border border-[#0C2650]/15">
                        <QRCodeCanvas id="drive-qr" value={driveLink} size={isMobile ? 130 : 200} includeMargin className="bg-white" fgColor={NAVY} />
                      </div>
                    </div>
                    <p className={`${cormorant.className} text-xs sm:text-sm`} style={{ color: NAVY, opacity: 0.85 }}>📱 Scan with your camera app</p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
                    <button
                      onClick={copyDriveLink}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-white border shadow-sm hover:shadow-md text-xs sm:text-sm transition-all ${
                        copiedDriveLink ? "bg-emerald-600 border-emerald-600" : "bg-[#0C2650] border-[#0C2650] hover:opacity-90"
                      }`}
                    >
                      {copiedDriveLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Copy Link</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadDriveQRCode}
                      className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#0C2650] text-white border border-[#0C2650] shadow-sm hover:shadow-md hover:opacity-90 text-xs sm:text-sm transition-all font-semibold"
                    >
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Download QR</span>
                    </button>
                    <a
                      href={driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white border border-[#0C2650]/25 shadow-sm hover:shadow-md hover:bg-[#0C2650]/5 text-xs sm:text-sm transition-all"
                      style={{ color: NAVY }}
                    >
                      <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Open Drive</span>
                    </a>
                  </div>
                  <p className={`${cormorant.className} text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed`} style={{ color: NAVY, opacity: 0.85 }}>or tap &quot;Open Google Drive Folder.&quot;</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-8 sm:mt-12 md:mt-14 mb-6 sm:mb-8" variants={fadeInUp}>
          <div className="bg-[#FAF7F2] rounded-xl sm:rounded-[22px] p-4 sm:p-6 md:p-7 shadow-xl border border-[#0C2650]/20 max-w-3xl mx-auto">
            <p className={`${cormorant.className} text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 px-2`} style={{ color: NAVY }}>
              Thank you for helping make {groomNickname} & {brideNickname}&apos;s wedding celebration memorable. Your photos and messages create beautiful memories
              that will last a lifetime—keep sharing the joy throughout the evening.
            </p>
            <div className={`${cormorant.className} flex items-center justify-center gap-2 text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.32em] uppercase`} style={{ color: NAVY, opacity: 0.9 }}>
              <span>See you in the celebration</span>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  )
}