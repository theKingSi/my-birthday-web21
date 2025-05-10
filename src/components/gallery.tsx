"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react"
import Image from "next/image"

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)

  const images = [
    { id: 1, src: "/B32.jpeg", alt: "Birthday Boy" },
    { id: 2, src: "/B1.jpg", alt: "A tall boy standing near a short boy" },
    { id: 3, src: "/B31.jpg", alt: "A tired birthday boy" },
    { id: 4, src: "/B4.jpg", alt: "'Sips tea'" },
    { id: 5, src: "/B5.jpg", alt: "Mummy don't leave me!!!" },
    { id: 6, src: "/B6.jpg", alt: "Of course I'm in the abroad" },
    { id: 7, src: "/B7.jpg", alt: "oooou!! fine boys😏" },
    { id: 8, src: "/B14.jpg", alt: "Fine boi!!😎" },
    { id: 9, src: "/B9.jpg", alt: "Pride wan finish me😤😤" },
    { id: 10, src: "/B34.jpg", alt: "Styles the Grapher" },
    { id: 11, src: "/B25.jpg", alt: "Me and my adorable sister" },
    { id: 12, src: "/B12.jpg", alt: "where my help commet from" },
    { id: 13, src: "/B13.jpg", alt: "Birthday boy in black and white" },
    { id: 14, src: "/B8.jpg", alt: "Birthday boy and friends" },
    { id: 15, src: "/B24.jpg", alt: "Birthday flower bouquet" },
    { id: 16, src: "/B16.jpg", alt: "Slick birthday boy" },
    { id: 17, src: "/B17.jpg", alt: "Let's........" },
    { id: 18, src: "/B18.jpg", alt: "Birthday boy with Kushi" },
    { id: 19, src: "/B15.jpg", alt: "Birthday boy also in black and white" },
    { id: 20, src: "/B33.jpeg", alt: "Birthday boy at IWD" },
    { id: 21, src: "/B21.jpg", alt: "Birthday boy with coursemates" },
    { id: 22, src: "/B22.jpg", alt: "Shopping for baby napkins for Sam' naming ceremony" },
    { id: 23, src: "/B20.jpg", alt: "Tall boy at the back, short boy at the front" },
    { id: 24, src: "/B19.jpg", alt: "Birthday boy" },
    { id: 25, src: "/B27.jpg", alt: "Birthday boy at Devfest24" },
    { id: 26, src: "/B40.jpeg", alt: "Iconic" },
    { id: 27, src: "/B28.jpg", alt: "Birthday boy touching Techub EKSU" },
    { id: 28, src: "/B29.jpg", alt: "Just chilling" },
    { id: 29, src: "/B30.jpg", alt: "Birthday boy with honor.J" },
    { id: 30, src: "/B39.jpg", alt: "Selfie" },
    { id: 31, src: "/B37.jpeg", alt: "Birthday boy looking at his future" },
    { id: 32, src: "/B38.jpg", alt: "Birthday boy at Devfest23" },
  ]

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.classList.add("overflow-hidden")
  }

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    document.body.classList.remove("overflow-hidden")
  }, [])

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return
    if (direction === "prev") {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
    }
  }

  const handleShare = async () => {
    if (selectedImage === null) return
    const image = images[selectedImage]

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this image!",
          text: image.alt,
          url: image.src,
        })
      } else {
        alert("Sharing is not supported on this browser.")
      }
    } catch (error) {
      console.error("Share failed:", error)
    }
  }

  const handleDownload = () => {
    if (selectedImage === null) return
    const link = document.createElement("a")
    link.href = images[selectedImage].src
    link.download = images[selectedImage].alt || "birthday-image"
    link.click()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === "ArrowLeft") navigateImage("prev")
      if (e.key === "ArrowRight") navigateImage("next")
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, closeLightbox])

  useEffect(() => {
    if (selectedImage !== null) {
      lightboxRef.current?.focus()
    }
  }, [selectedImage])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX
    if (deltaX > 50) navigateImage("prev")
    else if (deltaX < -50) navigateImage("next")
    setTouchStartX(null)
  }

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-dancing gradient-text">
          Birthday Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-[4/3] min-h-[200px] overflow-hidden rounded-lg shadow-lg group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl glass-dark"
              onClick={() => openLightbox(index)}
              onTouchStart={() => openLightbox(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div
          id="lightbox-container"
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background overlay */}
          <div className="absolute inset-0 z-40" onClick={closeLightbox}></div>

          {/* Image and controls */}
          <div
            className="relative w-full max-w-6xl h-[80vh] bg-transparent z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              className="object-contain"
              priority
            />

            {/* Caption + counter */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white text-center text-sm md:text-base">
              <p>{images[selectedImage].alt}</p>
              <p className="mt-1 opacity-75">
                Image {selectedImage + 1} of {images.length}
              </p>
            </div>

            {/* Close */}
            <button
              className="absolute top-4 right-4 z-[100] bg-black/50 hover:bg-black/70 text-white hover:text-pink-300 p-2 rounded-full transition-all duration-300 cursor-pointer"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Prev/Next */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full z-[60]"
              onClick={() => navigateImage("prev")}
              aria-label="Previous image"
            >
              <ChevronLeft className="text-white" size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full z-[60]"
              onClick={() => navigateImage("next")}
              aria-label="Next image"
            >
              <ChevronRight className="text-white" size={24} />
            </button>

            {/* Download + Share */}
            <div className="absolute top-4 left-4 flex space-x-3 z-[70]">
              <button
                className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white cursor-pointer"
                onClick={handleDownload}
                aria-label="Download image"
              >
                <Download size={20} />
              </button>
              <button
                className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white cursor-pointer"
                onClick={handleShare}
                aria-label="Share image"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
