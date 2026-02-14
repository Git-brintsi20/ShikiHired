'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, GraduationCap, Pen, Mic } from 'lucide-react'
import Image from 'next/image'
import { PERSONAL_INFO, EDUCATION } from '@/lib/data'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }
  
  const highlights = [
    {
      icon: GraduationCap,
      title: '3rd Year CS Student',
      description: 'IIIT Jabalpur | CGPA 8.1',
    },
    {
      icon: MapPin,
      title: 'Based in India',
      description: 'Remote Available Globally',
    },
    {
      icon: Pen,
      title: 'Creative Writer',
      description: 'Poetry on Medium as "Shiki"',
    },
    {
      icon: Mic,
      title: 'Public Speaker',
      description: 'Event Anchor & Host',
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="relative w-full bg-card/50 border-y border-border py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Image Column */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Decorative frame */}
              <motion.div
                className="absolute -inset-4 border-2 border-primary/30 rounded-3xl"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -inset-8 border border-secondary/20 rounded-3xl"
                animate={{ rotate: [0, -2, 0, 2, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border-2 border-border shadow-xl">
                <Image
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-cover object-top"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
          
          {/* Content Column */}
          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-4">
                Who I Am
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Beyond The Code
              </h2>
            </motion.div>
            
            <motion.p variants={itemVariants} className="font-sans text-base md:text-lg text-foreground/70 leading-relaxed">
              I'm a passionate full-stack developer who believes in building products that make a real difference. 
              My journey started with curiosity about how websites work, and now I ship production-ready applications 
              that handle real users and real data.
            </motion.p>
            
            <motion.p variants={itemVariants} className="font-sans text-base md:text-lg text-foreground/70 leading-relaxed">
              When I'm not coding, you'll find me writing poetry on Medium under the pen name "Shiki," 
              anchoring college events, or diving into competitive programming challenges. I'm always looking 
              for opportunities that combine technical excellence with creative problem-solving.
            </motion.p>
            
            {/* Highlights Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-4">
              {highlights.map(({ icon: Icon, title, description }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -4, borderColor: 'hsl(var(--primary) / 0.5)' }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/50 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-foreground">{title}</h4>
                    <p className="font-sans text-xs text-muted-foreground">{description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Remote Available Badge */}
            <motion.div variants={itemVariants} className="mt-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available for Remote Work
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
