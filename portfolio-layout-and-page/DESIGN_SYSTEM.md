# Design System Documentation

## Overview
Professional, technical portfolio design system built with Next.js 15, TypeScript, and Tailwind CSS. The system emphasizes clarity, authority, and creative precision.

---

## Color Palette

### Primary Colors
- **Primary (Royal Blue)**: `#4169E1`
  - Used for main headers, CTAs, and primary interactions
  - Conveys trust and professionalism
  - Light mode foreground, dark mode accent

- **Secondary (Medium Purple)**: `#9370DB`
  - Used for badges, secondary elements, and statistics
  - Adds visual interest and hierarchy
  - Complements primary without competing

- **Accent (Sea Green)**: `#3CB371`
  - Used for "Available" status indicators and link highlights
  - Creates visual interest and draws attention
  - Indicates interactive elements and important status

### Surface Colors
- **Light Mode Surface**: `#F5F7FA` (Ghost White)
  - Main background color for light mode
  - High contrast with text for readability
  - Accessible and professional appearance

- **Dark Mode Surface**: `#0F1419` (Dark Gunmetal)
  - Main background for dark mode
  - Reduces eye strain in low-light conditions
  - Maintains contrast with light text

### Semantic Colors (CSS Variables in globals.css)
- `--background`: Page background
- `--foreground`: Primary text color
- `--card`: Card/container backgrounds
- `--primary`: Main brand color
- `--secondary`: Secondary elements
- `--accent`: Highlight and status indicators
- `--muted`: Disabled or secondary text
- `--border`: Border colors
- `--input`: Form input backgrounds

---

## Typography System

### Font Stack
Three carefully selected Google Fonts for optimal hierarchy and readability:

1. **Playfair Display** (Headings)
   - Weight: 400, 500, 600, 700, 800
   - Usage: `font-serif` class
   - Character: Elegant, authoritative, serif typeface
   - Best for: Titles, hero sections, major headings
   - Example: Page titles, section headers

2. **DM Sans** (Body Text)
   - Weight: 400, 500, 600, 700
   - Usage: `font-sans` class (default)
   - Character: Clean, geometric, highly readable
   - Best for: Body copy, UI labels, navigation
   - Example: Paragraphs, button text, form labels

3. **JetBrains Mono** (Code)
   - Weight: 400, 500, 600, 700
   - Usage: `font-mono` class
   - Character: Professional monospace for technical content
   - Best for: Code snippets, technical documentation
   - Example: Inline code, code blocks

### Type Scale (Tailwind Classes)
- `text-xs` - 12px (fine print, captions)
- `text-sm` - 14px (secondary text, metadata)
- `text-base` - 16px (body text)
- `text-lg` - 18px (emphasis)
- `text-xl` - 20px (subheadings)
- `text-2xl` - 24px (section headers)
- `text-3xl` - 30px (page titles)
- `text-4xl` - 36px (hero titles)
- `text-5xl` - 48px (major heroes)
- `text-6xl` - 60px (display text)
- `text-7xl` - 72px (large displays)

### Line Heights
- Body text: `leading-relaxed` (1.625) or `leading-6` (1.5)
- Headings: Natural (default ~1.2)
- Lists: `leading-loose` (2)

---

## Layout & Spacing

### Container
- Max width: `max-w-7xl` (80rem / 1280px)
- Horizontal padding: `px-4 sm:px-6 lg:px-8`
- Vertical padding: `py-20 md:py-28` for sections

### Gaps & Spacing Scale (Tailwind)
Use the Tailwind spacing scale:
- `gap-2` = 8px
- `gap-4` = 16px
- `gap-6` = 24px
- `gap-8` = 32px
- `gap-12` = 48px

### Responsive Breakpoints
- Mobile-first: Base styles apply to all screen sizes
- `sm:` - 640px (tablets)
- `md:` - 768px (larger tablets)
- `lg:` - 1024px (desktops)
- `xl:` - 1280px (large desktops)

---

## Components

### Navigation Bar
- Sticky positioning at top
- Dark mode: Adapts to current theme
- Logo: "Dev." using primary color
- Theme toggle: Sun/Moon icons from Lucide
- Responsive: Desktop menu with mobile hamburger

**File**: `/components/navbar.tsx`

### Footer
- Full-width with semantic background
- Three-column grid layout (brand, navigation, social)
- Social links as icon buttons
- Build info in mono font

**File**: `/components/footer.tsx`

### Cards
- Background: `bg-background` or `bg-card`
- Border: `border border-border`
- Padding: `p-6` or `p-8`
- Hover effects: `hover:border-primary/30 transition-colors`

### Buttons
- Primary: `bg-primary text-primary-foreground`
- Secondary: `border-2 border-primary text-primary`
- Hover: Include `transition-colors` for smooth effects
- Padding: `px-8 py-3` for comfortable touch targets

### Forms
- Inputs: `border border-input bg-background rounded-lg`
- Labels: `font-sans text-sm font-medium`
- Focus: Tailwind default focus styles

---

## Dark Mode Implementation

### How It Works
1. Theme provider uses `next-themes` library
2. HTML element gets `dark` class when dark mode is active
3. CSS variables automatically switch via `.dark` selector
4. Use `dark:` prefix for dark-mode-specific Tailwind classes

### Usage in Components
```tsx
<div className="bg-background dark:bg-background text-foreground dark:text-foreground">
  Content automatically adapts
</div>
```

### Theme Toggle
- Located in navbar
- Sun icon for light mode
- Moon icon for dark mode
- Persisted to localStorage

---

## Accessibility

### Color Contrast
- Text on backgrounds: WCAG AA compliant (4.5:1 ratio)
- Primary color on primary-foreground: High contrast
- Secondary elements have sufficient contrast

### Semantic HTML
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Proper heading hierarchy (h1 → h6)
- ARIA labels on interactive elements

### Focus States
- All interactive elements have visible focus states
- Keyboard navigation fully supported
- Screen reader friendly

---

## CSS Variables Reference

Located in `/app/globals.css` under `:root` and `.dark`:

### Light Mode (`:root`)
```css
--background: 210 40% 98%;
--foreground: 220 14% 10%;
--primary: 217 81% 55%;
--secondary: 268 59% 67%;
--accent: 142 72% 51%;
```

### Dark Mode (`.dark`)
```css
--background: 217 33% 10%;
--foreground: 210 40% 98%;
--primary: 217 81% 60%;
--secondary: 268 59% 72%;
--accent: 142 72% 55%;
```

All colors use HSL format for better theme manipulation.

---

## Usage Examples

### Hero Section
```tsx
<h1 className="font-serif text-6xl font-bold text-foreground">
  Your Headline
</h1>
<p className="font-sans text-lg text-foreground/70">
  Supporting text with secondary color
</p>
```

### Feature Card
```tsx
<div className="p-8 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors">
  <h3 className="font-serif text-xl font-semibold text-foreground">Title</h3>
  <p className="font-sans text-foreground/70 leading-relaxed">Description</p>
</div>
```

### Status Badge
```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
  <span className="text-sm font-medium text-accent">Available</span>
</div>
```

---

## Best Practices

1. **Always use design tokens** - Never hardcode colors; use CSS variables
2. **Maintain contrast** - Ensure text is readable in both light and dark modes
3. **Responsive first** - Design mobile-first, enhance for larger screens
4. **Semantic HTML** - Use proper heading hierarchy and ARIA labels
5. **Consistent spacing** - Use the Tailwind spacing scale
6. **Font pairing** - Playfair Display (display) + DM Sans (body) only
7. **Smooth transitions** - Include `transition-colors` on interactive elements
8. **Performance** - Use images sparingly, optimize for Core Web Vitals

---

## File Structure

```
app/
├── layout.tsx          # Root layout with theme provider
├── globals.css         # Design system & CSS variables
└── page.tsx            # Homepage with component showcase

components/
├── navbar.tsx          # Navigation with theme toggle
├── footer.tsx          # Footer with social links
└── theme-provider.tsx  # Next-themes wrapper

tailwind.config.ts      # Tailwind configuration with semantic tokens
```

---

## Next Steps

1. Create additional pages for projects, skills, and contact
2. Add more component variants (buttons, cards, forms)
3. Implement project showcase section
4. Add blog or case study pages
5. Optimize images and assets
6. Set up contact form with email integration

---

Generated: 2026
Design System Version: 1.0
