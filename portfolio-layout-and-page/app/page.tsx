import Hero from '@/components/hero'
import ProjectsCarousel from '@/components/projects-carousel'
import ProjectsSection from '@/components/projects-section'
import AboutSection from '@/components/about-section'
import WhyYouSection from '@/components/why-you-section'
import AchievementsSection from '@/components/achievements-section'
import TestimonialsSection from '@/components/testimonials-section'
import CaseStudySection from '@/components/case-study-section'
import TechStackSection from '@/components/tech-stack-section'
import CodingProfilesSection from '@/components/coding-profiles-section'
import ContactSection from '@/components/contact-section'

export default function Home() {
  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Projects Carousel - Best Projects Showcase */}
      <ProjectsCarousel />

      {/* Complete Projects Gallery */}
      <ProjectsSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Coding Profiles Section */}
      <CodingProfilesSection />

      {/* About / Beyond The Code - Redesigned Layout */}
      <AboutSection />

      {/* Why You? - Value Proposition */}
      <WhyYouSection />

      {/* Achievements & Experience Section */}
      <AchievementsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Case Study - ELIXA Deep Dive */}
      <CaseStudySection />

      {/* Contact CTA Section */}
      <ContactSection />
    </div>
  )
}
