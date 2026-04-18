import Hero from '@/components/hero'
import FeaturedProjects from '@/components/featured-projects'
import AboutSection from '@/components/about-section'
import WhyYouSection from '@/components/why-you-section'
import ProjectsSection from '@/components/projects-section'
import AchievementsSection from '@/components/achievements-section'
import TechStackSection from '@/components/tech-stack-section'
import CodingProfilesSection from '@/components/coding-profiles-section'
import ContactSection from '@/components/contact-section'

export default function Home() {
  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects - Top 3 Highlighted */}
      <FeaturedProjects />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Coding Profiles Section */}
      <CodingProfilesSection />

      {/* Complete Projects Gallery */}
      <ProjectsSection />

      {/* About / Beyond The Code - Redesigned Layout */}
      <AboutSection />

      {/* Why You? - Value Proposition */}
      <WhyYouSection />

      {/* Achievements & Experience Section */}
      <AchievementsSection />

      {/* Contact CTA Section */}
      <ContactSection />
    </div>
  )
}
