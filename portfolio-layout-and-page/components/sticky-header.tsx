'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ArrowRight, Moon, Sun, Play, Pause } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function StickyHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  const SCROLL_SPEED = 10 // Fixed at 10x

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-scroll effect with ultra-smooth scrolling (no jank)
  useEffect(() => {
    if (!isAutoScrolling || !mounted) return

    let animationFrameId: number
    let velocity = SCROLL_SPEED

    const scroll = () => {
      // Use window.scrollBy with smooth behavior for ultra-smooth native scrolling
      window.scrollBy({
        top: velocity,
        behavior: 'smooth',
      })
      animationFrameId = requestAnimationFrame(scroll)
    }

    // Start with small delay to prevent initial jank
    const startDelay = setTimeout(() => {
      animationFrameId = requestAnimationFrame(scroll)
    }, 100)

    return () => {
      clearTimeout(startDelay)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isAutoScrolling, mounted])

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#tech-stack' },
    { label: 'Coding Profiles', href: '#coding-profiles' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  if (!mounted) return null

  return (
    <>
      {/* Sticky Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Link href="/" className="font-serif text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Harshita
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Desktop Right Section: Auto Scroll + Theme Toggle + CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              {/* Auto Scroll Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isAutoScrolling
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card/80'
                }`}
              >
                {isAutoScrolling ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                Auto Scroll {isAutoScrolling ? '⏸' : '▶'}
              </motion.button>

              {/* Speed Control - Show when active */}
              {isAutoScrolling && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-medium text-muted-foreground px-2"
                >
                  10x
                </motion.div>
              )}

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="p-2.5 rounded-lg bg-card border border-border/50 hover:bg-card/80 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-400" />
                )}
              </motion.button>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm hover:shadow-lg transition-shadow"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 inline ml-1" />
              </motion.a>
            </div>

            {/* Mobile Menu Button + Theme Toggle + Auto Scroll */}
            <div className="md:hidden flex items-center gap-2">
              {/* Auto Scroll Toggle Mobile */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className={`p-2 rounded-lg transition-all ${
                  isAutoScrolling
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border/50 text-muted-foreground hover:bg-card/80'
                }`}
                title="Auto scroll"
              >
                {isAutoScrolling ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </motion.button>

              {/* Theme Toggle Mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-card border border-border/50 hover:bg-card/80 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-400" />
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-card border border-border/50 hover:bg-card/80 transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Speed Control Mobile - Show when active */}
          {isAutoScrolling && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-2 text-center text-xs font-medium text-muted-foreground border-t border-border/50"
            >
              Auto Scroll 10x
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
        transition={{ duration: 0.2 }}
        className={`fixed top-16 left-0 right-0 z-30 md:hidden bg-background/95 backdrop-blur-md border-b border-border/50 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              whileHover={{ x: 4 }}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={() => setIsOpen(false)}
            whileHover={{ scale: 1.02 }}
            className="block w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm text-center hover:shadow-lg transition-shadow"
          >
            Get in Touch
          </motion.a>
        </div>
      </motion.div>

      {/* Spacer to prevent content overlap */}
      <div className="h-0" />
    </>
  )
}
