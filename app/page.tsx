'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Loader2 } from 'lucide-react'

type ActiveProduct = {
  id: string
  sku: string
  name: string
  description: string | null
  price_inr: number
  stock_left: number
}

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-black">
      <NavBar />
      <Hero />
      <LiveProducts />
      <Countdown />
      <WhatYouOwn />
      <Tiers />
      <HowItWorks />
      <Footer />
    </div>
  )
}

// ============================================
// NAV BAR
// ============================================
function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-carbon/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-display font-bold text-brand-white text-sm tracking-wider uppercase">
          [BRAND]
        </span>
        <div className="flex items-center gap-6">
          <a
            href="/dashboard"
            className="text-brand-muted hover:text-brand-white text-sm transition-colors"
          >
            DASHBOARD
          </a>
          <a
            href="/verify"
            className="text-brand-muted hover:text-brand-white text-sm transition-colors"
          >
            VERIFY
          </a>
          <a
            href="#drop"
            className="px-4 py-1.5 bg-brand-red text-brand-white text-xs font-display font-bold rounded-full uppercase tracking-wider"
          >
            DROP 001
          </a>
        </div>
      </div>
    </nav>
  )
}

// ============================================
// HERO SECTION
// ============================================
function Hero() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [position, setPosition] = useState<number | null>(null)
  const [alreadyJoined, setAlreadyJoined] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setPosition(data.position)
        setAlreadyJoined(data.alreadyRegistered || false)
      }
    } catch (error) {
      console.error('Waitlist error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 carbon-texture scan-line">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 to-brand-black" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-brand-red text-xs font-mono tracking-[0.2em] uppercase mb-6"
        >
          Bangalore — Series 001
        </motion.p>

        {/* Main heading - staggered animation */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-none mb-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="block"
          >
            WORN.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="block"
          >
            VERIFIED.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="block text-brand-red"
          >
            YOURS.
          </motion.span>
        </motion.h1>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-brand-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto"
        >
          10 pieces. Embedded NFC. Blockchain certified. No restocks. Ever.
        </motion.p>

        {/* Waitlist form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="max-w-md mx-auto"
        >
          {!success ? (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={loading}
                className="flex-1 px-4 py-3.5 bg-transparent border border-brand-steel text-brand-white placeholder-brand-muted focus:outline-none focus:border-brand-red transition-colors font-body"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 bg-brand-red text-brand-white font-display font-bold text-sm uppercase tracking-wider hover:bg-[#a01830] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Joining...
                  </span>
                ) : (
                  'Join The List'
                )}
              </button>
            </form>
          ) : (
            <div className="py-3.5">
              <p className="text-brand-red font-display font-bold text-lg mb-1">
                {alreadyJoined ? '✓ Already on the list' : '✓ You are on the list'}
              </p>
              {position && (
                <p className="text-brand-muted font-mono text-sm">
                  Position #{position}
                </p>
              )}
            </div>
          )}

          <p className="text-brand-muted text-xs mt-4">
            2,847 already waiting
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function LiveProducts() {
  const [products, setProducts] = useState<ActiveProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <section className="py-20 px-6 bg-brand-carbon border-y border-brand-steel">
      <div className="max-w-6xl mx-auto">
        <p className="serial-number mb-6">Active drop products</p>
        {loading ? (
          <p className="text-brand-muted">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-brand-muted">
            No active products yet. Seed one using the admin endpoint.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product) => (
              <article key={product.id} className="border border-brand-steel bg-brand-black p-6">
                <p className="serial-number">{product.sku}</p>
                <h3 className="font-display text-2xl mt-2 mb-2">{product.name}</h3>
                <p className="text-brand-muted text-sm mb-4">
                  {product.description || 'Ultra-limited piece with NFC-backed authenticity.'}
                </p>
                <p className="text-brand-white mb-4">INR {product.price_inr}</p>
                <p className="text-brand-muted text-sm mb-5">Stock left: {product.stock_left}</p>
                <a
                  href={`/checkout/${product.id}`}
                  className="inline-block px-5 py-2.5 bg-brand-red text-brand-white text-sm font-display uppercase tracking-wider"
                >
                  Buy now
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ============================================
// COUNTDOWN SECTION
// ============================================
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    // Set drop date to 30 days from now
    const dropDate = new Date()
    dropDate.setDate(dropDate.getDate() + 30)
    const targetTime = dropDate.getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetTime - now

      if (difference <= 0) {
        setIsLive(true)
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (isLive) {
    return (
      <section className="py-20 px-6 bg-brand-carbon border-y border-brand-steel">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-brand-red font-display font-black text-5xl md:text-7xl animate-pulse"
          >
            DROP IS LIVE
          </motion.p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-6 bg-brand-carbon border-y border-brand-steel">
      <div className="max-w-4xl mx-auto">
        <p className="serial-number text-center mb-12">Drop 001 — Opens In</p>

        <div className="grid grid-cols-4 gap-4 md:gap-8">
          <TimeBlock value={timeLeft.days} label="DAYS" />
          <TimeBlock value={timeLeft.hours} label="HRS" />
          <TimeBlock value={timeLeft.minutes} label="MIN" />
          <TimeBlock value={timeLeft.seconds} label="SEC" />
        </div>
      </div>
    </section>
  )
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="border border-brand-steel bg-brand-black p-6 md:p-8 text-center">
      <span className="font-display font-black text-3xl md:text-6xl text-brand-white">
        {String(value).padStart(2, '0')}
      </span>
      <span className="block text-brand-muted text-xs font-mono mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}

// ============================================
// WHAT YOU OWN SECTION
// ============================================
function WhatYouOwn() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const cards = [
    {
      number: '01',
      title: 'THE PHYSICAL',
      description:
        '500 GSM heavyweight garment. Minimal design. Embroidered serial number. Produced in Bangalore, India.',
    },
    {
      number: '02',
      title: 'THE CHIP',
      description:
        'NTAG 424 DNA embedded NFC chip. Tap any smartphone to verify authenticity. Cryptographically unclonable.',
    },
    {
      number: '03',
      title: 'THE NFT',
      description:
        'Polygon blockchain certificate of ownership. Permanent record. Proves you are 1 of 10 owners forever.',
    },
  ]

  return (
    <section ref={ref} className="py-32 px-6 bg-brand-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl md:text-5xl text-brand-white mb-16 text-center"
        >
          WHAT YOU OWN
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                borderColor: 'var(--brand-red)',
                y: -8,
                transition: { duration: 0.2 },
              }}
              className="border border-brand-steel bg-brand-carbon p-8 group transition-all duration-300"
            >
              <span className="text-brand-red font-mono text-sm tracking-wider">
                {card.number}
              </span>
              <h3 className="font-display font-bold text-xl text-brand-white mt-4 mb-3">
                {card.title}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// TIERS SECTION
// ============================================
function Tiers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const tiers = [
    {
      number: '01',
      title: 'CORE OWNER',
      description: 'Physical product + serial number + NFC verification access',
      accent: 'brand-red',
    },
    {
      number: '02',
      title: 'VERIFIED OWNER',
      description:
        'Everything in Tier 01 + NFT certificate on Polygon + Owner Vault access',
      accent: 'brand-red',
    },
    {
      number: '03',
      title: 'INNER CIRCLE',
      description: 'Not for sale. Invite only. Unknown future benefits.',
      accent: 'brand-gold',
    },
  ]

  return (
    <section ref={ref} className="py-32 px-6 bg-brand-carbon">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl md:text-5xl text-brand-white mb-6 text-center"
        >
          THE ACCESS TIERS
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`border-2 border-${tier.accent} bg-brand-black p-8`}
            >
              <span
                className={`font-mono text-sm tracking-wider text-${tier.accent}`}
              >
                TIER {tier.number}
              </span>
              <h3 className="font-display font-bold text-2xl text-brand-white mt-4 mb-4">
                {tier.title}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                {tier.description}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-brand-muted text-xs text-center mt-12 font-mono">
          All buyers start at Tier 01. NFT claim upgrades you to Tier 02. Tier 03
          is not bought.
        </p>
      </div>
    </section>
  )
}

// ============================================
// HOW IT WORKS SECTION
// ============================================
function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      number: '01',
      title: 'JOIN WAITLIST',
      description: 'Add your email. Get notified before the drop.',
    },
    {
      number: '02',
      title: 'GET ACCESS',
      description: 'First 11 on the list receive purchase links.',
    },
    {
      number: '03',
      title: 'BUY THE DROP',
      description: 'Secure your piece via Razorpay. INR only.',
    },
    {
      number: '04',
      title: 'CLAIM YOUR NFT',
      description: 'Verify ownership. Upgrade to Tier 02.',
    },
  ]

  return (
    <section ref={ref} className="py-32 px-6 bg-brand-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl md:text-5xl text-brand-white mb-20 text-center"
        >
          HOW IT WORKS
        </motion.h2>

        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-brand-steel" />

          <div className="grid md:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Number circle */}
                <div className="w-12 h-12 rounded-full bg-brand-black border-2 border-brand-red flex items-center justify-center mb-6 relative z-10">
                  <span className="font-mono text-brand-red text-xs">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display font-bold text-brand-white mb-2">
                  {step.title}
                </h3>
                <p className="text-brand-muted text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="py-12 px-6 bg-brand-carbon border-t border-brand-red">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display font-bold text-brand-white text-sm uppercase">
          [BRAND]
        </span>

        <span className="text-brand-muted text-xs">
          Bangalore, India — 2026
        </span>

        <div className="w-20" /> {/* Spacer for centering */}
      </div>

      <p className="text-brand-muted text-xs text-center mt-8 font-mono">
        © 2026 [BRAND]. All pieces verified. No exceptions.
      </p>
    </footer>
  )
}
