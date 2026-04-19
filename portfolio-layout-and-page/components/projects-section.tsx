'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from './project-card'
import { PROJECTS } from '@/lib/data'

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  // Reorder projects: Put Bug Tracker (coming soon) at the end
  const sortedProjects = [...PROJECTS.filter(p => p.featured)].sort((a, b) => {
    // Projects with demoUrl come first
    if (a.demoUrl && !b.demoUrl) return -1
    if (!a.demoUrl && b.demoUrl) return 1
    return 0
  })

  return (
    <section ref={sectionRef} id="featured-projects" className="relative w-full bg-background py-16 md:py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Explore Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.a
            href="#featured-projects"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold hover:shadow-lg transition-shadow"
          >
            Explore All My Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6"
          >
            Featured Work
          </motion.span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Projects That Ship
          </h2>
          <p className="font-sans text-base md:text-lg text-foreground/70 max-w-2xl">
            Real products solving real problems. Each project showcases full-stack development, 
            performance optimization, and attention to user experience.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8 lg:space-y-12">
          {sortedProjects.map((project, index) => (
            <div key={project.id}>
              <ProjectCard
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                tags={project.tags}
                demoUrl={project.demoUrl}
                repoUrl={project.repoUrl}
                images={project.images}
                isImageLeft={index % 2 === 0}
                isComingSoon={!project.demoUrl && project.images.length === 0}
              />
              
              {/* Divider */}
              {index < sortedProjects.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="border-b border-border/50 mt-8 lg:mt-12 origin-left"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
