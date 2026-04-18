'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { SKILLS } from '@/lib/data'
import { Code, Server, Database, Cloud, Sparkles, Layers, Box, Zap } from 'lucide-react'

// Tech icons mapping - using Lucide icons as fallback + skill level
const techData: Record<string, { level: number; icon?: string }> = {
  // Frontend
  'React': { level: 95 },
  'Next.js': { level: 90 },
  'TypeScript': { level: 88 },
  'JavaScript': { level: 92 },
  'Tailwind CSS': { level: 95 },
  'HTML/CSS': { level: 98 },
  'Redux': { level: 80 },
  'Framer Motion': { level: 85 },
  // Backend
  'Node.js': { level: 88 },
  'Express': { level: 85 },
  'Python': { level: 82 },
  'Flask': { level: 78 },
  'FastAPI': { level: 75 },
  'REST APIs': { level: 90 },
  'GraphQL': { level: 70 },
  // Database
  'PostgreSQL': { level: 82 },
  'MongoDB': { level: 85 },
  'MySQL': { level: 80 },
  'Redis': { level: 72 },
  'Prisma': { level: 78 },
  'Firebase': { level: 75 },
  // DevOps  
  'Git': { level: 90 },
  'GitHub': { level: 92 },
  'Docker': { level: 75 },
  'AWS': { level: 70 },
  'Vercel': { level: 88 },
  'Linux': { level: 78 },
}

// Animated skill bar
function SkillBar({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  
  const progress = useSpring(0, { stiffness: 50, damping: 20 })
  const width = useTransform(progress, (v) => `${v}%`)
  
  if (isInView) {
    setTimeout(() => progress.set(value), delay * 1000)
  }
  
  return (
    <div ref={ref} className="h-1.5 bg-border/50 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
        style={{ width }}
      />
    </div>
  )
}

interface TechBadgeProps {
  name: string
  index: number
  categoryIndex: number
}

function TechBadge({ name, index, categoryIndex }: TechBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const tech = techData[name] || { level: 75 }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 + categoryIndex * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          y: -4,
        }}
        className="relative p-3 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 transition-all duration-300 cursor-default overflow-hidden"
      >
        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)',
          }}
          animate={isHovered ? { x: ['-100%', '200%'], opacity: 1 } : { x: '-100%', opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
        
        <div className="relative space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-medium text-foreground group-hover:text-primary transition-colors">
              {name}
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              className="font-mono text-xs text-muted-foreground"
            >
              {tech.level}%
            </motion.span>
          </div>
          <SkillBar value={tech.level} delay={index * 0.08 + categoryIndex * 0.1} />
        </div>
      </motion.div>
    </motion.div>
  )
}

interface SkillCategoryProps {
  title: string
  skills: string[]
  icon: React.ElementType
  gradient: string
  delay: number
  index: number
}

function SkillCategory({ title, skills, icon: Icon, gradient, delay, index }: SkillCategoryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay }}
      className="relative"
    >
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
        className="flex items-center gap-3 mb-4"
      >
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-lg md:text-xl font-bold text-foreground">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">{skills.length} tech</p>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 gap-2">
        {skills.map((tech, idx) => (
          <TechBadge key={tech} name={tech} index={idx} categoryIndex={index} />
        ))}
      </div>
    </motion.div>
  )
}

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const categories = [
    { title: 'Frontend', skills: SKILLS.frontend, icon: Layers, gradient: 'from-primary to-blue-400', delay: 0 },
    { title: 'Backend', skills: SKILLS.backend, icon: Server, gradient: 'from-secondary to-purple-400', delay: 0.15 },
    { title: 'Database', skills: SKILLS.database, icon: Database, gradient: 'from-accent to-emerald-400', delay: 0.3 },
    { title: 'DevOps & Tools', skills: SKILLS.devops, icon: Cloud, gradient: 'from-orange-500 to-amber-400', delay: 0.45 },
  ]

  return (
    <section ref={sectionRef} id="tech-stack" className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,105,225,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(65,105,225,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" 
        />
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            Technologies
          </motion.span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <p className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life and build scalable applications
          </p>
        </motion.div>

      {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <SkillCategory
              key={cat.title}
              title={cat.title}
              skills={cat.skills}
              icon={cat.icon}
              gradient={cat.gradient}
              delay={cat.delay}
              index={index}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Always learning and exploring new technologies
          </p>
        </motion.div>
      </div>
    </section>
  )
}
