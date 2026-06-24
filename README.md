# CraftForge Dev — Minecraft Server Development Website

A full-featured Minecraft server development agency website with a Minecraft pixel aesthetic, dynamic admin panel, and database-backed content management.

## Features

- **Minecraft-themed landing page** — pixel art style UI with dark green/gray color palette, creeper face logo, and block-style components
- **Dynamic content** — all text, pricing, features, announcements, and stats are stored in a Netlify Postgres database and editable via admin panel
- **Admin panel** (`/admin`) — password-protected dashboard to manage:
  - Site settings (title, hero text, server IP, contact info)
  - Announcements (info/success/warning/error banners shown on the homepage)
  - Feature cards (services offered)
  - Pricing tiers (with features list, highlight toggle)
  - Server stats / info items
- **FAQ page** (`/faq`) — Minecraft-themed accordion FAQ
- **Pricing section** — three-tier pricing (Dirt Block / Diamond / Netherite) with developer-focused plans

## Tech Stack

- **Framework**: TanStack Start (React, file-based routing)
- **Styling**: Tailwind CSS v4
- **Database**: Netlify Database (Postgres) via Drizzle ORM
- **Deployment**: Netlify (with automatic DB migrations)

## Running Locally

```bash
npm install
netlify dev --port 8889
```

## Admin Panel

Navigate to `/admin` and enter the admin password. Default password: `minecraft-admin-2024`

To change the password, set the `ADMIN_PASSWORD` environment variable in your Netlify site settings.

## Database

The database is auto-seeded on first load with default Minecraft server development content. All changes made via the admin panel are persisted in Netlify Postgres.
