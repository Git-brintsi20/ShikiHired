'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import { PERSONAL_INFO } from '@/lib/data'

// Floating shape component
function FloatingShape({ 
  className, 
  delay = 0, 
  duration = 20,
  size = 'w-24 h-24'
}: { 
  className?: string
  delay?: number
  duration?: number
  size?: string
}) {
  return (
    <motion.div
      className={`absolute rounded-full opacity-20 ${size} ${className}`}
      animate={{
        y: [0, -30, 0, 30, 0],
        x: [0, 20, 0, -20, 0],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  const socialLinks = [
    { icon: Github, href: PERSONAL_INFO.github, label: 'GitHub' },
    { icon: Linkedin, href: PERSONAL_INFO.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: 'Email' },
  ]

  if (!mounted) {
    return (
      <section className="relative w-full min-h-screen flex items-center justify-center bg-background" />
    )
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(var(--secondary) / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, hsl(var(--accent) / 0.08) 0%, transparent 70%)',
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -30, 0, 30, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 blur-3xl"
          animate={{
            x: [0, -40, 0, 40, 0],
            y: [0, 20, 0, -20, 0],
            scale: [1, 0.9, 1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Floating geometric shapes */}
      <FloatingShape 
        className="top-20 left-10 bg-primary/30 border-2 border-primary/50" 
        size="w-16 h-16"
        delay={0}
        duration={18}
      />
      <FloatingShape 
        className="top-40 right-20 bg-secondary/30 border-2 border-secondary/50" 
        size="w-12 h-12 rounded-lg"
        delay={2}
        duration={22}
      />
      <FloatingShape 
        className="bottom-40 left-20 bg-accent/30 border-2 border-accent/50" 
        size="w-20 h-20"
        delay={4}
        duration={20}
      />
      <FloatingShape 
        className="bottom-20 right-10 bg-primary/30 border-2 border-primary/50" 
        size="w-14 h-14 rounded-lg"
        delay={1}
        duration={16}
      />
      <FloatingShape 
        className="top-1/2 left-5 bg-secondary/20" 
        size="w-8 h-8"
        delay={3}
        duration={14}
      />
      <FloatingShape 
        className="top-1/3 right-1/4 bg-accent/20" 
        size="w-10 h-10 rounded-lg"
        delay={5}
        duration={19}
      />

      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-100px)] py-12"
        >
          {/* Text Content */}
          <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
            {/* Availability badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available for Remote Work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight break-words"
            >
              {PERSONAL_INFO.heroTitle}
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
            >
              {PERSONAL_INFO.role}
            </motion.p>

            {/* Hero statement */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-base md:text-lg text-foreground/70 leading-relaxed max-w-xl break-words"
            >
              Building high-performance web applications that users love. 
              <span className="text-primary font-medium"> 4 live SaaS platforms</span>, 
              <span className="text-secondary font-medium"> 40% faster load times</span>, 
              real-time collaboration features. From concept to deployment—I ship products, not just code.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium transition-all duration-300 min-h-[52px]"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 0 30px hsl(var(--primary) / 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </motion.a>
              <motion.a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary/50 text-primary rounded-xl font-medium hover:bg-primary/5 transition-all duration-300 min-h-[52px]"
                whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary))' }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Professional Photo */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center order-1 lg:order-2"
          >
            <motion.div
              className="relative w-full max-w-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated glow ring */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl opacity-40 blur-2xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Photo container */}
              <div className="relative bg-gradient-to-br from-primary/20 via-background to-secondary/20 rounded-3xl border-2 border-primary/30 overflow-hidden shadow-2xl aspect-square">
                <Image
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 border-2 border-primary/50 rounded-2xl"
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-secondary/50 rounded-full"
                animate={{ rotate: [0, -90, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.p
          className="text-xs md:text-sm text-foreground/60 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}
