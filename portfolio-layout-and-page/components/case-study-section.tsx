'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, Trophy, Zap, Users, Clock } from 'lucide-react'

export default function CaseStudySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const caseStudy = {
    id: 'elixa',
    title: 'ELIXA - AI Event Orchestration Platform',
    subtitle: 'MongoDB Track Winner at HackByte 4.0 (MLH)',
    tagline: 'Converts plain-English event goals into dependency-aware execution plans',
    thumbnail: '🤖',
    problem: 'Event organizers spend hours manually coordinating complex workflows across teams, dates, and vendor dependencies. A single change cascades through the entire event plan with no visibility into impact.',
    solution: 'Built an AI-powered command center that uses Claude LLM to understand natural language event goals and converts them into structured execution plans. Handles real-time synchronization across 3+ users with WebSocket-powered live updates.',
    highlights: [
      'Converts plain English goals → structured JSON execution plans',
      'Real-time multi-user synchronization via WebSockets',
      'Dependency-aware task scheduling with conflict detection',
      'MongoDB Track Winner - Best database schema design',
    ],
    challenges: [
      {
        title: 'LLM Output Reliability',
        solution: 'Implemented prompt engineering with JSON schema validation and retry logic. Used structured output formatting to ensure parse-safe responses from Claude API.',
      },
      {
        title: 'Real-time Synchronization',
        solution: 'Deployed WebSocket server with connection pooling and message queuing. Handled network failures gracefully with exponential backoff reconnection.',
      },
      {
        title: 'Database Optimization',
        solution: 'Designed MongoDB schema with proper indexing on frequently-queried fields. Used aggregation pipeline for complex queries reducing N+1 problems.',
      },
    ],
    results: [
      'MongoDB Track Winner among 126 competing teams',
      '36-hour build from concept to production',
      'Top 8 Finalist recognition',
      'Zero downtime deployment to production',
    ],
    learnings: [
      'LLM integration requires robust error handling and fallback strategies',
      'Real-time systems need careful consideration of CAP theorem trade-offs',
      'Database schema design is critical for performance at scale',
      'Production-ready code in hackathons requires architecture thinking',
    ],
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Claude API', 'WebSocket', 'Express.js', 'Vercel'],
    teamSize: 3,
    timeline: '36 hours',
    links: {
      demo: 'https://elixa-demo.vercel.app',
      repo: 'https://github.com/Git-brintsi20/elixa'
    }
  }

  const isExpanded = expandedId === caseStudy.id

  return (
    <section ref={sectionRef} id="case-study" className="relative w-full py-16 md:py-24 overflow-hidden bg-card/30 border-y border-border">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/3 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.25, 0.15, 0.25] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6"
          >
            <Trophy className="w-4 h-4" />
            Featured Project Deep Dive
          </motion.span>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Award-Winning{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Case Study
            </span>
          </h2>
          <p className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            See how ELIXA won the MongoDB Track through architecture-first thinking
          </p>
        </motion.div>

        {/* Case Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            onClick={() => setExpandedId(isExpanded ? null : caseStudy.id)}
            className="group relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -4 }}
          >
            {/* Hover gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            />

            {/* Header Section */}
            <div className="p-6 md:p-8">
              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{caseStudy.thumbnail}</div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {caseStudy.title}
                  </h3>
                  <p className="text-sm md:text-base text-primary font-semibold mb-2">{caseStudy.subtitle}</p>
                  <p className="text-sm md:text-base text-muted-foreground">{caseStudy.tagline}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t border-border/30">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="text-lg font-bold text-foreground">{caseStudy.timeline}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Build Time</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-lg font-bold text-foreground">{caseStudy.teamSize}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Team Size</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="text-lg font-bold text-foreground">{caseStudy.tech.length}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Technologies</p>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2 mb-6">
                {caseStudy.highlights.slice(0, 2).map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-foreground/70">{highlight}</p>
                  </div>
                ))}
              </div>

              {/* Expand Button */}
              <motion.button
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors group/btn"
              >
                <span>{isExpanded ? 'Hide Full Details' : 'View Full Case Study'}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border/30"
                >
                  <div className="p-6 md:p-8 space-y-8">
                    {/* Problem Section */}
                    <div>
                      <h4 className="font-serif text-lg font-bold text-foreground mb-3">The Problem</h4>
                      <p className="text-sm md:text-base text-foreground/70 leading-relaxed">{caseStudy.problem}</p>
                    </div>

                    {/* Solution Section */}
                    <div>
                      <h4 className="font-serif text-lg font-bold text-foreground mb-3">Our Solution</h4>
                      <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-4">{caseStudy.solution}</p>
                    </div>

                    {/* Challenges Section */}
                    <div>
                      <h4 className="font-serif text-lg font-bold text-foreground mb-4">Key Challenges & Learnings</h4>
                      <div className="space-y-4">
                        {caseStudy.challenges.map((challenge, idx) => (
                          <div key={idx} className="p-4 rounded-lg bg-card/60 border border-border/30">
                            <p className="font-semibold text-foreground mb-2">{challenge.title}</p>
                            <p className="text-sm text-foreground/70">{challenge.solution}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Results Section */}
                    <div>
                      <h4 className="font-serif text-lg font-bold text-foreground mb-3">Results & Impact</h4>
                      <ul className="space-y-2">
                        {caseStudy.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Trophy className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm md:text-base text-foreground/70">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="font-serif text-lg font-bold text-foreground mb-3">Technology Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
