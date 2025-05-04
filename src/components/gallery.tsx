"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Real birthday-themed images
  const images = [
    {
      id: 1,
      src: "/B1.jpg",
      alt: "A tall boy standing near a short boy",
    },
    {
      id: 2,
      src: "/B2.jpg",
      alt: "Objection my lord",
    },
    {
      id: 3,
      src: "/B11.jpg",
      alt: "Smlies weirdly",
    },
    {
      id: 4,
      src: "/B4.jpg",
      alt: "'Sips tea'",
    },
    {
      id: 5,
      src: "/B5.jpg",
      alt: "Mummy don't leave me!!!",
    },
    {
      id: 6,
      src: "/B6.jpg",
      alt: "Of cause I'm in the abroad",
    },
    {
      id: 7,
      src: "/B7.jpg",
      alt: "oooou!! fine boys😏",
    },
    {
      id: 8,
      src: "/B14.jpg",
      alt: "Fine boi!!😎",
    },
    {
      id: 9,
      src: "/B9.jpg",
      alt: "Pride wan finish me😤😤",
    },
    {
      id: 10,
      src: "/B10.jpg",
      alt: "Bro Gerald😊😊",
    },
    {
      id: 11,
      src: "/B25.jpg",
      alt: "Birthday chocolate cake with strawberries",
    },
    {
      id: 12,
      src: "/B12.jpg",
      alt: "Birthday present opening moment",
    },
    {
      id: 13,
      src: "/B20.jpg",
      alt: "Birthday dinner table setup",
    },
    {
      id: 14,
      src: "/B8.jpg",
      alt: "Birthday card with heartfelt message",
    },
    {
      id: 15,
      src: "/B24.jpg",
      alt: "Birthday flower bouquet",
    },
    {
      id: 16,
    src: "/B16.jpg",
      alt: "Birthday surprise reaction",
    },
    {
      id: 17,
      src: "/B17.jpg",
      alt: "Birthday outdoor celebration",
    },
    {
      id: 18,
      src: "/B18.jpg",
      alt: "Birthday selfie with friends",
    },
    {
      id: 19,
      src: "/B15.jpg",
      alt: "Birthday cake cutting moment",
    },
    {
      id: 20,
      src: "/B13.jpg",
      alt: "Birthday night celebration with lights",
    },
    {
        id: 21,
        src: "/B21.jpg",
        alt: "Birthday outdoor celebration",
      },
      {
        id: 22,
        src: "/B22.jpg",
        alt: "Birthday selfie with friends",
      },
      {
        id: 23,
        src: "/B23.jpg",
        alt: "Birthday cake cutting moment",
      },
      {
        id: 24,
        src: "/B19.jpg",
        alt: "Birthday night celebration with lights",
      },
  ]

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }, [])

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    if (direction === "prev") {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      if (e.key === "ArrowLeft") {
        navigateImage("prev")
      } else if (e.key === "ArrowRight") {
        navigateImage("next")
      } else if (e.key === "Escape") {
        closeLightbox()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedImage, closeLightbox])

  // Focus management for accessibility
  useEffect(() => {
    if (selectedImage !== null) {
      // Focus the lightbox container when it opens
      const lightbox = document.getElementById("lightbox-container")
      if (lightbox) {
        lightbox.focus()
      }
    }
  }, [selectedImage])

  return (
    <section id="gallery" className="py-20 opacity-0 transition-opacity duration-1000">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-dancing gradient-text">
          Birthday Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl glass-dark"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">{image.alt}</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          id="lightbox-container"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button with improved positioning and z-index */}
          <button
            className="fixed top-4 right-4 z-[100] bg-black/50 hover:bg-black/70 text-white hover:text-pink-300 p-2 rounded-full transition-all duration-300"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
             className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 z-[60] backdrop-blur-md border border-white/10 group shadow-lg neon-box cursor-pointer"
            onClick={() => navigateImage("prev")}
            aria-label="Previous image"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>

          <button
           className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 z-[60] backdrop-blur-md border border-white/10 group shadow-lg neon-box cursor-pointer"
            onClick={() => navigateImage("next")}
            aria-label="Next image"
          >
            <ChevronRight className="text-white" size={24} />
          </button>

          {/* Image container with improved click handling */}
          <div
            className="relative w-full max-w-4xl aspect-[4/3] bg-transparent"
            onClick={(e) => {
              // Prevent clicks on the image from closing the lightbox
              e.stopPropagation()
            }}
          >
            <Image
              src={images[selectedImage].src || "/placeholder.svg"}
              alt={images[selectedImage].alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              className="object-contain"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white text-center">
              {images[selectedImage].alt}
            </div>
          </div>

          {/* Overlay that can be clicked to close */}
          <div className="absolute inset-0 z-40" onClick={closeLightbox} aria-hidden="true"></div>
        </div>
      )}
    </section>
  )
}
