'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Briefcase, Award, Calendar, Zap, Trophy } from 'lucide-react'
import { EXPERIENCE, EDUCATION, CERTIFICATES } from '@/lib/data'

type TimelineItem = {
  id: string
  type: 'experience' | 'education' | 'certificate'
  title: string
  organization: string
  period: string
  description: string
  icon: typeof GraduationCap
}

const timelineData: TimelineItem[] = [
  // Education
  {
    id: 'edu-1',
    type: 'education',
    title: EDUCATION[0].degree,
    organization: EDUCATION[0].institution,
    period: EDUCATION[0].period,
    description: EDUCATION[0].grade || 'B.Tech CSE',
    icon: GraduationCap,
  },
  // Experience
  ...EXPERIENCE.map((exp, index) => ({
    id: `exp-${index}`,
    type: 'experience' as const,
    title: exp.role,
    organization: exp.company,
    period: exp.year,
    description: exp.description,
    icon: Briefcase,
  })),
  // Certificates
  ...CERTIFICATES.map((cert, index) => ({
    id: `cert-${index}`,
    type: 'certificate' as const,
    title: cert.title,
    organization: cert.issuer,
    period: cert.year,
    description: '',
    icon: Award,
  })),
]

const typeColors = {
  experience: {
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    text: 'text-primary',
    dot: 'bg-primary',
  },
  education: {
    bg: 'bg-accent/10',
    border: 'border-accent/30',
    text: 'text-accent',
    dot: 'bg-accent',
  },
  certificate: {
    bg: 'bg-secondary/10',
    border: 'border-secondary/30',
    text: 'text-secondary',
    dot: 'bg-secondary',
  },
}

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section ref={sectionRef} id="achievements" className="relative w-full bg-gradient-to-br from-background/60 via-background to-card/40 border-y border-border/50 py-16 md:py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-medium mb-4"
          >
            <Trophy className="w-4 h-4" />
            My Journey
          </motion.span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Achievements & <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional growth, technical expertise, and strategic milestones on my journey as a developer
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { type: 'experience', label: 'Experience' },
            { type: 'education', label: 'Education' },
            { type: 'certificate', label: 'Certificates' },
          ].map(({ type, label }) => (
            <span
              key={type}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${typeColors[type as keyof typeof typeColors].bg} ${typeColors[type as keyof typeof typeColors].border} border text-sm`}
            >
              <span className={`w-2 h-2 rounded-full ${typeColors[type as keyof typeof typeColors].dot}`} />
              <span className={typeColors[type as keyof typeof typeColors].text}>{label}</span>
            </span>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative max-w-4xl mx-auto"
        >
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {timelineData.map((item, index) => {
            const colors = typeColors[item.type]
            const IconComponent = item.icon
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`relative flex items-center mb-6 md:mb-8 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot on timeline */}
                <motion.div
                  className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full ${colors.dot} md:-translate-x-1/2 border-4 border-background shadow-lg z-10`}
                  whileHover={{ scale: 1.3 }}
                />

                {/* Content Card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div
                    className={`p-6 rounded-2xl bg-background border ${colors.border} hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
                  >
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10`} />

                    {/* Header */}
                    <div className="flex items-start gap-4 mb-3 relative z-10">
                      <motion.div
                        className={`p-3 rounded-xl ${colors.bg} shrink-0`}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                      >
                        <IconComponent className={`w-5 h-5 ${colors.text}`} />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-sans text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.organization}</p>
                      </div>
                      {item.type === 'experience' && (
                        <Zap className="w-5 h-5 text-[hsl(25_100%_52%)] flex-shrink-0 mt-1" />
                      )}
                    </div>

                    {/* Period Badge */}
                    <motion.div
                      className="flex items-center gap-2 mb-3 relative z-10"
                      whileHover={{ x: 5 }}
                    >
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">{item.period}</span>
                    </motion.div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 relative z-10">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
