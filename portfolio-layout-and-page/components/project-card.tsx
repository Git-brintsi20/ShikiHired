'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  subtitle?: string
  description: string
  tags: string[]
  demoUrl?: string
  repoUrl?: string
  images: string[]
  isImageLeft?: boolean
  isComingSoon?: boolean
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  tags,
  demoUrl,
  repoUrl,
  images,
  isImageLeft = false,
  isComingSoon = false,
}: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const hasImages = images && images.length > 0
  const hasMultipleImages = images && images.length > 1
  
  // Auto-rotate images
  useEffect(() => {
    if (!hasMultipleImages || !isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [hasMultipleImages, images?.length, isAutoPlaying])
  
  const nextImage = useCallback(() => {
    if (!hasMultipleImages) return
    setIsAutoPlaying(false)
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }, [hasMultipleImages, images?.length])
  
  const prevImage = useCallback(() => {
    if (!hasMultipleImages) return
    setIsAutoPlaying(false)
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [hasMultipleImages, images?.length])
  
  const goToImage = useCallback((index: number) => {
    setIsAutoPlaying(false)
    setCurrentImageIndex(index)
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-16`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className={`flex items-center justify-center ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.div
          className="relative w-full max-w-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-secondary via-primary to-accent rounded-2xl blur-xl"
            animate={{
              opacity: isHovered ? 0.4 : 0.2,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Image container */}
          <div className="relative bg-gradient-to-br from-background to-card rounded-2xl border-2 border-secondary/30 overflow-hidden shadow-2xl">
            {/* Carousel */}
            <div className="relative aspect-video w-full overflow-hidden">
              {hasImages ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt={`${title} screenshot ${currentImageIndex + 1}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                /* Coming Soon placeholder */
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex flex-col items-center justify-center gap-4">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-4 rounded-full bg-primary/10 border border-primary/30"
                  >
                    <Clock className="w-8 h-8 text-primary" />
                  </motion.div>
                  <span className="font-mono text-sm text-foreground/60">Deployment in Progress</span>
                  <span className="font-sans text-xs text-muted-foreground">Screenshots coming soon</span>
                </div>
              )}
              
              {/* Navigation arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                    style={{ opacity: isHovered ? 1 : 0 }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                    style={{ opacity: isHovered ? 1 : 0 }}
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {/* Dot indicators */}
            {hasMultipleImages && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-primary w-6'
                        : 'bg-foreground/30 hover:bg-foreground/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className={`flex flex-col gap-5 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
        {/* Coming Soon Badge */}
        {isComingSoon && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-medium w-fit"
          >
            <Clock size={12} />
            Deployment in Progress
          </motion.span>
        )}
        
        <div className="space-y-2">
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground break-words">
            {title}
          </h3>
          {subtitle && (
            <p className="font-sans text-sm md:text-base text-primary font-medium">
              {subtitle}
            </p>
          )}
        </div>
        
        <p className="font-sans text-base md:text-lg text-foreground/70 leading-relaxed line-clamp-4 break-words">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-sans text-xs md:text-sm font-medium transition-colors hover:border-secondary hover:bg-secondary/20"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* CTA Links */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          {demoUrl && (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium transition-all duration-300 min-h-[48px]"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 25px hsl(var(--accent) / 0.4)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse" />
              Live Demo
              <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          )}
          {repoUrl && (
            <motion.a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary/50 text-primary rounded-xl font-medium hover:bg-primary/5 transition-all duration-300 min-h-[48px]"
              whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary))' }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={18} />
              View Code
            </motion.a>
          )}
          {!demoUrl && !repoUrl && isComingSoon && (
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-muted/50 text-muted-foreground rounded-xl font-medium">
              <Clock size={16} />
              Links coming soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
