'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Play, Award, Trophy } from 'lucide-react'
import Link from 'next/link'
import { PROJECTS } from '@/lib/data'

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Top 3 featured projects: ELIXA, Bug Tracker, HealthyME
  const featuredProjectIds = ['elixa', 'bug-tracker-saas', 'healthyme-pwa']
  const featured = PROJECTS.filter(p => featuredProjectIds.includes(p.id))

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
      transition: { duration: 0.7 },
    },
  }

  return (
    <section ref={sectionRef} id="projects" className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,105,225,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(65,105,225,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Award className="w-4 h-4" />
            Featured Work
          </motion.span>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            My Best{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Products that solve real problems and ship real value · 2 hackathon wins, production deployments
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {featured.map((project) => {
            const isWinner = project.id === 'elixa'
            const isTopFinalist = project.id === 'plantz'

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Award Badge */}
                {isWinner && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white text-xs font-bold flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
                    MongoDB Winner
                  </motion.div>
                )}

                {/* Gradient Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="p-6 pr-32 h-full flex flex-col gap-5">
                  {/* Title & Category */}
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-foreground/70 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Key Achievements
                    </p>
                    <div className="space-y-1">
                      {project.achievements?.slice(0, 3).map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-border/30">
                    {project.demoUrl && (
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
                        >
                          <Play className="w-3.5 h-3.5" />
                          Demo
                        </motion.button>
                      </Link>
                    )}
                    {project.repoUrl && (
                      <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 px-3 py-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold hover:shadow-lg transition-shadow"
          >
            Explore All 5 Projects
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
