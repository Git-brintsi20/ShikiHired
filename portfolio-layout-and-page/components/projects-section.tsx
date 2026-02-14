'use client'

import ProjectCard from './project-card'
import { PROJECTS } from '@/lib/data'

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full bg-background py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="font-sans text-base md:text-lg text-foreground/70 max-w-2xl">
            A selection of my work showcasing expertise in full-stack development, problem-solving, and creative implementation across diverse technologies and domains.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16 md:space-y-24">
          {PROJECTS.filter(project => project.featured).map((project, index) => (
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
              />
              {/* Divider */}
              {index < PROJECTS.filter(p => p.featured).length - 1 && (
                <div className="border-b border-border mt-8 md:mt-12"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
