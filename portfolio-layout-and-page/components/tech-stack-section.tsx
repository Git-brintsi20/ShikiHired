'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '@/lib/data'

interface TechBadgeProps {
  name: string
  index: number
}

function TechBadge({ name, index }: TechBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.08, 
        y: -4,
        boxShadow: '0 8px 30px rgba(65, 105, 225, 0.15)',
      }}
      className="px-4 md:px-6 py-2 md:py-3 rounded-xl bg-background border border-border/50 font-sans text-sm md:text-base text-foreground/80 hover:border-primary/50 transition-colors duration-300 cursor-default text-center break-words"
    >
      {name}
    </motion.div>
  )
}

interface SkillCategoryProps {
  title: string
  skills: string[]
  color: string
  delay: number
}

function SkillCategory({ title, skills, color, delay }: SkillCategoryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay }}
      className="space-y-4"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
        className={`font-serif text-xl md:text-2xl font-bold ${color} mb-6 flex items-center gap-3`}
      >
        <span className={`w-2 h-8 rounded-full bg-current`} />
        {title}
      </motion.h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {skills.map((tech, idx) => (
          <TechBadge key={tech} name={tech} index={idx} />
        ))}
      </div>
    </motion.div>
  )
}

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const categories = [
    { title: 'Frontend', skills: SKILLS.frontend, color: 'text-primary', delay: 0 },
    { title: 'Backend', skills: SKILLS.backend, color: 'text-secondary', delay: 0.15 },
    { title: 'Database', skills: SKILLS.database, color: 'text-accent', delay: 0.3 },
    { title: 'DevOps & Tools', skills: SKILLS.devops, color: 'text-primary', delay: 0.45 },
  ]

  return (
    <section ref={sectionRef} id="tech-stack" className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
            Technologies
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tech Stack
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to build modern, scalable applications
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {categories.map((cat) => (
            <SkillCategory
              key={cat.title}
              title={cat.title}
              skills={cat.skills}
              color={cat.color}
              delay={cat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
