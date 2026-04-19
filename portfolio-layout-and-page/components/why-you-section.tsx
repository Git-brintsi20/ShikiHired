'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Zap, Trophy, Target } from 'lucide-react'

export default function WhyYouSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const reasons = [
    {
      icon: Trophy,
      title: 'Proven Track Record',
      description: '5 full-stack products shipped to production with real users',
      points: ['2 hackathon wins', 'MongoDB Track Winner', 'Top 8 of 126 teams'],
      color: 'from-orange-500 to-amber-400',
    },
    {
      icon: Target,
      title: 'Quality > Quantity',
      description: 'Measurable impact on every project I build',
      points: ['40% performance improvements', '95+ Lighthouse scores', 'Secure by default'],
      color: 'from-primary to-blue-400',
    },
    {
      icon: Zap,
      title: 'Fast Execution',
      description: 'Ships production-ready code under pressure',
      points: ['36-hour hackathon builds', '300+ LeetCode problems', 'Problem solver mindset'],
      color: 'from-secondary to-purple-400',
    },
    {
      icon: CheckCircle2,
      title: 'Full-Stack Expertise',
      description: 'End-to-end ownership from architecture to deployment',
      points: ['Frontend, Backend, DevOps', 'Database design & optimization', 'Real-time systems'],
      color: 'from-accent to-emerald-400',
    },
  ]

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 overflow-hidden bg-card/40 border-y border-border/50"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/3 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-1/3 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose Me?
          </h2>
          <p className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            What sets me apart from other developers
          </p>
        </motion.div>

        {/* 4-Column Grid of Reasons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  className={`relative mb-4 p-3 rounded-lg bg-gradient-to-br ${reason.color} text-white w-fit`}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>

                {/* Title */}
                <h3 className="relative font-serif text-lg font-bold text-foreground mb-2">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="relative text-sm text-muted-foreground mb-4 leading-relaxed">
                  {reason.description}
                </p>

                {/* Bullet Points */}
                <div className="relative space-y-2">
                  {reason.points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary/60" />
                      <span className="text-xs text-foreground/70">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border/50"
        >
          <p className="font-sans text-base md:text-lg text-foreground mb-6 max-w-2xl mx-auto">
            I don't just write code—I ship products that solve real problems and create real value. Let's build something amazing together.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg transition-shadow"
          >
            Start Conversation
            <Zap className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
