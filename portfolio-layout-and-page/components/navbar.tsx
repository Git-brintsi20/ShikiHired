'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { PERSONAL_INFO } from '@/lib/data'
import { useActiveSection } from '@/hooks/use-animations'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  const links = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#tech-stack', id: 'tech-stack' },
    { label: 'Experience', href: '#achievements', id: 'achievements' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ]
  
  const sectionIds = links.map(l => l.id)
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="group flex items-center gap-2 font-serif text-2xl md:text-3xl font-bold"
            >
              <motion.span
                className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_auto]"
                animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                {PERSONAL_INFO.name.split(' ')[0]}
              </motion.span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Sparkles className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 p-1.5 rounded-2xl bg-muted/30 backdrop-blur-sm border border-border/30">
            {links.map((link, index) => {
              const isActive = activeSection === link.id
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className={`relative block px-4 py-2 font-sans text-sm font-medium transition-colors rounded-xl ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {/* Active background indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 180 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                scrolled 
                  ? 'bg-muted/50 border border-border/50' 
                  : 'bg-background/50 backdrop-blur-sm border border-border/30'
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {mounted && (
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? (
                      <Sun size={18} className="text-yellow-500" />
                    ) : (
                      <Moon size={18} className="text-primary" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
                scrolled 
                  ? 'bg-muted/50 border border-border/50' 
                  : 'bg-background/50 backdrop-blur-sm border border-border/30'
              } ${isOpen ? 'bg-primary/10 text-primary' : 'text-foreground'}`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <motion.div 
                className="py-4 space-y-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {links.map((link, index) => {
                  const isActive = activeSection === link.id
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                            : 'text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="mobileActive"
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                          />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Progress indicator bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
        style={{ width: `${scrolled ? Math.min((typeof window !== 'undefined' ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) : 0) * 100, 100) : 0}%` }}
      />
    </motion.nav>
  )
}
