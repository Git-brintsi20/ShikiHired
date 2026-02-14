'use client'

import { SKILLS } from '@/lib/data'

interface TechBadgeProps {
  name: string
}

function TechBadge({ name }: TechBadgeProps) {
  return (
    <div className="px-4 md:px-6 py-2 md:py-3 rounded-lg bg-background border border-border/50 font-sans text-sm md:text-base text-foreground/80 hover:border-primary hover:shadow-md hover:scale-105 transition-all duration-300 cursor-default text-center break-words">
      {name}
    </div>
  )
}

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="w-full bg-card border-y border-border py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tech Stack
          </h2>
          <p className="font-sans text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
            Technologies and tools I use to build modern, scalable applications
          </p>
        </div>

        {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Frontend */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-primary mb-6">
              Frontend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {SKILLS.frontend.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-secondary mb-6">
              Backend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {SKILLS.backend.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Database */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-accent mb-6">
              Database
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {SKILLS.database.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* DevOps */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-primary mb-6">
              DevOps & Tools
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {SKILLS.devops.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
