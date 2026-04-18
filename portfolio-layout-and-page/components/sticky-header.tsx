'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ArrowRight, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { PERSONAL_INFO } from '@/lib/data'

export default function StickyHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#tech-stack' },
    { label: 'Coding Profiles', href: '#coding-profiles' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

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

            {/* Desktop Right Section: Theme Toggle + CTA Button */}
            <div className="hidden md:flex items-center gap-4">
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

            {/* Mobile Menu Button + Theme Toggle */}
            <div className="md:hidden flex items-center gap-2">
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
