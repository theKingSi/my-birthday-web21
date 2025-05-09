"use client"

import { useState } from "react"
import { Copy, Check, Gift, CreditCard, User, Banknote } from "lucide-react"

interface AccountDetailsProps {
  accountName: string
  accountNumber: string
  bankName: string
}

export default function AccountDetails({ accountName, accountNumber, bankName }: AccountDetailsProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <section id="gift" className="py-20 opacity-0 transition-opacity duration-1000">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center font-dancing gradient-text">Send a Gift</h2>

        <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
          Want to send a birthday gift? You can transfer to the account details below.
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="glass gradient-border p-8 shadow-xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-xl"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center text-pink-300">
                    <User className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Account Name</span>
                  </div>
                  <div className="glass-dark p-4 rounded-lg text-center">
                    <p className="text-xl font-medium">{accountName}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-pink-300">
                    <CreditCard className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Account Number</span>
                  </div>
                  <div className="glass-dark p-4 rounded-lg flex items-center justify-between">
                    <p className="text-xl font-medium tracking-wider">{accountNumber}</p>
                    <button
                      onClick={() => copyToClipboard(accountNumber)}
                      className={`p-2 rounded-full cursor-pointer transition-all duration-300 ${
                        copied ? "bg-green-500/20 text-green-400" : "bg-purple-500/20 text-white hover:bg-purple-500/30"
                      }`}
                      aria-label="Copy account number to clipboard"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-pink-300">
                    <Banknote className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Bank Name</span>
                  </div>
                  <div className="glass-dark p-4 rounded-lg text-center">
                    <p className="text-xl font-medium">{bankName}</p>
                  </div>
                </div>

                {copied && (
                  <div className="absolute top-4 right-4 bg-green-500/90 text-white text-sm py-1 px-3 rounded-full animate-fade-scale">
                    Copied!
                  </div>
                )}
              </div>

              <div className="mt-8 text-center text-white/70 text-sm">
                <p>Your gift will be greatly appreciated! Thank you for your generosity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
