'use client'

import { useState, useEffect } from 'react'

export function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < word.length) {
          setCurrentText(word.substring(0, currentText.length + 1))
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(word.substring(0, currentText.length - 1))
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return currentText
}

// Hook for 3D tilt effect on mouse move
export function use3DTilt(intensity = 10) {
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -intensity
    const rotateY = ((x - centerX) / centerX) * intensity
    
    setTiltStyle({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0 })
  }

  return { tiltStyle, handleMouseMove, handleMouseLeave }
}

// Magnetic button effect hook  
export function useMagnetic(strength = 0.3) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    setPosition({ x: x * strength, y: y * strength })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return { position, handleMouseMove, handleMouseLeave }
}

// Scroll progress hook
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = (window.scrollY / scrollHeight) * 100
      setProgress(scrollProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

// Active section hook for navbar
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return activeSection
}
