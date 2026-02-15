import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/navbar'
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
  title: 'Developer Portfolio | Full-Stack Developer',
  description: 'Professional full-stack developer portfolio showcasing elegant, performant web applications and technical expertise.',
  generator: 'v0.app',
  openGraph: {
    title: 'Developer Portfolio',
    description: 'Full-stack developer crafting elegant digital solutions',
    type: 'website',
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
          <Navbar />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
