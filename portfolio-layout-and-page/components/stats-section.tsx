'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { STATS } from '@/lib/data'

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

interface StatCardProps {
  label: string
  value: string
  description?: string
  delay?: number
}

function StatCard({ label, value, description, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  // Parse the value to extract number and suffix
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0
  const suffix = value.replace(/\d/g, '')
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ 
        y: -8, 
        boxShadow: '0 20px 40px -10px hsl(var(--primary) / 0.3)',
        borderColor: 'hsl(var(--primary) / 0.5)',
      }}
      className="group relative flex flex-col items-center gap-3 p-8 rounded-2xl bg-card border border-border/50 transition-all duration-300 cursor-default overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-50 group-hover:opacity-100 transition-opacity" />
      
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <p className="relative font-serif text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        <AnimatedCounter value={numericValue} suffix={suffix} />
      </p>
      
      <p className="relative font-sans text-sm md:text-base text-foreground/80 text-center font-medium">
        {label}
      </p>
      
      {description && (
        <p className="relative font-sans text-xs text-muted-foreground text-center">
          {description}
        </p>
      )}
    </motion.div>
  )
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  return (
    <section ref={sectionRef} className="relative w-full bg-card/50 border-y border-border py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            By The Numbers
          </h2>
          <p className="font-sans text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
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
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
