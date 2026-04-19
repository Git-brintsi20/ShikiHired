'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { PROJECTS } from '@/lib/data'

export default function ProjectsCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  // Get top featured projects with images
  const featuredProjectIds = ['elixa', 'bug-tracker-saas', 'ciphersuite', 'healthyme-pwa', 'plantz']
  const carouselProjects = PROJECTS.filter(p => featuredProjectIds.includes(p.id))

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoPlay || carouselProjects.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % carouselProjects.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [autoPlay, carouselProjects.length])

  const currentProject = carouselProjects[currentIndex]
  const currentImage = currentProject?.images?.[0]

  const handlePrev = () => {
    setAutoPlay(false)
    setCurrentIndex(prev => (prev - 1 + carouselProjects.length) % carouselProjects.length)
  }

  const handleNext = () => {
    setAutoPlay(false)
    setCurrentIndex(prev => (prev + 1) % carouselProjects.length)
  }

  if (!currentProject) return null

  return (
    <section ref={sectionRef} id="projects" className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,105,225,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(65,105,225,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Best{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Auto-rotating showcase of my highest-impact work
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          {/* Main Image Container */}
          <div className="relative w-full aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
            <AnimatePresence>
              {currentImage && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImage}
                    alt={currentProject.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Project Info Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white"
            >
              <div className="max-w-2xl">
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                  {currentProject.title}
                </h3>
                <p className="text-sm md:text-base text-gray-200 mb-4 line-clamp-2">
                  {currentProject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Carousel Dots */}
            <div className="flex gap-2">
              {carouselProjects.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setAutoPlay(false)
                    setCurrentIndex(idx)
                  }}
                  animate={{
                    width: idx === currentIndex ? 32 : 8,
                    backgroundColor: idx === currentIndex ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                  }}
                  className="h-2 rounded-full transition-all cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>

            {/* Arrow Controls */}
            <div className="flex gap-3">
              <motion.button
                onClick={handlePrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Auto-play Toggle */}
            <motion.button
              onClick={() => setAutoPlay(!autoPlay)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                autoPlay
                  ? 'bg-primary text-white'
                  : 'bg-primary/10 text-primary border border-primary/30'
              }`}
            >
              {autoPlay ? '▶ Auto' : '⏸ Manual'}
            </motion.button>
          </div>

          {/* Counter */}
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} / {carouselProjects.length}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
