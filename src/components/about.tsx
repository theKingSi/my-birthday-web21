"use client"

interface AboutProps {
  name: string
}

export default function About({ name }: AboutProps) {
  return (
    <section id="about" className="py-20 opacity-0 transition-opacity duration-1000">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto glass gradient-border p-8 shadow-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center font-dancing gradient-text">About {name}</h2>

          <div className="space-y-6 text-lg">
          <p>
  Today marks another beautiful chapter in my life, and I can&apos;t help but thank God for the gift of a new age. It&apos;s been a journey filled with lessons, growth, love, and unforgettable memories.
</p>

<p>
  I&apos;m deeply grateful for the people in my life — for the laughter we&apos;ve shared, the support I&apos;ve received, and the moments that have shaped me. Each day has been a blessing, and I&apos;m reminded that God&apos;s grace has carried me through it all.
</p>

<p>
  As I step into this new year of life, I pray for more wisdom, strength, and peace. I’m looking forward to everything this next chapter holds, and I trust that with God by my side, the best is still ahead.
</p>


            <p className="font-bold text-center text-xl mt-8 neon-glow">
              Happy Birthday, {name}! May your day be filled with joy and your years ahead with blessings!
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="inline-block relative floating">
              <button
                onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
                className="gradient-border bg-gradient-to-br from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg cursor-pointer"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
