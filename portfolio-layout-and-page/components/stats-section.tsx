'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { STATS } from '@/lib/data'
import { Sparkles, TrendingUp, Code, Award } from 'lucide-react'

// Icons mapping for stats
const statIcons = [Code, TrendingUp, Sparkles, Award]

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: 2,
  })
  
  const displayValue = useTransform(springValue, (latest) => Math.round(latest))
  const [currentValue, setCurrentValue] = useState(0)
  
  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])
  
  useEffect(() => {
    const unsubscribe = displayValue.on('change', (v) => {
      setCurrentValue(v)
    })
    return () => unsubscribe()
  }, [displayValue])
  
  return (
    <span ref={ref}>
      {currentValue}{suffix}
    </span>
  )
}

// Radial progress ring component
function RadialProgress({ progress, size = 120, strokeWidth = 8, delay = 0 }: { 
  progress: number; size?: number; strokeWidth?: number; delay?: number 
}) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  
  const progressValue = useSpring(0, { stiffness: 30, damping: 20 })
  const strokeDashoffset = useTransform(progressValue, (v) => circumference - (v / 100) * circumference)
  
  useEffect(() => {
    if (isInView) {
      setTimeout(() => progressValue.set(progress), delay * 1000)
    }
  }, [isInView, progress, progressValue, delay])
  
  return (
    <svg ref={ref} width={size} height={size} className="rotate-[-90deg]">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-border/50"
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{ strokeDasharray: circumference, strokeDashoffset }}
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="50%" stopColor="hsl(var(--secondary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
    </svg>
  )
}

interface StatCardProps {
  label: string
  value: string
  description?: string
  delay?: number
  index?: number
}

function StatCard({ label, value, description, delay = 0, index = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)
  
  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }
  
  // Parse the value to extract number and suffix
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0
  const suffix = value.replace(/\d/g, '')
  
  const Icon = statIcons[index % statIcons.length]
  const progressValue = Math.min(numericValue, 100) // Cap at 100 for visual
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -15 }}
      transition={{ duration: 0.7, delay }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative flex flex-col items-center gap-4 p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 transition-all duration-500 cursor-default overflow-hidden h-full"
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.3), hsl(var(--accent)/0.3))',
            opacity: isHovered ? 1 : 0,
          }}
        />
        
        {/* Inner glow */}
        <div className="absolute inset-[1px] rounded-3xl bg-card" />
        
        {/* Particle burst on hover */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full bg-primary/20 pointer-events-none"
          />
        )}
        
        {/* Icon with radial progress */}
        <div className="relative z-10">
          <RadialProgress progress={progressValue} size={100} strokeWidth={6} delay={delay} />
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Icon className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
        
        {/* Value */}
        <motion.p 
          className="relative z-10 font-serif text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          style={{ transform: 'translateZ(30px)' }}
        >
          <AnimatedCounter value={numericValue} suffix={suffix} />
        </motion.p>
        
        {/* Label */}
        <motion.p 
          className="relative z-10 font-sans text-sm md:text-base text-foreground/90 text-center font-medium"
          style={{ transform: 'translateZ(20px)' }}
        >
          {label}
        </motion.p>
        
        {/* Description */}
        {description && (
          <motion.p 
            className="relative z-10 font-sans text-xs text-muted-foreground text-center"
            style={{ transform: 'translateZ(10px)' }}
          >
            {description}
          </motion.p>
        )}
        
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
            opacity: isHovered ? 1 : 0,
          }}
          animate={isHovered ? { x: ['0%', '200%'] } : { x: '0%' }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Background with grid pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,105,225,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(65,105,225,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" 
        />
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <TrendingUp className="w-4 h-4" />
            Metrics
          </motion.span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            By The{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>
          <p className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Metrics that showcase my impact and expertise in building real-world applications
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              delay={index * 0.15}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
