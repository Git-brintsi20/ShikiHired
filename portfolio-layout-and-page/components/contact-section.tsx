'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Mail, Github, Linkedin, ExternalLink, Send, Sparkles, ArrowRight, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { PERSONAL_INFO } from '@/lib/data'

const socialLinks = [
  {
    name: 'GitHub',
    url: PERSONAL_INFO.profiles.github,
    icon: Github,
    color: 'hover:border-[#333] hover:bg-[#333]/10',
    hoverColor: '#333',
  },
  {
    name: 'LinkedIn',
    url: PERSONAL_INFO.profiles.linkedin,
    icon: Linkedin,
    color: 'hover:border-[#0077B5] hover:bg-[#0077B5]/10',
    hoverColor: '#0077B5',
  },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  // 3D tilt effect for card
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })
  
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <section ref={sectionRef} id="contact" className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(60,179,113,0.05),transparent_70%)]" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6"
          >
            <MessageSquare className="w-4 h-4" />
            Let's Connect
          </motion.span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to{' '}
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Work Together?
            </span>
          </h2>
          <p className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

        {/* 3D Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative bg-card/80 backdrop-blur-md border border-border/50 rounded-3xl overflow-hidden"
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--accent)/0.2), transparent, hsl(var(--primary)/0.2))',
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 opacity-0"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.05) 45%, hsl(var(--primary) / 0.12) 50%, hsl(var(--primary) / 0.05) 55%, transparent 60%)',
              }}
              animate={isHovered ? { x: ['-100%', '200%'], opacity: 1 } : { x: '-100%', opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
            
            <div className="relative p-8 md:p-12">
              {/* Top decoration */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-20 -right-20 w-40 h-40 border border-dashed border-accent/20 rounded-full"
              />
              
              <div className="text-center">
                {/* Icon */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 mb-8"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <Sparkles className="w-10 h-10 text-accent" />
                </motion.div>
                
                <h3 
                  className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  Let's build something amazing
                </h3>
                <p 
                  className="text-muted-foreground mb-8 max-w-md mx-auto"
                  style={{ transform: 'translateZ(15px)' }}
                >
                  Drop me a line and I'll get back to you as soon as possible.
                </p>
                
                {/* CTA Button */}
                <motion.a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-medium text-lg overflow-hidden"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  {/* Animated gradient background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%]"
                    animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <span className="relative flex items-center gap-3 text-white">
                    <Mail className="w-5 h-5" />
                    Send me an email
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                </motion.a>
                
                {/* Email display */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 font-mono text-sm text-muted-foreground"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  {PERSONAL_INFO.email}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon
            return (
              <motion.div 
                key={social.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link href={social.url} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 transition-all duration-300 ${social.color}`}
                  >
                    <IconComponent className="w-5 h-5 text-foreground" />
                    <span className="font-medium text-foreground">{social.name}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Available for new opportunities
          </span>
        </motion.div>
      </div>
    </section>
  )
}
