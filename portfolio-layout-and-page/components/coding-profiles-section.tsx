'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Code2, Trophy, Award, Target, Flame, Zap, TrendingUp, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { PERSONAL_INFO } from '@/lib/data'

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface LeetCodeData {
  solved: number
  activeDays: number
  rating: number
  topPercentage: number
  contests: number
  fallback?: boolean
}

interface CodeforcesData {
  rating: number
  maxRating: number
  rank: string
  maxRank: string
  fallback?: boolean
}

// â”€â”€â”€ Live badge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function LiveBadge({ isFallback }: { isFallback: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${isFallback ? 'bg-muted text-muted-foreground' : 'bg-green-500/10 text-green-500'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isFallback ? 'bg-muted-foreground' : 'bg-green-500 animate-pulse'}`} />
      {isFallback ? 'cached' : 'live'}
    </span>
  )
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// â”€â”€â”€ Animated counter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// Animated counter
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const spring = useSpring(0, { stiffness: 50, damping: 20 })
  const display = useTransform(spring, (v) => Math.round(v))
  const [current, setCurrent] = useState(0)
  
  useEffect(() => {
    if (isInView) spring.set(value)
  }, [isInView, value, spring])
  
  useEffect(() => {
    return display.on('change', (v) => setCurrent(v))
  }, [display])
  
  return <span ref={ref}>{current}{suffix}</span>
}

// Circular progress ring
function ProgressRing({ progress, size = 100, stroke = 8, color }: { 
  progress: number; size?: number; stroke?: number; color: string 
}) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })
  const radius = (size - stroke) / 2
  const circumference = radius * 2 * Math.PI
  
  const progressSpring = useSpring(0, { stiffness: 30, damping: 20 })
  const strokeDashoffset = useTransform(progressSpring, (v) => circumference - (v / 100) * circumference)
  
  useEffect(() => {
    if (isInView) progressSpring.set(progress)
  }, [isInView, progress, progressSpring])
  
  return (
    <svg ref={ref} width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-border/30"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        style={{ strokeDasharray: circumference, strokeDashoffset }}
      />
    </svg>
  )
}

export default function CodingProfilesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // â”€â”€ Live data state (starts from hardcoded fallbacks) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [lc, setLc] = useState<LeetCodeData>({
    solved: 322, activeDays: 176, rating: 1925, topPercentage: 3.78, contests: 22, fallback: true,
  })
  const [cf, setCf] = useState<CodeforcesData>({
    rating: 1290, maxRating: 1290, rank: 'pupil', maxRank: 'pupil', fallback: true,
  })

  useEffect(() => {
    // Retry logic for API calls
    const fetchWithRetry = async (url: string, maxRetries = 3) => {
      for (let i = 0; i < maxRetries; i++) {
        try {
          const res = await fetch(url)
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return await res.json()
        } catch (err) {
          if (i === maxRetries - 1) throw err
          await new Promise(r => setTimeout(r, 1000 * (i + 1)))
        }
      }
    }

    // Fetch LeetCode data
    fetchWithRetry('/api/leetcode')
      .then((d: LeetCodeData) => {
        console.log('LeetCode data updated:', d)
        setLc(d)
      })
      .catch(err => {
        console.error('LeetCode fetch failed after retries:', err)
      })

    // Fetch Codeforces data
    fetchWithRetry('/api/codeforces')
      .then((d: CodeforcesData) => {
        console.log('Codeforces data updated:', d)
        setCf(d)
      })
      .catch(err => {
        console.error('Codeforces fetch failed after retries:', err)
      })
  }, [])

  const lcSolvedProgress = Math.min(Math.round((lc.solved / 500) * 100), 99)
  const lcRatingProgress = Math.min(Math.round(((lc.rating - 1200) / (3500 - 1200)) * 100), 99)
  const lcTopProgress    = Math.min(Math.round((1 - lc.topPercentage / 100) * 100), 99)
  const cfRatingProgress = Math.min(Math.round(((cf.rating - 800) / (3500 - 800)) * 100), 99)

  return (
    <section ref={sectionRef} id="coding-profiles" className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(65,105,225,0.03),transparent_50%)]" />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-[#FFA116]/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFA116]/10 text-[#FFA116] text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            Competitive Programming
          </motion.span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Coding{' '}
            <span className="bg-gradient-to-r from-[#FFA116] via-primary to-secondary bg-clip-text text-transparent">
              Profiles
            </span>
          </h2>
          <p className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Where algorithms meet passionâ€”track my competitive programming journey
          </p>
        </motion.div>

        {/* Featured Profile - LeetCode */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <div className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden max-w-3xl mx-auto shadow-xl">
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(135deg, #FFA11620, transparent, #FFA11620)' }}
            />

            {/* Gradient Header */}
            <div className="relative h-32 bg-gradient-to-r from-[#FFA116] to-[#F9A825]">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <span className="text-white/60 text-xs uppercase tracking-widest font-medium">Featured Platform</span>
                  <h3 className="font-serif text-3xl font-bold text-white">LeetCode</h3>
                  <p className="text-white/80 font-mono text-sm">@hac_brintsi20</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <LiveBadge isFallback={!!lc.fallback} />
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="p-4 rounded-2xl bg-white/20 backdrop-blur-md">
                    <Code2 className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Activity chips */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent"
                >
                  <Flame className="w-4 h-4" />
                  <span className="font-mono text-sm"><AnimatedNumber value={lc.activeDays} /> active days</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary"
                >
                  <Trophy className="w-4 h-4" />
                  <span className="font-mono text-sm"><AnimatedNumber value={lc.contests} /> contests</span>
                </motion.div>
              </div>

              {/* Stats with progress rings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {([
                  { label: 'Problems Solved', value: lc.solved,          suffix: '+', icon: Target,     progress: lcSolvedProgress },
                  { label: 'Contest Rating',   value: lc.rating,          suffix: '',  icon: Trophy,     progress: lcRatingProgress },
                  { label: 'Top',              value: lc.topPercentage,   suffix: '%', icon: TrendingUp, progress: lcTopProgress },
                ] as const).map((stat, index) => {
                  const StatIcon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="relative flex flex-col items-center"
                    >
                      <div className="relative mb-3">
                        <ProgressRing progress={stat.progress} size={90} stroke={6} color="#FFA116" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <StatIcon className="w-6 h-6" style={{ color: '#FFA116' }} />
                        </div>
                      </div>
                      <p className="font-mono text-2xl md:text-3xl font-bold text-foreground">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs text-muted-foreground text-center">{stat.label}</p>
                    </motion.div>
                  )
                })}
              </div>

              {/* Visit link */}
              <Link href={PERSONAL_INFO.profiles.leetcode!} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full py-4 px-6 rounded-xl font-medium overflow-hidden group/btn"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FFA116] to-[#F9A825]"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative flex items-center justify-center gap-2 text-white">
                    View LeetCode Profile
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Other platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <RefreshCw className="w-3 h-3" />
            LeetCode &amp; Codeforces stats refresh every 12 hours from live APIs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* â”€â”€ Codeforces (live) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -6 }}
            className="group relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden"
          >
            <Link href="https://codeforces.com/profile/shiki_20" target="_blank" rel="noopener noreferrer"
              className="absolute inset-0 z-10" aria-label="View Codeforces profile" />
            <div className="h-20 bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] relative">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Codeforces</h3>
                  <p className="text-white/70 font-mono text-xs">@shiki_20</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <LiveBadge isFallback={!!cf.fallback} />
                  <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="font-sans text-xs text-muted-foreground mb-4 text-center">
                {capitalize(cf.rank)} â€¢ Max: {capitalize(cf.maxRank)}
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Rating</span>
                    <span className="font-mono text-lg font-bold text-foreground">
                      <AnimatedNumber value={cf.rating} />
                    </span>
                  </div>
                  <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${cfRatingProgress}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="h-full rounded-full bg-[#1E88E5]"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Rank</span>
                    <span className="font-mono text-lg font-bold text-foreground">{capitalize(cf.rank)}</span>
                  </div>
                  <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '40%' } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.9 }}
                      className="h-full rounded-full bg-[#1E88E5]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* â”€â”€ CodeChef (static â€” no public API) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ y: -6 }}
            className="group relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden"
          >
            <Link href="https://www.codechef.com/users/shiki_20" target="_blank" rel="noopener noreferrer"
              className="absolute inset-0 z-10" aria-label="View CodeChef profile" />
            <div className="h-20 bg-gradient-to-r from-[#5B4638] to-[#3E2723] relative">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">CodeChef</h3>
                  <p className="text-white/70 font-mono text-xs">@shiki_20</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="font-sans text-xs text-muted-foreground mb-4 text-center">
                Div 2 â€¢ Global Rank #6062
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Rating', value: 1772, suffix: '',  progress: 65 },
                  { label: 'Stars',  value: 3,    suffix: 'â˜…', progress: 60 },
                ].map((stat, index) => (
                  <div key={stat.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                      <span className="font-mono text-lg font-bold text-foreground">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                      </span>
                    </div>
                    <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${stat.progress}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className="h-full rounded-full bg-[#8B5C38]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
