"use client"

import { useEffect } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Gallery from "@/components/gallery"
import AccountDetails from "@/components/account-details"
import About from "@/components/about"
import MusicPlayer from "@/components/music-player"
import { FloatingCircles, GlowingStars, GradientOrb } from "@/components/decorative-elements"
import ChatBox from "@/components/chat"

export default function Home() {
  const celebrantName = "King Solomon" // Change this to the celebrant's name

  // Account details
  const accountDetails = {
    accountName: "NNABUGWU SOLOMON CHUKWUEBUKA",
    accountNumber: "8163690428",
    bankName: "OPAY",
  }

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

        <MusicPlayer />
        <Gallery />

        {/* <ChatBox /> */}

        <AccountDetails
          accountName={accountDetails.accountName}
          accountNumber={accountDetails.accountNumber}
          bankName={accountDetails.bankName}
        />

        <About name={celebrantName} />

       
      </div>
    </main>
  )
}
