import Link from 'next/link'
import { Github, Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react'
import { PERSONAL_INFO } from '@/lib/data'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: PERSONAL_INFO.github },
    { icon: Linkedin, label: 'LinkedIn', href: PERSONAL_INFO.linkedin },
    { icon: Mail, label: 'Email', href: `mailto:${PERSONAL_INFO.email}` },
  ]

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Brand & Description */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-serif text-2xl font-bold text-primary hover:text-primary/80 transition-colors w-fit"
            >
              {PERSONAL_INFO.name.split(' ')[0]}
            </Link>
            <p className="font-sans text-sm text-foreground/70 leading-relaxed max-w-xs">
              {PERSONAL_INFO.tagline}. Building scalable web applications with precision and creative vision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">Navigate</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Projects', href: '#projects' },
                { label: 'Skills', href: '#skills' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm text-foreground/70 hover:text-accent transition-colors w-fit flex items-center gap-2 group"
                >
                  {link.label}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1 group-hover:ml-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2.5 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors duration-200"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-foreground/60">
            &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-foreground/60 bg-muted px-3 py-1.5 rounded-md">
            Built with Next.js 15, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
