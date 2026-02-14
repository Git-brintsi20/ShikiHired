# Portfolio - Salugu Harshita Bhanu

A modern, responsive developer portfolio built with Next.js 15, TypeScript, and Tailwind CSS. Features dynamic data management, image carousels, and production-ready deployment.

![Portfolio Preview](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-38bdf8?logo=tailwindcss)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

## ✨ Features

- 🎨 **Modern Design System** - Royal Blue, Purple & Sea Green color palette
- 📱 **Fully Responsive** - Mobile-first approach with defensive CSS
- 🖼️ **Image Carousel** - Interactive project galleries with navigation
- ⚡ **Performance Optimized** - Next.js Image optimization & static generation
- 🎯 **Dynamic Data** - Centralized data management in `lib/data.ts`
- 🌓 **Dark/Light Mode** - Theme toggle with next-themes
- ♿ **Accessible** - ARIA labels, keyboard navigation, proper contrast
- 📊 **Animated Stats** - Number counting animations on scroll

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📁 Project Structure

```
portfolio-layout-and-page/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── hero.tsx          # Hero section with profile
│   ├── projects-section.tsx  # Featured projects
│   ├── project-card.tsx  # Project card with carousel
│   ├── stats-section.tsx # Animated statistics
│   ├── tech-stack-section.tsx # Skills showcase
│   ├── navbar.tsx        # Navigation bar
│   └── footer.tsx        # Footer with links
├── lib/
│   └── data.ts           # 📝 MAIN DATA FILE - Edit here!
├── public/
│   └── images/
│       ├── profile/      # Professional photo
│       └── projects/     # Project screenshots
└── styles/               # Additional stylesheets
```

## 🎨 Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Next Themes** - Dark mode support
- **Embla Carousel** - Touch-enabled carousels

### Fonts
- **Playfair Display** - Serif headings
- **DM Sans** - Sans-serif body
- **JetBrains Mono** - Monospace code

## 📝 Customization

### Update Your Information

Edit `lib/data.ts` to customize:

```typescript
export const PERSONAL_INFO = {
  name: "Your Name",
  role: "Your Role",
  bio: "Your bio...",
  email: "your@email.com",
  github: "https://github.com/yourusername",
  // ... more fields
}

export const PROJECTS = [
  {
    title: "Project Name",
    description: "Project description...",
    tags: ["React", "Node.js"],
    demoUrl: "https://...",
    repoUrl: "https://...",
    images: ["/images/projects/..."],
    // ... more fields
  }
]
```

### Add Project Images

1. Place images in `public/images/projects/your-project/`
2. Update the `images` array in your project object in `data.ts`
3. Images will appear in the carousel automatically

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "feat: Portfolio ready for deployment"
   git push origin main
   ```

2. Connect to Vercel:
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Set root directory: `portfolio-layout-and-page`
   - Deploy!

### Other Platforms

The portfolio is a standard Next.js app and can be deployed to:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Your own server

## 🎯 Portfolio Sections

1. **Hero** - Introduction with professional photo
2. **Stats** - Key metrics with animated counters
3. **Projects** - Featured work with image carousels
4. **Tech Stack** - Skills organized by category
5. **Contact** - Call-to-action with email link
6. **Footer** - Social links and navigation

## 🛠️ Development Scripts

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Lint code
pnpm tsc --noEmit # Type check

# Package Management
pnpm install      # Install dependencies
pnpm add [pkg]    # Add package
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl)

All components are mobile-first and fully responsive.

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Proper color contrast (WCAG AA)
- Focus indicators
- Touch targets min 44px

## 🎨 Color System

Defined in `app/globals.css`:

- **Primary**: `#4169E1` (Royal Blue) - CTAs, headers
- **Secondary**: `#9370DB` (Purple) - Badges, highlights
- **Accent**: `#3CB371` (Sea Green) - Status, links

Supports both light and dark themes.

## 📄 License

MIT License - See LICENSE file for details

## 📧 Contact

- **Email**: shiki2hustle@gmail.com
- **GitHub**: [@Git-brintsi20](https://github.com/Git-brintsi20)
- **LinkedIn**: [Salugu Harshita Bhanu](https://www.linkedin.com/in/salugu-harshita-bhanu-b447b1274/)
- **Medium**: [@shiki2hustle](https://medium.com/@shiki2hustle)

---

**Built with** ❤️ **using Next.js, TypeScript & Tailwind CSS**

*Last Updated: February 2026*
