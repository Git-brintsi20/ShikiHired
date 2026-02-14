'use client'

import { useEffect, useRef, useState } from 'react'
import { STATS } from '@/lib/data'

interface StatCardProps {
  label: string
  value: string
  delay?: number
}

function StatCard({ label, value, delay = 0 }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Extract numeric value from string (e.g., "2+" -> 2)
    const numericValue = parseInt(value.replace(/\D/g, ''))
    const suffix = value.replace(/\d/g, '')
    const duration = 2000 // 2 seconds animation

    let startTime: number
    let animationFrameId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const current = Math.floor(progress * numericValue)
      setDisplayValue(current + suffix)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isVisible, value])

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center gap-2 p-6 md:p-8 rounded-lg bg-background border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
        animation: `${isVisible ? `slideUp 0.6s ease-out ${delay}s forwards` : 'none'}`,
      }}
    >
      <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        {displayValue}
      </p>
      <p className="font-sans text-sm md:text-base text-foreground/70 text-center">{label}</p>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="w-full bg-card border-y border-border py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            By The Numbers
          </h2>
          <p className="font-sans text-base md:text-lg text-foreground/70">
            Metrics that showcase my impact and expertise
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
