import fs from "fs/promises"
import path from "path"
import MasonryGallery from "@/components/masonry-gallery"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond } from "next/font/google"
import { bequta } from "@/app/fonts"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const CHAMPAGNE = "#F5E6D3"
const MUTED_GOLD = "#C6A85E"

// Only source images from these folders (public/gallery, public/desktop-background, public/mobile-background)
const GALLERY_SOURCE_DIRS = ["gallery", "desktop-background", "mobile-background"] as const

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    const paths = entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
    // Prefer WebP: exclude jpg/jpeg when webp exists for same base name
    const webpBases = new Set(paths.filter((p) => p.endsWith(".webp")).map((p) => p.replace(/\.webp$/i, "")))
    const preferred = paths.filter((p) => {
      if (p.endsWith(".webp")) return true
      const base = p.replace(/\.(jpe?g|png|gif)$/i, "")
      return !webpBases.has(base)
    })
    return preferred.sort((a, b) => {
      const numA = parseInt(a.match(/\((\d+)\)/)?.[1] || a.match(/(\d+)\./)?.[1] || "0", 10)
      const numB = parseInt(b.match(/\((\d+)\)/)?.[1] || b.match(/(\d+)\./)?.[1] || "0", 10)
      return numA - numB
    })
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const [mobileImages, desktopImages, galleryImages] = await Promise.all([
    getImagesFrom("mobile-background"),
    getImagesFrom("desktop-background"),
    getImagesFrom("gallery"),
  ])
  const allImages = [...mobileImages, ...desktopImages, ...galleryImages]
  const images = allImages.map((src) => {
    let category: "desktop" | "mobile" | "gallery" = "gallery"
    if (src.includes("mobile-background")) category = "mobile"
    else if (src.includes("desktop-background")) category = "desktop"
    return { src, category }
  })

  return (
    <main className="min-h-screen relative overflow-hidden">
      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          {/* Decorative element above title - same as love-story */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
          </div>

          <h1
            className={`${bequta.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-2 sm:mb-3 md:mb-4`}
            style={{ color: CHAMPAGNE }}
          >
            Our Love Story Gallery
          </h1>
          <p
            className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg font-light max-w-xl mx-auto leading-relaxed px-2`}
            style={{ color: "rgba(245, 230, 211, 0.9)" }}
          >
            Every photograph tells a story of {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}&apos;s journey to forever
          </p>

          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          </div>
        </div>

        {images.length === 0 ? (
          <div className={`${cormorant.className} text-center`} style={{ color: "rgba(245, 230, 211, 0.85)" }}>
            <p className="font-light">
              No images found. Add files to{" "}
              <code
                className="px-2 py-1 rounded border"
                style={{
                  backgroundColor: "rgba(245, 230, 211, 0.1)",
                  borderColor: "rgba(198, 168, 94, 0.5)",
                  color: MUTED_GOLD,
                }}
              >
                public/{GALLERY_SOURCE_DIRS.join(", public/")}
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}
      </section>
    </main>
  )
}


