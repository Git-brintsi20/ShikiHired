'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Code2, Trophy, Award } from 'lucide-react'
import Link from 'next/link'
import { PERSONAL_INFO } from '@/lib/data'

// Active profile with live link
const activeProfiles = [
  {
    name: 'LeetCode',
    handle: '@hac_brintsi20',
    url: PERSONAL_INFO.profiles.leetcode,
    color: 'from-[#FFA116] to-[#F9A825]',
    stats: [
      { label: 'Problems Solved', value: '275+' },
      { label: 'Contest Rating', value: '1842' },
      { label: 'Top', value: '6.17%' },
    ],
    icon: Code2,
    description: '142 active days • 25 day max streak • 14 contests',
    hasLink: true,
  },
]

// Other platforms (stats only, no links - for reference)
// CodeChef: @shiki_20 | Rating: 1772 (Div 2, 3★) | Global Rank: 6062
// Codeforces: @shiki_20 | Rating: 1290 (Pupil) | Registered: 3 months

const otherPlatformStats = [
  {
    name: 'Codeforces',
    handle: '@shiki_20',
    color: 'from-[#1E88E5] to-[#0D47A1]',
    stats: [
      { label: 'Rating', value: '1290' },
      { label: 'Rank', value: 'Pupil' },
    ],
    icon: Trophy,
    description: 'Competitive programming challenges',
  },
  {
    name: 'CodeChef',
    handle: '@shiki_20',
    color: 'from-[#5B4638] to-[#3E2723]',
    stats: [
      { label: 'Rating', value: '1772' },
      { label: 'Stars', value: '3★' },
    ],
    icon: Award,
    description: 'Div 2 • Global Rank #6062',
  },
]

export default function CodingProfilesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

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

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
      },
    },
  }

  return (
    <section ref={sectionRef} id="coding-profiles" className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
            Competitive Programming
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Coding Profiles
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Where algorithms meet passion—track my competitive programming journey
          </p>
        </motion.div>

        {/* Featured Profile - LeetCode */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          {activeProfiles.map((profile) => {
            const IconComponent = profile.icon
            
            return (
              <motion.div
                key={profile.name}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden max-w-2xl mx-auto"
              >
                {/* Gradient Header */}
                <div className={`h-28 bg-gradient-to-r ${profile.color} relative`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                    <div>
                      <span className="text-white/70 text-xs uppercase tracking-wider">Featured Platform</span>
                      <h3 className="font-sans text-2xl font-bold text-white">{profile.name}</h3>
                      <p className="text-white/80 text-sm">{profile.handle}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="font-sans text-sm text-muted-foreground mb-6 text-center">
                    {profile.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {profile.stats.map((stat) => (
                      <div key={stat.label} className="text-center p-4 rounded-xl bg-muted/50">
                        <p className="font-mono text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Visit Link */}
                  <Link
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all duration-300 group/link"
                  >
                    <span>View LeetCode Profile</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-r ${profile.color} opacity-10 blur-xl`} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Other Platform Stats (No Links) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-muted-foreground">Also active on other platforms</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {otherPlatformStats.map((profile) => {
            const IconComponent = profile.icon
            
            return (
              <motion.div
                key={profile.name}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group relative bg-card/50 border border-border/50 rounded-xl overflow-hidden"
              >
                {/* Compact Header */}
                <div className={`h-16 bg-gradient-to-r ${profile.color} relative`}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-sans text-lg font-bold text-white">{profile.name}</h3>
                      <p className="text-white/70 text-xs">{profile.handle}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="font-sans text-xs text-muted-foreground mb-4">
                    {profile.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    {profile.stats.map((stat) => (
                      <div key={stat.label} className="text-center p-2 rounded-lg bg-muted/30">
                        <p className="font-mono text-xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
