"use client"

import { useEffect, useState, useRef } from "react"

interface AudioPlayerProps {
  onPlayingChange?: (isPlaying: boolean) => void
}

export default function AudioPlayer({ onPlayingChange }: AudioPlayerProps) {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio()

    // Set audio properties
    audio.src = "/birthday-song.mp3"
    audio.loop = true
    audio.preload = "auto"
    audio.volume = 0.7 // Set initial volume to 70%

    // Log for debugging
    console.log("Audio element created with src:", audio.src)

    // Add event listeners with error handling
    const handleCanPlayThrough = () => {
      console.log("Audio can play through")
      setIsReady(true)
    }

    const handlePlay = () => {
      console.log("Audio playing")
      setIsPlaying(true)
      if (onPlayingChange) onPlayingChange(true)
    }

    const handlePause = () => {
      console.log("Audio paused")
      setIsPlaying(false)
      if (onPlayingChange) onPlayingChange(false)
    }

    const handleError = (e: Event) => {
      console.error("Audio error:", e)
      console.error("Audio error details:", (e.target as HTMLAudioElement).error)
      setIsReady(false)
    }

    const handleEnded = () => {
      console.log("Audio ended, should loop automatically")
      // Double-check looping behavior
      if (audio.loop) {
        console.log("Loop is enabled, audio should restart")
      } else {
        console.log("Loop is disabled, manually restarting")
        audio.currentTime = 0
        audio.play().catch((err) => console.error("Error restarting audio:", err))
      }
    }

    audio.addEventListener("canplaythrough", handleCanPlayThrough)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("error", handleError)
    audio.addEventListener("ended", handleEnded)

    // Store reference
    audioRef.current = audio

    // Clean up
    return () => {
      console.log("Cleaning up audio element")
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("canplaythrough", handleCanPlayThrough)
        audioRef.current.removeEventListener("play", handlePlay)
        audioRef.current.removeEventListener("pause", handlePause)
        audioRef.current.removeEventListener("error", handleError)
        audioRef.current.removeEventListener("ended", handleEnded)
        audioRef.current = null
      }
    }
  }, [onPlayingChange])

  const togglePlay = () => {
    if (!audioRef.current) {
      console.error("Audio element not available")
      return
    }

    if (!isReady) {
      console.warn("Audio not ready yet")
      return
    }

    try {
      if (isPlaying) {
        console.log("Pausing audio")
        audioRef.current.pause()
      } else {
        console.log("Playing audio")
        // Ensure loop is set
        audioRef.current.loop = true

        // Play with proper error handling
        audioRef.current
          .play()
          .then(() => {
            console.log("Audio playback started successfully")
          })
          .catch((error) => {
            console.error("Audio playback failed:", error)
            // Try to recover
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.play().catch((err) => console.error("Retry playback failed:", err))
              }
            }, 1000)
          })
      }
    } catch (error) {
      console.error("Toggle play error:", error)
    }
  }

  return { isReady, isPlaying, togglePlay }
}
