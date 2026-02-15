'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, Sparkles, Code, Terminal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PERSONAL_INFO } from '@/lib/data'
import { useTypewriter, use3DTilt } from '@/hooks/use-animations'
import ParticleField from './particle-field'

// Floating code snippets for background
const codeSnippets = [
  'const build = () => {}',
  'async function deploy()',
  'npm run dev',
  'git push origin main',
  '<Component />',
  'useState()',
  'useEffect(() => {})',
]

function FloatingCode({ snippet, delay }: { snippet: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ 
        opacity: [0, 0.3, 0.3, 0],
        x: ['-10%', '110%'],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute font-mono text-xs text-primary/20 whitespace-nowrap pointer-events-none"
      style={{ top: `${Math.random() * 80 + 10}%` }}
    >
      {snippet}
    </motion.div>
  )
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { tiltStyle, handleMouseMove, handleMouseLeave } = use3DTilt(15)
  
  const roles = ['Full-Stack Developer', 'Problem Solver', 'UI/UX Enthusiast', 'Open Source Contributor']
  const typedRole = useTypewriter(roles, 80, 40, 2000)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  const socialLinks = [
    { icon: Github, href: PERSONAL_INFO.github, label: 'GitHub', color: 'hover:text-white hover:bg-[#333]' },
    { icon: Linkedin, href: PERSONAL_INFO.linkedin, label: 'LinkedIn', color: 'hover:text-white hover:bg-[#0077B5]' },
    { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: 'Email', color: 'hover:text-white hover:bg-primary' },
  ]

  if (!mounted) return null

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleField />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[128px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/30 rounded-full blur-[128px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" 
        />
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets.map((snippet, i) => (
          <FloatingCode key={i} snippet={snippet} delay={i * 2} />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(65,105,225,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(65,105,225,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6 text-center lg:text-left"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 justify-center lg:justify-start"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <span className="text-sm text-accent font-medium">Available for opportunities</span>
            </motion.div>

            {/* Main Title */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-2 justify-center lg:justify-start mb-2"
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">Hello, I'm</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              >
                <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  {PERSONAL_INFO.name.split(' ')[0]}
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  {PERSONAL_INFO.name.split(' ').slice(1).join(' ')}
                </span>
              </motion.h1>
            </div>

            {/* Typewriter Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="h-10 flex items-center justify-center lg:justify-start gap-2"
            >
              <Terminal className="w-5 h-5 text-primary" />
              <span className="font-mono text-lg md:text-xl text-foreground/80">
                {typedRole}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <Link href="#projects">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(65,105,225,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    View My Work
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%]"
                    animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.button>
              </Link>
              
              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-transparent border-2 border-border text-foreground rounded-xl font-medium text-lg hover:bg-primary/5 transition-all duration-300"
                >
                  Let's Connect
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex gap-3 justify-center lg:justify-start pt-2"
            >
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    className={`flex p-3 rounded-xl bg-card border border-border/50 text-muted-foreground transition-all duration-300 ${color}`}
                  >
                    <Icon size={22} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Profile Image with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                style={{
                  rotateX: tiltStyle.rotateX,
                  rotateY: tiltStyle.rotateY,
                  transformStyle: 'preserve-3d',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative"
              >
                {/* Glow Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30"
                />
                
                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-xl opacity-50 animate-pulse" />
                
                {/* Image Container */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                  <Image
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    fill
                    className="object-cover object-top"
                    sizes="400px"
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                </div>

                {/* Floating badges around image */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 p-3 bg-card border border-border rounded-xl shadow-lg"
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <Code className="w-6 h-6 text-primary" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 px-4 py-2 bg-card border border-border rounded-xl shadow-lg"
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <span className="font-mono text-sm text-accent">275+ solved</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-1/2 -right-8 p-3 bg-card border border-border rounded-xl shadow-lg"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <span className="font-mono text-xs text-secondary">IIIT-J</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
