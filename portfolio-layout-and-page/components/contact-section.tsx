'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, ExternalLink, Send } from 'lucide-react'
import Link from 'next/link'
import { PERSONAL_INFO } from '@/lib/data'

const socialLinks = [
  {
    name: 'GitHub',
    url: PERSONAL_INFO.profiles.github,
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: PERSONAL_INFO.profiles.linkedin,
    icon: Linkedin,
  },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} id="contact" className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to work together?
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            I'm always interested in hearing about new projects and opportunities. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <motion.a
            href={`mailto:${PERSONAL_INFO.email}`}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-primary text-primary-foreground rounded-2xl font-medium text-lg shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            <span>Send me an email</span>
            <Send className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {socialLinks.map((social) => {
            const IconComponent = social.icon
            return (
              <motion.div key={social.name} whileHover={{ y: -4 }}>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <IconComponent className="w-5 h-5 text-foreground" />
                  <span className="font-medium text-foreground">{social.name}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Email Display */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          Or email directly at{' '}
          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-primary hover:underline">
            {PERSONAL_INFO.email}
          </a>
        </motion.p>
      </div>
    </section>
  )
}
