"use client"

import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-dark shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold font-dancing gradient-text">Birthday Celebration</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-white hover:text-pink-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-300 after:transition-all hover:after:w-full"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-white hover:text-pink-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-300 after:transition-all hover:after:w-full"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("wishes")}
              className="text-white hover:text-pink-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-300 after:transition-all hover:after:w-full"
            >
              Wishes
            </button>
            <button
              onClick={() => scrollToSection("gift")}
              className="text-white hover:text-pink-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-300 after:transition-all hover:after:w-full"
            >
              Gift
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-pink-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-300 after:transition-all hover:after:w-full"
            >
              About
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-800/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-white py-2 hover:text-pink-300 transition-colors text-left relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-300 after:transition-all hover:after:w-full"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-white py-2 hover:text-pink-300 transition-colors text-left relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-300 after:transition-all hover:after:w-full"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("wishes")}
              className="text-white py-2 hover:text-pink-300 transition-colors text-left relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-300 after:transition-all hover:after:w-full"
            >
              Wishes
            </button>
            <button
              onClick={() => scrollToSection("gift")}
              className="text-white py-2 hover:text-pink-300 transition-colors text-left relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-300 after:transition-all hover:after:w-full"
            >
              Gift
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white py-2 hover:text-pink-300 transition-colors text-left relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-300 after:transition-all hover:after:w-full"
            >
              About
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
