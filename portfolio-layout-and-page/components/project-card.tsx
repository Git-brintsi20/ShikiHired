'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight, Clock, Play, Sparkles } from 'lucide-react'
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
  const imageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 300, damping: 30 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
    scale.set(1.05)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    scale.set(1)
    setIsHovered(false)
  }
  
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
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center py-10 lg:py-14`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Section with 3D Tilt */}
      <div className={`flex items-center justify-center ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
        <div
          ref={imageRef}
          className="relative w-full max-w-sm"
          style={{ perspective: '1000px' }}
          onMouseMove={handleMouseMove}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute -inset-4 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--secondary)/0.3), hsl(var(--primary)/0.3), hsl(var(--accent)/0.3))',
              filter: 'blur(30px)',
              opacity: isHovered ? 0.8 : 0.4,
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* 3D Card */}
          <motion.div
            style={{ 
              rotateX, 
              rotateY, 
              scale,
              transformStyle: 'preserve-3d',
            }}
            className="relative bg-card rounded-2xl border border-border/50 overflow-hidden shadow-2xl"
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
                opacity: isHovered ? 1 : 0,
              }}
              animate={isHovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            
            {/* Browser-like header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-card/80 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 rounded-md bg-background/50 flex items-center px-3">
                  <span className="text-xs text-muted-foreground font-mono truncate">
                    {demoUrl ? demoUrl.replace(/^https?:\/\//, '') : `${title.toLowerCase().replace(/\s+/g, '-')}.vercel.app`}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Carousel */}
            <div className="relative aspect-video w-full overflow-hidden bg-background/50">
              {hasImages ? (
                <AnimatePresence mode="sync">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt={`${title} screenshot ${currentImageIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                /* Coming Soon placeholder */
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex flex-col items-center justify-center gap-4">
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
              
              {/* Play button overlay for demos */}
              {demoUrl && hasImages && (
                <motion.a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                  className="absolute inset-0 flex items-center justify-center bg-background/40 z-10"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="p-5 rounded-full bg-primary text-primary-foreground shadow-xl"
                  >
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </motion.div>
                </motion.a>
              )}
              
              {/* Navigation arrows */}
              {hasMultipleImages && (
                <>
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/95 border border-border/50 text-foreground hover:bg-background transition-all shadow-lg z-20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </motion.button>
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/95 border border-border/50 text-foreground hover:bg-background transition-all shadow-lg z-20"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                </>
              )}
            </div>
            
            {/* Dot indicators */}
            {hasMultipleImages && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex flex-col gap-4 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
        {/* Coming Soon Badge */}
        {isComingSoon && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-medium w-fit"
          >
            <Clock size={12} />
            Deployment in Progress
          </motion.span>
        )}
        
        {/* Project number badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Featured Project</span>
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-foreground break-words leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="font-sans text-xs md:text-sm text-primary/80 font-medium">
              {subtitle}
            </p>
          )}
        </div>
        
        <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Tags with stagger animation */}
        <motion.div 
          className="flex flex-wrap gap-2"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } }
          }}
        >
          {tags.map((tag) => (
            <motion.span
              key={tag}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: '0 4px 15px hsl(var(--secondary)/0.2)',
              }}
              className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-mono text-xs font-medium transition-colors hover:border-secondary hover:bg-secondary/20"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Links */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          {demoUrl && (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-medium overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%]"
                animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="relative flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Live Demo
                <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </motion.a>
          )}
          {repoUrl && (
            <motion.a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border-2 border-border text-foreground rounded-xl font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={18} className="group-hover:rotate-12 transition-transform" />
              View Code
            </motion.a>
          )}
          {!demoUrl && !repoUrl && isComingSoon && (
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-muted/30 text-muted-foreground rounded-xl font-medium">
              <Clock size={16} />
              Links coming soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
