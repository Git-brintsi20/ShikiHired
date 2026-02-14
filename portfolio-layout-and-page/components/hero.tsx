'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { PERSONAL_INFO } from '@/lib/data'

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Staggered animations for hero elements
    const elements = [
      { ref: nameRef, delay: 0 },
      { ref: subtitleRef, delay: 0.15 },
      { ref: descRef, delay: 0.3 },
      { ref: buttonsRef, delay: 0.45 },
      { ref: imageRef, delay: 0.6 },
    ]

    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        ref.current.style.opacity = '0'
        ref.current.style.transform = 'translateY(20px)'
        ref.current.style.transition = `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`
        
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.opacity = '1'
            ref.current.style.transform = 'translateY(0)'
          }
        }, 50)
      }
    })
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-background overflow-hidden pt-16 md:pt-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center min-h-[calc(100vh-100px)] py-12 md:py-0">
          {/* Text Content */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Main Name */}
            <h1
              ref={nameRef}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight break-words"
            >
              {PERSONAL_INFO.heroTitle}
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-sans text-2xl md:text-3xl font-semibold text-primary break-words"
            >
              {PERSONAL_INFO.role}
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="font-sans text-base md:text-lg text-foreground/70 leading-relaxed max-w-xl break-words"
            >
              {PERSONAL_INFO.bio}
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[44px] group active:translate-y-0"
              >
                View My Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-all duration-300 min-h-[44px]"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Professional Photo */}
          <div ref={imageRef} className="flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl opacity-20 blur-xl"></div>

              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-primary/15 via-background to-secondary/10 rounded-2xl border-4 border-primary overflow-hidden shadow-2xl aspect-square">
                <Image
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-xs md:text-sm text-foreground/60 font-medium">Scroll to explore</p>
        <svg
          className="w-5 h-5 text-primary animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
