"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, MessageSquare, User, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  name: string
  content: string
  timestamp: number
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("birthdayWishes")
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages))
      } catch (e) {
        console.error("Error parsing saved messages:", e)
      }
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("birthdayWishes", JSON.stringify(messages))
  }, [messages])

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !content.trim()) return

    setIsSubmitting(true)

    // Create new message
    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      content: content.trim(),
      timestamp: Date.now(),
    }

    // Add message with a slight delay for animation effect
    setTimeout(() => {
      setMessages((prev) => [...prev, newMessage])
      setContent("")
      setIsSubmitting(false)
    }, 300)
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <section id="wishes" className="py-20 opacity-0 transition-opacity duration-1000">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center font-dancing gradient-text">Birthday Wishes</h2>

        <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
          Leave a special birthday message that will brighten the celebrant's day!
        </p>

        <div className="max-w-4xl mx-auto glass gradient-border p-6 md:p-8 shadow-xl">
          {/* Messages display area */}
          <div className="mb-8 h-80 md:h-96 overflow-y-auto custom-scrollbar rounded-lg glass-dark p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-white/50">
                <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
                <p>No birthday wishes yet. Be the first to send one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {message.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-pink-300">{message.name}</h4>
                          <div className="flex items-center text-xs text-white/50">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimestamp(message.timestamp)}
                          </div>
                        </div>
                      </div>
                      <p className="text-white ml-11">{message.content}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Message input form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  required
                />
              </div>

              <div className="flex-[2] relative">
                <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type your birthday wish..."
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !content.trim()}
                className="gradient-border bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <span>Send Wish</span>
                <Send className="ml-2 w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
