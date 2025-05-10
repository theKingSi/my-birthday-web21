"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, VolumeX } from "lucide-react"

// Define the Song type
interface Song {
  id: number
  title: string
  artist: string
  src: string
}

// Sample playlist
const birthdaySongs: Song[] = [
  {
    id: 1,
    title: "Birthday",
    artist: "Anne-Marie",
    src: "/Mar.mp3",
  },
  {
    id: 2,
    title: "Happy Birthday",
    artist: "Simi",
    src: "/Ade.mp3", // Using the same file as a placeholder
  },
  {
    id: 3,
    title: "Happy",
    artist: "Pharrell Williams",
    src: "/Hap.mp3", // Using the same file as a placeholder
  },
  {
    id: 4,
    title: "Uptown funk",
    artist: "Bruno Mars",
    src: "/Upt.mp3", // Using the same file as a placeholder
  },
]

interface MusicPlayerProps {
  onPlayingChange?: (isPlaying: boolean) => void
}

export default function MusicPlayer({ onPlayingChange }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio on component mount
  useEffect(() => {
    const initAndPlayAudio = async () => {
      try {
        if (audioRef.current) return // Already initialized

        console.log("Initializing audio...")
        const audio = new Audio()
        audio.src = birthdaySongs[currentSongIndex].src
        audio.loop = false // We'll handle song transitions manually
        audio.volume = 0.7

        // Add event listeners
        audio.addEventListener("canplaythrough", () => {
          console.log("Audio can play through")
          setIsReady(true)
          setAudioError(null)
        })

        audio.addEventListener("play", () => {
          console.log("Audio playing")
          setIsPlaying(true)
          if (onPlayingChange) onPlayingChange(true)
        })

        audio.addEventListener("pause", () => {
          console.log("Audio paused")
          setIsPlaying(false)
          if (onPlayingChange) onPlayingChange(false)
        })

        audio.addEventListener("ended", () => {
          console.log("Song ended, playing next")
          playNextSong()
        })

        audio.addEventListener("error", (e) => {
          const errorMessage = audio.error
            ? `Code: ${audio.error.code}, Message: ${audio.error.message}`
            : "Unknown audio error"
          setAudioError(errorMessage)
          setIsReady(false)
          console.error("Audio error details:", errorMessage)
        })

        // Store reference
        audioRef.current = audio

        // Preload the audio
        audio.load()

        // Try to play immediately (this might be blocked by browser autoplay policies)
        try {
          console.log("Attempting to play audio automatically...")
          await audio.play()
          console.log("Autoplay successful")
        } catch (error) {
          console.warn("Autoplay prevented:", error)
          setAudioError("Click to play music (autoplay blocked by browser)")
        }
      } catch (error) {
        console.error("Error initializing audio:", error)
        setAudioError("Failed to initialize audio player")
      }
    }

    initAndPlayAudio()

    // Clean up audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [currentSongIndex, onPlayingChange])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Playback error:", error)
          setAudioError(`Playback error: ${error.message}`)
        })
      }
    }
  }

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % birthdaySongs.length
    changeSong(nextIndex)
  }

  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + birthdaySongs.length) % birthdaySongs.length
    changeSong(prevIndex)
  }

  const changeSong = (index: number) => {
    if (index === currentSongIndex) return

    const wasPlaying = isPlaying

    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }

    // Update index
    setCurrentSongIndex(index)

    // The useEffect will handle creating a new audio instance
    // We'll restart playback in the next render cycle if it was playing
    if (wasPlaying) {
      // Small timeout to ensure the new audio is ready
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.error("Error playing new song:", err)
            setAudioError("Error playing new song")
          })
        }
      }, 100)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    audioRef.current.muted = !audioRef.current.muted
    setIsMuted(!isMuted)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`glass rounded-lg transition-all duration-300 ${showPlaylist ? "w-64" : "w-auto"}`}>
        {/* Main player controls */}
        <div className="p-3 flex items-center justify-between">
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={showPlaylist ? "Hide playlist" : "Show playlist"}
          >
            <Music className="h-5 w-5 text-pink-300" />
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={playPreviousSong}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Previous song"
            >
              <SkipBack className="h-4 w-4 text-white" />
            </button>

            <button
              onClick={togglePlay}
              className={`p-3 rounded-full hover:bg-white/10 transition-all duration-300 ${isPlaying ? "audio-playing bg-pink-500/20" : "bg-purple-500/20"
                }`}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-5 w-5 text-pink-300" /> : <Play className="h-5 w-5 text-white" />}
            </button>

            <button
              onClick={playNextSong}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next song"
            >
              <SkipForward className="h-4 w-4 text-white" />
            </button>
          </div>

          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-5 w-5 text-white/70" /> : <Volume2 className="h-5 w-5 text-white/70" />}
          </button>
        </div>

        {/* Current song info */}
        {showPlaylist && (
          <div className="px-4 pb-2">
            <div className="text-sm font-medium text-pink-300 truncate">{birthdaySongs[currentSongIndex].title}</div>
            <div className="text-xs text-white/70 truncate">{birthdaySongs[currentSongIndex].artist}</div>
          </div>
        )}

        {/* Playlist */}
        {showPlaylist && (
          <div className="max-h-48 overflow-y-auto custom-scrollbar border-t border-white/10 mt-1">
            <div className="p-2 text-xs text-white/50 uppercase tracking-wider">Playlist</div>
            <ul>
              {birthdaySongs.map((song, index) => (
                <li key={song.id}>
                  <button
                    onClick={() => changeSong(index)}
                    className={`w-full text-left px-4 py-2 hover:bg-white/5 transition-colors flex items-center ${currentSongIndex === index ? "bg-white/10 text-pink-300" : "text-white"
                      }`}
                  >
                    <div className="mr-2">
                      {currentSongIndex === index && isPlaying ? (
                        <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-white/30"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{song.title}</div>
                      <div className="text-xs text-white/70 truncate">{song.artist}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Error message */}
      {audioError && (
        <div className="absolute bottom-full mb-2 right-0 bg-red-500/80 text-white text-xs p-2 rounded-md whitespace-nowrap">
          {audioError}
        </div>
      )}
    </div>
  )
}
