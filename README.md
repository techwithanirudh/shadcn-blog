# Modern Blog Template

A modern, fully-featured blog template built with the latest web technologies. Includes user authentication, comments, newsletter signup, and more.

## Features

- **Modern Stack**: Next.js 16, React 19, TypeScript 5.9
- **Content Management**: MDX-powered blog posts with Fumadocs
- **User Features**: Authentication with Better Auth, commenting system
- **Developer Experience**: Biome for linting/formatting, TypeScript, Tailwind CSS
- **SEO Optimized**: Sitemap, RSS feed, OpenGraph images
- **Database**: Drizzle ORM with Neon PostgreSQL
- **Email**: Newsletter integration with Resend
- **Styling**: Tailwind CSS with shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- pnpm 10.7.0

### Installation

```bash
pnpm install
```

### Environment Setup

Copy `.env.example` to `.env` and fill in your environment variables:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL`: Neon PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Auth secret key
- `BETTER_AUTH_URL`: Your app URL
- `RESEND_API_KEY`: For newsletter emails

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

## Available Commands

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm check`: Run Biome linter
- `pnpm check:write`: Auto-fix linting issues
- `pnpm typecheck`: Run TypeScript type checking
- `pnpm db:push`: Push database schema changes
- `pnpm db:studio`: Open Drizzle Studio

## Project Structure

```
├── content/
│   └── blog/           # Blog posts (MDX)
├── emails/             # Email templates
├── public/             # Static assets
├── scripts/            # Build scripts
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── (home)/     # Main site routes
│   │   │   └── (blog)/ # Blog routes
│   │   ├── (auth)/     # Authentication pages
│   │   ├── (llms)/     # LLM-readable content
│   │   └── api/        # API routes
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── sections/   # Layout sections
│   │   └── blog/       # Blog-specific components
│   ├── constants/      # App constants
│   ├── lib/            # Utilities and helpers
│   ├── server/         # Server-side code
│   │   ├── auth/       # Authentication
│   │   ├── comments/   # Comment system
│   │   └── db/         # Database
│   └── styles/         # Global styles
└── source.config.ts    # Fumadocs configuration
```

## Writing Blog Posts

Create a new MDX file in `content/blog/`:

```mdx
---
title: Your Post Title
description: A brief description
date: 2026-01-24
author: Your Name
tags: [nextjs, react, typescript]
image: /images/blog/cover.jpg
---

Your content here...
```

## Customization

1. **Site Configuration**: Update `src/constants/site.ts`
2. **Navigation**: Edit `src/constants/navigation/links.tsx`
3. **Social Links**: Update `src/constants/navigation/social.tsx`
4. **Styling**: Modify `src/styles/globals.css` and Tailwind config

## Technologies

- **Framework**: [Next.js 16](https://nextjs.org/)
- **React**: [React 19](https://react.dev/)
- **TypeScript**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Content**: [Fumadocs](https://fumadocs.vercel.app/)
- **Database**: [Drizzle ORM](https://orm.drizzle.team/) + [Neon](https://neon.tech/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Email**: [Resend](https://resend.com/)
- **Linting**: [Biome](https://biomejs.dev/)

## License

MIT
