'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { MapPin, GraduationCap, Pen, Mic, Sparkles, Quote } from 'lucide-react'
import Image from 'next/image'
import { PERSONAL_INFO } from '@/lib/data'
import { use3DTilt } from '@/hooks/use-animations'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { tiltStyle, handleMouseMove, handleMouseLeave } = use3DTilt(8)
  const [imageRevealed, setImageRevealed] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  }
  
  const highlights = [
    {
      icon: GraduationCap,
      title: '3rd Year CS Student',
      description: 'IIIT Jabalpur | CGPA 8.1',
      color: 'from-primary to-blue-400',
    },
    {
      icon: MapPin,
      title: 'Based in India',
      description: 'Remote Available Globally',
      color: 'from-accent to-emerald-400',
    },
    {
      icon: Pen,
      title: 'Creative Writer',
      description: 'Poetry on Medium as "Shiki"',
      color: 'from-secondary to-purple-400',
    },
    {
      icon: Mic,
      title: 'Public Speaker',
      description: 'Event Anchor & Host',
      color: 'from-orange-500 to-amber-400',
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          style={{ y: parallaxY }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-[100px]" 
        />
        <motion.div 
          style={{ y: parallaxY2 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-secondary/10 to-accent/5 rounded-full blur-[100px]" 
        />
        
        {/* Decorative dots pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(65,105,225,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image Column with 3D Tilt */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <div 
              className="relative"
              style={{ perspective: '1000px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Animated decorative rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 border border-dashed border-primary/20 rounded-[2rem]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-12 border border-dotted border-secondary/10 rounded-[2.5rem]"
              />
              
              <motion.div
                style={{
                  rotateX: tiltStyle.rotateX,
                  rotateY: tiltStyle.rotateY,
                  transformStyle: 'preserve-3d',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative"
              >
                {/* Glassmorphism card behind image */}
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 blur-sm" />
                
                <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl">
                  {/* Image reveal animation */}
                  <motion.div
                    initial={{ scaleY: 1 }}
                    animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    onAnimationComplete={() => setImageRevealed(true)}
                    style={{ originY: 0 }}
                    className="absolute inset-0 z-20 bg-gradient-to-b from-primary to-secondary"
                  />
                  
                  <Image
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    fill
                    className="object-cover object-top"
                    sizes="450px"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-primary/10" />
                  
                  {/* Floating quote badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={imageRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-background/80 backdrop-blur-md border border-border/50"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <Quote className="w-4 h-4 text-primary mb-2" />
                    <p className="text-xs text-foreground/80 italic leading-relaxed">
                      "Building products that make a real difference, one line of code at a time."
                    </p>
                  </motion.div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 p-4 rounded-2xl bg-card/90 backdrop-blur-md border border-border shadow-xl"
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <Sparkles className="w-6 h-6 text-accent" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Content Column */}
          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                About Me
              </motion.span>
              
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Beyond The{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Code
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{ originX: 0 }}
                  />
                </span>
              </h2>
            </motion.div>
            
            <motion.p variants={itemVariants} className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer who believes in building products that make a real difference. 
              My journey started with curiosity about how websites work, and now I ship production-ready applications 
              that handle real users and real data.
            </motion.p>
            
            <motion.p variants={itemVariants} className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me writing poetry on Medium under the pen name "Shiki," 
              anchoring college events, or diving into competitive programming challenges. I'm always looking 
              for opportunities that combine technical excellence with creative problem-solving.
            </motion.p>
            
            {/* Glassmorphism Highlights Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-6">
              {highlights.map(({ icon: Icon, title, description, color }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
                  }}
                  className="group relative flex items-start gap-3 p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient hover background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className={`relative p-2.5 rounded-xl bg-gradient-to-br ${color} text-white shrink-0`}>
                    <Icon size={18} />
                  </div>
                  <div className="relative">
                    <h4 className="font-sans text-sm font-semibold text-foreground">{title}</h4>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">{description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA Badge */}
            <motion.div variants={itemVariants} className="mt-6">
              <motion.span
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(60,179,113,0.3)' }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30 text-accent font-medium cursor-pointer transition-all duration-300"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                </span>
                Open for Opportunities
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
