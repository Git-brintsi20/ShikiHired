'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, ChevronUp } from 'lucide-react'

export default function AutoScrollToggle() {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(5) // pixels per frame (5-10)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    if (!isAutoScrolling) return

    let animationFrameId: number

    const scroll = () => {
      window.scrollBy({
        top: scrollSpeed,
        behavior: 'smooth',
      })
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isAutoScrolling, scrollSpeed])

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (!showControls) return
    const timer = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(timer)
  }, [showControls])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Auto-Scroll Control Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-40 flex items-center gap-3 p-3 rounded-full bg-card/90 backdrop-blur-md border border-border/50 shadow-lg"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(true)}
          >
            {/* Toggle Auto-Scroll */}
            <motion.button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full transition-all ${
                isAutoScrolling
                  ? 'bg-primary text-white'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
              title={isAutoScrolling ? 'Stop auto-scroll' : 'Start auto-scroll'}
            >
              {isAutoScrolling ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </motion.button>

            {/* Speed Control Slider */}
            {isAutoScrolling && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center gap-2 pl-2 border-l border-border/30"
              >
                <input
                  type="range"
                  min="5"
                  max="10"
                  value={scrollSpeed}
                  onChange={(e) => setScrollSpeed(Number(e.target.value))}
                  className="w-20 h-1 rounded-lg appearance-none cursor-pointer accent-primary"
                  title={`Speed: ${scrollSpeed}x`}
                />
                <span className="text-xs text-muted-foreground font-medium min-w-max">
                  {scrollSpeed}x
                </span>
              </motion.div>
            )}

            {/* Scroll to Top */}
            <motion.button
              onClick={handleScrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all ml-1"
              title="Scroll to top"
            >
              <ChevronUp className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Indicator - Shows when hidden */}
      <AnimatePresence>
        {!showControls && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setShowControls(true)}
            onMouseEnter={() => setShowControls(true)}
            whileHover={{ scale: 1.15 }}
            className="fixed top-20 right-4 z-40 w-10 h-10 rounded-full bg-primary/80 hover:bg-primary text-white flex items-center justify-center shadow-lg transition-all"
            title="Show auto scroll"
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              {isAutoScrolling ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
