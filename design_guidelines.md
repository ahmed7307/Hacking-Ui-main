# Hacking Vidya - Design Guidelines

## Design Approach
**Reference-Based Approach**: Inspired by Hack The Box and TryHackMe - professional, futuristic hacker aesthetic with dark cyber theme and neon accents.

## Core Design Principles
- Professional cybersecurity learning platform aesthetic
- Futuristic hacker-inspired visuals with glowing neon elements
- Smooth motion effects and micro-interactions
- Immersive dark theme with high-tech feel
- Terminal effects and particle backgrounds where appropriate

## Typography System

**Font Families:**
- Primary: Inter (UI elements, body text)
- Secondary: Poppins (headings, emphasis)
- Monospace: JetBrains Mono (code blocks, terminal effects)

**Hierarchy:**
- Hero Headings: Large, bold, glowing text treatment
- Section Headings: Poppins, medium-large weight
- Body Text: Inter, regular weight, optimized readability
- Code/Terminal: JetBrains Mono with syntax highlighting

## Color Palette

**Backgrounds:**
- Primary: #0A0A0A → #121212 (dark gradient)
- Cards/Panels: Dark with frosted-glass effect

**Accent:**
- Neon Green: #44D62C (primary accent, glowing effects)
- Used for: borders, highlights, CTAs, hover states

**Text:**
- Primary text: Light gray/white for contrast
- Secondary text: Muted gray
- Accent text: Neon green for emphasis

## Layout System

**Spacing Units:**
- Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-12 to py-24
- Card padding: p-6 to p-8
- Component spacing: gap-4 to gap-8

**Container Strategy:**
- Max-width: max-w-7xl for main content
- Full-width sections with inner containers
- Responsive grid layouts for cards/features

## Component Library

### Buttons
- **Primary (Glowing Gradient)**: Neon green gradient with glow effect, smooth transitions, blur background when on images
- **Secondary (Ghost Neon Outline)**: Transparent with neon border, hover glow effect
- All buttons: rounded corners, smooth hover transitions, no custom hover states when on images

### Cards
- **Feature Cards**: Frosted-glass effect, neon border glow, rounded corners, hover lift animation
- **CTF Cards**: Difficulty indicators, metadata display, glowing accents
- **Blog/Writeup Cards**: Image thumbnails, author info, engagement metrics
- **Stats Cards**: Animated counters, icons, glowing backgrounds

### Input Fields
- Dark background (#1A1A1A or similar)
- Neon border on focus
- Smooth transition effects
- Label inside or floating animation

### Navigation
- **Desktop**: Horizontal navbar, role-based dynamic links, neon hover effects
- **Mobile**: Hamburger menu with smooth slide-in animation
- Logo with subtle glow effect

### Modals
- Frosted-glass backdrop
- Neon border accent
- Smooth fade-in animation
- Close button with hover glow

### Tables (Leaderboard, Admin)
- Dark striped rows
- Neon highlights for top entries
- Glowing badges for ranks
- Hover row highlight

## Page-Specific Layouts

### Home Page
- **Hero Section**: Full-viewport with terminal typing animation, two-column layout (text left, animation right), dual CTAs (glowing + ghost)
- **Features**: 3-column grid of glowing cards (CTF Challenges, Write-ups, Blogs)
- **How It Works**: 3-step visual progression with icons
- **Community Stats**: Animated counter cards in horizontal row
- **Testimonials**: Glowing quote cards with avatars
- **Footer**: Centered with glowing divider, multiple columns for links

### Login/Register
- Centered frosted-glass card (max-w-md)
- Neon border glow
- Form inputs with focus animations
- CTA buttons with gradient glow
- Background: subtle particle effects or grid pattern

### Dashboard
- **Top Row**: XP/Rank/Streak stat cards with neon accents
- **Main Grid**: 2-3 column layout for CTF rooms, recent activity
- **Sidebar**: Community feed or leaderboard preview
- **Charts**: Small animated dummy chart with neon colors

### CTF List
- Grid layout (2-3 columns)
- Filter bar at top (difficulty badges)
- Cards with difficulty color-coding, metadata
- Hover glow effects

### CTF Detail
- **Main Content**: Title, description, metadata, creator info
- **Action Buttons**: Deploy Machine, Reset Progress (clearly stubbed with toast notifications)
- **Sidebar**: Hints panel, questions/discussions section
- Two-column layout on desktop, stacked on mobile

### Blogs/Writeups List
- **Search Bar**: Prominent with neon focus
- **Filters**: Category chips, popularity sorting
- **Grid**: Cards with thumbnails, author, date, tags
- Smooth hover animations

### Blog/Writeup Detail
- **Header**: Title, author avatar, date, metadata
- **Content**: Markdown-styled with hacker-themed syntax highlighting for code blocks
- **Engagement**: Like/Comment/Share/Save buttons with icons
- **Sidebar**: Related posts, tags

### Leaderboard
- **Table Layout**: Rank, Username (with avatar), XP, Completed Rooms
- **Top 3 Highlight**: Glowing badges/backgrounds (#1 gold glow, #2 silver, #3 bronze in neon theme)
- Responsive: Card layout on mobile

### Hall of Fame
- Grid of user cards
- Avatar, name, bug title, reward badge
- Glowing accents for featured entries

### Profile
- **Header**: Large avatar, bio, social links
- **Stats Row**: XP progress bar, rank badge, streak chart
- **Tabs**: Completed Rooms, Blogs, Write-ups, Reports
- Edit button → Settings

### Settings
- Form sections with dark inputs
- Toggle switches with neon accents
- Save button with glow
- Sections: Profile Info, Password, 2FA, Theme

### Admin Dashboard
- **Sidebar Navigation**: Sticky, neon-highlighted active state
- **Stats Cards**: Total Users, Active Users, Reports, System Load
- **Charts**: Dummy graphs with neon color scheme
- Grid layout for overview cards

### Admin Reports
- **Table**: Report title, severity, status (pending/approved/rejected)
- **Actions**: Approve to Hall of Fame button, Reject, Delete (with toast notifications)
- Status badges with color coding

### Admin Users
- **Table**: Username, email, status
- **Actions**: Send Warning (modal), Ban, Unban
- Toast notifications for all actions

## Visual Effects & Animations

### Essential Animations
- Terminal typing effect on hero
- Smooth page transitions (Framer Motion)
- Card hover lift and glow
- Button hover glow intensification
- Stat counter animations
- Loading states with neon spinners

### Optional Enhancements
- Particle background effects (subtle)
- Neon gradient borders with animation
- Terminal cursor blink
- Scroll-triggered fade-ins

## Accessibility
- WCAG AA contrast ratios for neon text on dark backgrounds
- Keyboard focus states with neon outlines (focus: classes)
- ARIA labels for modals, tables, forms
- Skip to content link
- Keyboard navigation support for all interactive elements

## Icons
- **Library**: Lucide-react or Heroicons
- **Usage**: Feature icons, navigation, buttons, status indicators
- **Style**: Outlined style, neon stroke color for active states

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layouts, hamburger menu)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (3-column grids, sidebar layouts)

## Images
No large hero image required. Instead, use:
- **Hero Animation**: Terminal typing effect or hacker-themed illustration (can be CSS/SVG animation)
- **Avatars**: User profiles, testimonials, Hall of Fame
- **Blog Thumbnails**: Featured images for blog posts
- **Icons/Illustrations**: Feature cards, how-it-works steps
- **Background Effects**: Subtle grid patterns, particle effects, gradient overlays

## Static Pages
- **FAQ**: Accordion-style Q&A with neon dividers, smooth expand animations
- **Contact**: Form with neon-bordered inputs, Discord link with icon, no actual submission (toast message)
- **Privacy**: Single-column text content with proper typography hierarchy, max-w-4xl container