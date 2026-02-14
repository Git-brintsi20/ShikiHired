'use client'

import { useState } from 'react'
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
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
}: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  const hasImages = images && images.length > 0
  const hasMultipleImages = images && images.length > 1

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-16 ${isImageLeft ? 'md:auto-cols-max' : ''}`}>
      {/* Image Section with Carousel */}
      <div className={`flex items-center justify-center ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-accent rounded-lg opacity-20 blur-lg"></div>
          <div className="relative bg-gradient-to-br from-background to-card rounded-lg border-2 border-secondary overflow-hidden shadow-xl">
            {/* Image Container with Defensive CSS */}
            <div className="aspect-video w-full relative bg-gradient-to-br from-secondary/20 via-background to-primary/10">
              {hasImages ? (
                <>
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${title} - Screenshot ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Carousel Controls - Only show if multiple images */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition-all duration-200 hover:scale-110 z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} className="text-foreground" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition-all duration-200 hover:scale-110 z-10"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} className="text-foreground" />
                      </button>
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === currentImageIndex
                                ? 'bg-primary w-6'
                                : 'bg-background/60 hover:bg-background/80'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-foreground/50 font-mono text-sm">Coming Soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with Defensive CSS */}
      <div className={`flex flex-col gap-4 md:gap-6 ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}>
        <div className="space-y-3">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground break-words">
              {title}
            </h3>
            {subtitle && (
              <p className="font-sans text-sm md:text-base text-foreground/60 mt-1 break-words">
                {subtitle}
              </p>
            )}
          </div>
          {/* Defensive CSS: line-clamp-3 to prevent layout breaking */}
          <p className="font-sans text-base md:text-lg text-foreground/70 leading-relaxed line-clamp-3 break-words">
            {description}
          </p>
        </div>

        {/* Tags with Defensive CSS: flex-wrap to handle overflow */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 md:px-4 py-1 md:py-2 rounded-full bg-secondary/20 border border-secondary/40 text-secondary font-sans text-xs md:text-sm font-medium hover:border-secondary transition-colors break-words"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Links - Conditionally render based on availability */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all duration-300 hover:shadow-lg min-h-[44px]"
            >
              Live Demo
              <ExternalLink size={16} />
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-2 md:py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-all duration-300 min-h-[44px]"
            >
              View Code
              <Github size={16} />
            </a>
          )}
          {/* Show placeholder for Bug Tracker when no links available */}
          {!demoUrl && !repoUrl && (
            <div className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-2 md:py-3 border-2 border-muted text-muted-foreground rounded-lg font-medium min-h-[44px] opacity-60 cursor-not-allowed">
              Deployment In Progress
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
