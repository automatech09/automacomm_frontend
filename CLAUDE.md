# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start development server at http://localhost:3000
yarn build      # Production build
yarn start      # Start production server
yarn lint       # Run ESLint
```

Package manager: **Yarn 4** (use `yarn`, not `npm` or `pnpm`).

## Stack

- **Next.js 16** with App Router (`app/` directory)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)

## Architecture

This project uses the Next.js App Router. All routes and layouts live under `app/`:

- `app/layout.tsx` — Root layout with Geist font variables applied to `<body>`
- `app/globals.css` — Global styles (Tailwind imports)
- `app/page.tsx` — Home page (`/` route)

New routes are added as directories under `app/` with a `page.tsx` file. Shared UI components should be placed in a `components/` directory (not yet created). Server components are the default; add `"use client"` only when needed for interactivity or browser APIs.
