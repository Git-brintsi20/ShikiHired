import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import StickyHeader from '@/components/sticky-header'
import Footer from '@/components/footer'
import CursorSpotlight from '@/components/cursor-spotlight'
import GrainOverlay from '@/components/grain-overlay'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Harshita Bhanu | Full-Stack Developer & 2x Hackathon Winner',
  description: 'Full-stack developer who ships real products. 5 production apps, 2 hackathon wins, 40% performance improvements. Specializing in Node.js, React, PostgreSQL, and security.',
  keywords: 'full-stack developer, web developer, react developer, node.js, typescript, bug tracker, saas, portfolio',
  authors: [{ name: 'Salugu Harshita Bhanu', url: 'https://saluguharshitabhanu.vercel.app' }],
  creator: 'Salugu Harshita Bhanu',
  generator: 'Next.js',
  openGraph: {
    title: 'Harshita Bhanu | Full-Stack Developer & Product Builder',
    description: '5 shipped products, 2 hackathon wins, MongoDB Track Winner. Full-stack expert crafting production-ready applications.',
    type: 'website',
    url: 'https://saluguharshitabhanu.vercel.app',
    siteName: 'Harshita Bhanu',
    images: [
      {
        url: 'https://saluguharshitabhanu.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Harshita Bhanu - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harshita Bhanu | Full-Stack Developer',
    description: 'Shipped 5 products, won 2 hackathons, MongoDB Track Winner',
  },
}

export const viewport: Viewport = {
  themeColor: '#4169E1',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen scroll-smooth">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <CursorSpotlight />
          <GrainOverlay />
          <StickyHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
