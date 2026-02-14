import Hero from '@/components/hero'
import StatsSection from '@/components/stats-section'
import ProjectsSection from '@/components/projects-section'
import TechStackSection from '@/components/tech-stack-section'
import { PERSONAL_INFO } from '@/lib/data'

export default function Home() {
  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Projects Section */}
      <ProjectsSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Contact CTA Section */}
      <section className="w-full bg-gradient-to-b from-background to-card py-16 md:py-24 border-t border-border">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to work together?
          </h2>
          <p className="font-sans text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center justify-center px-8 md:px-12 py-3 md:py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg min-h-[44px]"
          >
            Send me an email
          </a>
        </div>
      </section>
    </div>
  )
}
