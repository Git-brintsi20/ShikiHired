'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loader for minimum 800ms for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    // Also hide when page is fully loaded
    if (document.readyState === 'complete') {
      setIsLoading(false)
    }

    const handleLoad = () => setIsLoading(false)
    window.addEventListener('load', handleLoad)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"
            />
          </div>

          {/* Loading content */}
          <div className="text-center space-y-6">
            {/* Animated logo/brand */}
            <motion.div
              animate={{ scale: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            >
              Harshita
            </motion.div>

            {/* Loading bar */}
            <div className="w-64 h-1 bg-border/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full w-1/3 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
              />
            </div>

            {/* Loading text */}
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-sm text-muted-foreground font-medium"
            >
              Loading your portfolio...
            </motion.p>

            {/* Dots animation */}
            <div className="flex justify-center gap-2 pt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
