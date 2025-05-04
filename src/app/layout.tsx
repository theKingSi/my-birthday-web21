import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script, Montserrat } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
})
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing-script",
})

export const metadata: Metadata = {
  title: "Birthday Celebration",
  description: "A special birthday celebration website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.className} ${dancingScript.variable} ${montserrat.variable}`}>{children}</body>
    </html>
  )
}
