# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

A Minecraft server development agency website with a pixel-art aesthetic, admin CMS panel, and Netlify Postgres database. Built with TanStack Start and deployed on Netlify.

---

## CraftForge Dev Architecture

### Directory Structure

```
src/
  routes/
    __root.tsx           # Root layout (HTML shell, dark bg, meta tags)
    index.tsx            # Homepage — hero, stats, features, pricing, contact
    faq.tsx              # Minecraft-themed FAQ with accordion
    admin.tsx            # Admin panel (login + CMS tabs for all content types)
    api/
      content.ts         # Public GET /api/content — returns all site data, seeds DB if empty
      admin/
        auth.ts          # POST /api/admin/auth — password login
        settings.ts      # GET/PUT /api/admin/settings
        pricing.ts       # CRUD /api/admin/pricing
        features.ts      # CRUD /api/admin/features
        announcements.ts # CRUD /api/admin/announcements
        server-info.ts   # CRUD /api/admin/server-info

db/
  schema.ts              # Drizzle ORM schema (5 tables)
  index.ts               # DB client (drizzle + netlify-db adapter)

netlify/database/migrations/  # Auto-generated SQL (applied by Netlify on deploy)
drizzle.config.ts        # Drizzle Kit config
```

### Authentication
Admin auth uses a shared password as `ADMIN_PASSWORD` env var (default: `minecraft-admin-2024`). Token is the password itself, sent as `x-admin-token` header.

### Data Model
- `site_settings` — key/value store for all text content
- `pricing_tiers` — features stored as JSON string (TEXT column)
- `feature_cards` — icon is a string key mapped to emoji in `ICON_MAP`
- `announcements` — type: info | success | warning | error; `active` boolean controls visibility
- `server_info_items` — stat cards (label + value + icon)

### Seeding
`/api/content` auto-seeds on first call if `site_settings` is empty.

### Minecraft Theme
- Palette: `gray-950` bg, `green-700` primary, `amber-800` accent
- `border-4` everywhere for pixel-art block feel
- Monospace font for labels/code; system sans for body

---

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI + custom components |
| Content | Content Collections (type-safe markdown) |
| AI | TanStack AI with multi-provider support |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public
│   ├── favicon.ico
│   ├── tanstack-circle-logo.png
│   └── tanstack-word-logo-white.svg  # TanStack wordmark logo (white) used in header/nav.
├── src
│   ├── components
│   │   ├── Header.tsx  # Header with nav links.
│   │   └── HeaderNav.tsx  # Navigation sidebar template: mobile menu, Home link, add-on routes; EJS-driven for dynamic route generation.
│   ├── routes
│   │   ├── __root.tsx  # Root layout: Header, styles.
│   │   ├── faq.tsx  # FAQ page: accordion with Acme SaaS Q&A.
│   │   └── index.tsx  # Landing page: hero, pricing, features.
│   ├── router.tsx  # TanStack Router setup: creates router from generated routeTree with scroll restoration.
│   └── styles.css  # Global styles: Tailwind import plus base body/code font styling.
├── .gitignore  # Template for .gitignore: node_modules, dist, .env, .netlify, .tanstack, etc.
├── AGENTS.md  # This document provides an overview of the project structure for developers and AI agents working on this codebase.
├── netlify.toml  # Netlify deployment config: build command (vite build), publish directory (dist/client), and dev server settings (port 8888, target 3000).
├── package.json  # Project manifest with TanStack Start, React 19, Vite 7, Tailwind CSS 4, and Netlify plugin dependencies; defines dev and build scripts.
├── pnpm-lock.yaml
├── tsconfig.json  # TypeScript config: ES2022 target, strict mode, @/* path alias for src/*, bundler module resolution.
└── vite.config.ts  # Vite config template: TanStack Start, React, Tailwind, Netlify plugin, and optional add-on integrations; processed by EJS.
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:

- `__root.tsx` - Root layout wrapping all pages
- `index.tsx` - Route for `/`
- `api.*.ts` - Server API endpoints (e.g., `api.resume-chat.ts` → `/api/resume-chat`)

### Component Architecture

**UI Primitives** (`src/components/ui/`):
- Radix UI-based, Tailwind-styled
- Card, Badge, Checkbox, Separator, HoverCard

**Feature Components** (`src/components/`):
- Header, HeaderNav, ResumeAssistant

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind, Content Collections |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, output directory, dev server settings |
| `content-collections.ts` | Zod schemas for jobs and education frontmatter |
| `styles.css` | Tailwind imports + CSS custom properties (oklch colors) |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes
- `cn()` helper for conditional class merging
- CSS variables for theme tokens in `styles.css`

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias
- Zod for runtime validation
- Type-only imports with `type` keyword

### State Management
- React hooks for local state
- Zustand if you need it for global state
### SaaS Landing Page

Landing page with pricing tiers, features section, and FAQ accordion.

**Routes:** / (hero, pricing, features), /faq (accordion Q&A)

**FAQ:** ChevronDown accordion with expand/collapse; pricing tiers: Starter (free), Pro, Enterprise

No special dependencies or environment variables beyond base TanStack Start.

## Application Name

This starter uses "Application Name" as a placeholder throughout the UI and metadata. Replace it with the user's desired application name in the following locations:

### UI Components
- `src/components/Header.tsx` — app name displayed in the header
- `src/components/HeaderNav.tsx` — app name in the mobile navigation header

### SEO Metadata
- `src/routes/__root.tsx` — the `title` field in the `head()` configuration

Search for all occurrences of "Application Name" in the `src/` directory and replace with the user's application name.
