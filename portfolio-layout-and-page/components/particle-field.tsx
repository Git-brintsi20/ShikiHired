'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function ParticleField({ 
  particleCount = 50,
  className = '' 
}: { 
  particleCount?: number
  className?: string 
}) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
  ]

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const newParticles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    setParticles(newParticles)
  }, [dimensions, particleCount])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          initial={{
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: [particle.x, particle.x + particle.speedX * 200, particle.x],
            y: [particle.y, particle.y + particle.speedY * 200, particle.y],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Connection lines effect */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Floating code snippets background
export function CodeSnippetsBg() {
  const snippets = [
    'const dev = "creative";',
    '<Component />',
    'async function build() {}',
    'npm run deploy',
    'git push origin main',
    'export default App;',
    '{ ...spread }',
    '() => magic',
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs sm:text-sm text-primary/10 whitespace-nowrap"
          style={{
            top: `${10 + (i * 12)}%`,
            left: i % 2 === 0 ? `${5 + (i * 3)}%` : `${60 + (i * 3)}%`,
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
            y: [0, -20, 0],
            x: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          {snippet}
        </motion.div>
      ))}
    </div>
  )
}

// Star field for hero background
export function StarField({ starCount = 100 }: { starCount?: number }) {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
    }))
    setStars(newStars)
  }, [starCount])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  )
}
