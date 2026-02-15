'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorSpotlight() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true)
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHoveringInteractive(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHoveringInteractive(false)
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      {/* Main spotlight glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: `radial-gradient(600px at ${cursorXSpring}px ${cursorYSpring}px, hsl(var(--primary) / 0.06), transparent 80%)`,
        }}
      />
      
      {/* Cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHoveringInteractive ? 60 : 12,
          height: isHoveringInteractive ? 60 : 12,
          backgroundColor: isHoveringInteractive ? 'hsl(var(--primary))' : 'white',
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full border-2 border-primary/50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHoveringInteractive ? 80 : 40,
          height: isHoveringInteractive ? 80 : 40,
          opacity: isHoveringInteractive ? 0 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}
