import Hero from '@/components/hero'
import StatsSection from '@/components/stats-section'
import AboutSection from '@/components/about-section'
import ProjectsSection from '@/components/projects-section'
import TechStackSection from '@/components/tech-stack-section'
import CodingProfilesSection from '@/components/coding-profiles-section'
import AchievementsSection from '@/components/achievements-section'
import ContactSection from '@/components/contact-section'

export default function Home() {
  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <StatsSection />

      {/* About Section */}
      <AboutSection />

      {/* Featured Projects Section */}
      <ProjectsSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Coding Profiles Section */}
      <CodingProfilesSection />

      {/* Achievements & Experience Section */}
      <AchievementsSection />

      {/* Contact CTA Section */}
      <ContactSection />
    </div>
  )
}
