# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Type check and build for production (runs `astro check && astro build`)
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Lint and fix issues automatically

## Architecture Overview

This is a TIL (Today I Learned) blog built with Astro, React, TypeScript, and Tailwind CSS. The site is deployed to GitHub Pages.

### Content Management
- Blog posts are stored as Markdown files in `src/content/til/` organized by date folders (`YYYY-MM-DD/filename.md`)
- Content is managed through Astro's content collections with schema validation in `src/content.config.ts`
- Post frontmatter includes: `title`, `date`, `tags`, and `published` boolean
- Uses Zenn's markdown processor (`zenn-markdown-html`) for rendering

### Key Architecture Patterns
- **Static Site Generation**: Uses Astro's `getStaticPaths()` for post pages at `/[date]/[id]` routes
- **Content Collection**: Single `til` collection loads all markdown posts with glob pattern matching
- **Post Processing**: `src/lib/post.ts` handles fetching, filtering (published only), and sorting posts by date
- **Component Architecture**: Mix of Astro components and React components with shadcn/ui
- **Styling**: Tailwind CSS with custom global styles and Zenn content CSS for markdown rendering

### Special Features
- Contribution heatmap visualization using React component (`ContributionHeatmap.tsx`)
- Pagination system for post listing
- RSS feed generation
- Dark mode toggle with theme persistence
- Site configured for GitHub Pages deployment with `/til` base path