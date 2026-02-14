'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail, ArrowRight, Heart } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { PERSONAL_INFO } from '@/lib/data'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: '-50px' })

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: PERSONAL_INFO.profiles.github },
    { icon: Linkedin, label: 'LinkedIn', href: PERSONAL_INFO.profiles.linkedin },
    { icon: Mail, label: 'Email', href: `mailto:${PERSONAL_INFO.email}` },
  ]

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#tech-stack' },
    { label: 'Experience', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer ref={footerRef} className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <Link
              href="/"
              className="font-serif text-2xl font-bold text-primary hover:text-primary/80 transition-colors w-fit"
            >
              {PERSONAL_INFO.name.split(' ')[0]}
            </Link>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs">
              {PERSONAL_INFO.tagline}. Building scalable web applications with precision and creative vision.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-serif text-lg font-semibold text-foreground">Navigate</h3>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors w-fit flex items-center gap-2 group"
                >
                  {link.label}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -ml-1 group-hover:ml-0 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-serif text-lg font-semibold text-foreground">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.div key={label} whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    className="flex p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-300 border border-border/50"
                  >
                    <Icon size={20} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-border my-8 origin-left"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="font-sans text-xs text-muted-foreground flex items-center gap-1">
            &copy; {currentYear} {PERSONAL_INFO.name}. Built with <Heart size={12} className="text-red-500 fill-red-500" /> in India.
          </p>
          <p className="font-mono text-xs text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border border-border/50">
            Next.js • TypeScript • Tailwind CSS • Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
