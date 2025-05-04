"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useState, useEffect } from "react"

interface MusicPlayerProps {
  isPlaying: boolean
  toggleMusic: () => void
}

export default function MusicPlayer({ isPlaying, toggleMusic }: MusicPlayerProps) {
  const [audioSupported, setAudioSupported] = useState(true)

  useEffect(() => {
    // Check if audio is supported in this browser
    try {
      const audio = document.createElement("audio")
      if (!audio || !audio.canPlayType || !audio.canPlayType("audio/mpeg")) {
        console.warn("Audio not fully supported in this browser")
        setAudioSupported(false)
      }
    } catch (error) {
      console.error("Error checking audio support:", error)
      setAudioSupported(false)
    }
  }, [])

  if (!audioSupported) {
    return null // Don't render the player if audio isn't supported
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="glass p-3 rounded-full shadow-lg flex items-center space-x-2">
        <button
          onClick={toggleMusic}
          className="text-white hover:text-pink-300 transition-colors"
          aria-label={isPlaying ? "Mute music" : "Unmute music"}
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        <span className="text-sm text-white/80">{isPlaying ? "Birthday Music Playing" : "Music Paused"}</span>
      </div>
    </div>
  )
}
