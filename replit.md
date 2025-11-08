# Hacking Vidya - Cybersecurity Learning Platform

## Overview

Hacking Vidya is a cybersecurity learning platform inspired by Hack The Box and TryHackMe. It provides hands-on CTF (Capture The Flag) challenges, expert write-ups, comprehensive security blogs, and community features including leaderboards and a Hall of Fame for security researchers. The platform features a dark cyber-themed aesthetic with neon green accents and smooth animations.

The application is built as a full-stack web application with React frontend and Express backend, designed to help users level up their hacking skills through practical, interactive learning experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools:**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management

**UI Component System:**
- shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Framer Motion for animations and transitions
- Custom design system following "new-york" style preset

**Design Philosophy:**
- Dark-first theme with cybersecurity/hacker aesthetic
- Neon green (#44D62C) as primary accent color
- Typography: Inter (UI), Poppins (headings), JetBrains Mono (code)
- Consistent use of frosted-glass effects, glowing borders, and smooth transitions
- Responsive design for desktop and mobile

**State Management:**
- Client-side authentication stored in localStorage (mock implementation)
- TanStack Query for API data caching and synchronization
- Local component state with React hooks

**Key Features:**
- Public pages: Home, CTF list, Blog list, Leaderboard, Hall of Fame, About, FAQ, Contact, Privacy
- Protected user pages: Dashboard, Writeup list, Profile, Settings
- Protected admin pages: Admin dashboard, User management, Reports, Hall of Fame management
- Real-time terminal typing effect on hero section
- Syntax highlighting for code blocks using react-syntax-highlighter

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- HTTP server creation using Node's native http module
- Middleware-based request processing

**Current Implementation:**
- Minimal backend with route registration structure in place
- In-memory storage interface (MemStorage) for development
- Request logging middleware with timing and response capture
- Session management preparation with connect-pg-simple

**API Design:**
- RESTful API pattern with `/api` prefix for all routes
- JSON request/response format
- Centralized error handling through middleware

**Development Setup:**
- Vite dev server integration in development mode
- Hot module replacement (HMR) support
- Custom error overlay for runtime errors (Replit plugin)
- Development banner and cartographer plugins for Replit environment

### Data Storage Solutions

**Database:**
- PostgreSQL configured via Drizzle ORM
- Neon serverless Postgres adapter (@neondatabase/serverless)
- Schema-first approach with TypeScript type inference
- Migration support via drizzle-kit

**Current Schema:**
- Users table with id (UUID primary key), username (unique), and password fields
- Zod validation schemas generated from Drizzle tables

**Storage Abstraction:**
- IStorage interface defining CRUD operations
- MemStorage class providing in-memory implementation for development
- Design allows easy transition from in-memory to database storage

**Planned Data Models (based on frontend):**
- CTF challenges with difficulty, category, ratings, tags
- Blog posts with authors, content, tags, likes, comments
- Write-ups linked to CTF challenges
- Leaderboard data with XP, ranks, streaks
- Hall of Fame entries for security researchers
- User progress tracking and statistics

### Authentication & Authorization

**Current Implementation:**
- Client-side mock authentication system
- localStorage-based session persistence
- Role-based access control (user/admin roles)
- Protected route components for authenticated pages
- Admin-only route protection

**Authentication Flow:**
- Login/Register forms with validation
- User credentials checked against mock data
- AuthUser object stored in localStorage
- Protected routes redirect unauthenticated users to login
- Admin routes redirect non-admin users to dashboard

**Planned Implementation:**
- Server-side session management with express-session
- PostgreSQL session store (connect-pg-simple configured)
- Password hashing (bcrypt or similar)
- CSRF protection
- JWT or session-based authentication

### External Dependencies

**UI Component Library:**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui built on top of Radix UI
- Components: accordion, alert-dialog, avatar, badge, button, calendar, card, carousel, checkbox, dialog, dropdown-menu, form controls, navigation, tabs, toast, tooltip, etc.

**Styling & Animation:**
- Tailwind CSS v3+ with custom configuration
- PostCSS with Autoprefixer
- Framer Motion for declarative animations
- class-variance-authority for component variant management
- clsx and tailwind-merge for conditional class composition

**Forms & Validation:**
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for integrating Zod with React Hook Form
- drizzle-zod for generating Zod schemas from database tables

**Date & Time:**
- date-fns for date manipulation and formatting

**Code Highlighting:**
- react-syntax-highlighter with VSCode Dark Plus theme
- Used in blog and writeup detail pages for code snippets

**Icons:**
- lucide-react for general UI icons
- react-icons (specifically SiDiscord) for brand icons

**Notifications:**
- react-hot-toast for user feedback toasts

**Database & ORM:**
- Drizzle ORM for type-safe database queries
- @neondatabase/serverless for Postgres connection
- drizzle-kit for migrations and schema management

**Development Tools:**
- tsx for running TypeScript in Node.js
- esbuild for production builds
- Replit-specific plugins: runtime error modal, cartographer, dev banner
- TypeScript compiler for type checking

**Build & Runtime:**
- Vite plugin for React (@vitejs/plugin-react)
- ESBuild for fast bundling
- Node.js built-in modules (crypto, http, path, fs)

**Utilities:**
- nanoid for unique ID generation
- cmdk for command palette components (installed but not visibly used)