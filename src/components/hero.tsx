"use client"

import { useEffect, useRef } from "react"
import confetti from "canvas-confetti"

interface HeroProps {
  name: string
}

export default function Hero({ name }: HeroProps) {
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Create confetti animation
    const canvas = confettiCanvasRef.current
    if (!canvas) return

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })

    // Fire initial confetti
    fireConfetti(myConfetti)

    // Set interval for periodic confetti bursts
    const interval = setInterval(() => {
      fireConfetti(myConfetti)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const fireConfetti = (confettiInstance: confetti.CreateTypes) => {
    // Fire from left edge
    confettiInstance({
      particleCount: 50,
      spread: 70,
      origin: { x: 0, y: 0.5 },
      colors: ["#ff7eb9", "#ff65a3", "#7e22ce", "#a78bfa", "#67e8f9"],
      angle: 45,
    })

    // Fire from right edge
    confettiInstance({
      particleCount: 50,
      spread: 70,
      origin: { x: 1, y: 0.5 },
      colors: ["#ff7eb9", "#ff65a3", "#7e22ce", "#a78bfa", "#67e8f9"],
      angle: 135,
    })

    // Fire from bottom
    confettiInstance({
      particleCount: 50,
      spread: 120,
      origin: { x: 0.5, y: 1 },
      colors: ["#ff7eb9", "#ff65a3", "#7e22ce", "#a78bfa", "#67e8f9"],
    })
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16"
    >
      <canvas ref={confettiCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      <div className="text-center z-20 transform transition-all duration-700 translate-y-8 opacity-0 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-dancing neon-glow">Happy Birthday</h1>
        <h2 className="text-6xl md:text-8xl font-extrabold mb-8 gradient-text font-dancing">{name}!</h2>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 text-pink-100 font-light">
          Today we celebrate you and all the joy you bring to our lives!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            className="glass hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg cursor-pointer gradient-border "
          >
            View Gallery
          </button>
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="gradient-border bg-pink-500/30 hover:bg-pink-500/40 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg"
          >
            Birthday Message
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-600/50 to-transparent pointer-events-none"></div>
    </section>
  )
}
