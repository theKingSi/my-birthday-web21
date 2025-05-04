"use client"

import { useEffect, useState, useRef } from "react"
import { Play, Pause } from "lucide-react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Gallery from "@/components/gallery"
import About from "@/components/about"
import { FloatingCircles, GlowingStars, GradientOrb } from "@/components/decorative-elements"

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAudioReady, setIsAudioReady] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const celebrantName = "King Solomon"

  // Initialize audio on user interaction only
  const initializeAudio = () => {
    try {
      if (audioRef.current) return 

      const audio = new Audio()
      audio.src = "/birthday-song.mp3"
      audio.loop = true
      audio.volume = 0.7

      // Add event listeners
      audio.addEventListener("canplaythrough", () => {
        setIsAudioReady(true)
        setAudioError(null)
      })

      audio.addEventListener("play", () => {
        setIsPlaying(true)
      })

      audio.addEventListener("pause", () => {
        setIsPlaying(false)
      })

      audio.addEventListener("error", (e) => {
        const errorMessage = audio.error
          ? `Code: ${audio.error.code}, Message: ${audio.error.message}`
          : "Unknown audio error"
        setAudioError(errorMessage)
        setIsAudioReady(false)
        console.error("Audio error details:", errorMessage)
      })

      // Store reference
      audioRef.current = audio

      // Preload the audio
      audio.load()
    } catch (error) {
      console.error("Error initializing audio:", error)
      setAudioError("Failed to initialize audio player")
    }
  }

  const toggleMusic = () => {
    // Initialize audio if not already done
    if (!audioRef.current) {
      initializeAudio()
      // Need to wait a bit for initialization
      setTimeout(() => {
        if (audioRef.current) {
          playAudio()
        }
      }, 100)
      return
    }

    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause()
    } else {
      playAudio()
    }
  }

  const playAudio = () => {
    if (!audioRef.current) return

    const playPromise = audioRef.current.play()

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("Playback error:", error)
        // Handle autoplay restrictions
        if (error.name === "NotAllowedError") {
          setAudioError("Autoplay blocked. Please interact with the page first.")
        } else {
          setAudioError(`Playback error: ${error.message}`)
        }
      })
    }
  }

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll("section")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#17172b] to-[#26263a] text-white overflow-hidden relative">
      {/* Background blobs */}
      <div className="blob bg-purple-600 w-[500px] h-[500px] top-[-100px] right-[-100px]"></div>
      <div className="blob bg-pink-600 w-[600px] h-[600px] bottom-[-200px] left-[-200px]"></div>
      <div className="blob bg-cyan-600 w-[300px] h-[300px] bottom-[30%] right-[10%]"></div>

      <GlowingStars />
      <FloatingCircles />
      <GradientOrb className="w-[300px] h-[300px] top-[20%] left-[10%]" />
      <GradientOrb className="w-[400px] h-[400px] bottom-[10%] right-[5%]" />

      <Navigation />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Hero name={celebrantName} />

        <Gallery />

        <About name={celebrantName} />

        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={toggleMusic}
            className="glass p-4 rounded-full hover:bg-white/10 transition-all duration-300 shadow-lg neon-box cursor-pointer"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-pink-300 transition-transform duration-300" />
            ) : (
              <Play className="h-6 w-6 text-white transition-transform duration-300" />
            )}
          </button>

          {audioError && (
            <div className="absolute bottom-full mb-2 right-0 bg-red-500/80 text-white text-xs p-2 rounded-md whitespace-nowrap">
              {audioError}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
