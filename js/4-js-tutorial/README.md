# 4 — Code Tutorials (W3Schools-style) — Astro SSG

An interactive multi-language tutorial site that mirrors the W3Schools layout: landing page to pick a language, left sidebar chapter navigation, pre-rendered content area, and a **"Try it Yourself"** Monaco editor panel that slides up from the bottom.

Built with **Astro** for instant page loads — every chapter is a static HTML page with zero JavaScript. Monaco loads lazily only when you click "Try it Yourself."

## Features

- **Multi-language** — landing page at `/` lets you pick a tutorial (JS, AI Video & Automation, etc.)
- Pre-rendered static HTML — instant first paint, no FOUC
- **Try it Yourself** button on every example — lazy-loads Monaco editor from CDN on first click
- **Run** button (or `Ctrl+Enter`) executes code and displays `console.log` output
- Prev / Next chapter navigation at the bottom of each page
- Fully responsive — sidebar becomes a slide-in overlay on mobile

## Adding a New Language

1. Create `src/chapters/<lang>/data/*.json` — one JSON file per chapter
2. Import them in `src/lib/chapters.ts` and add to `chapterMap`
3. Add an entry to `src/lib/languages.ts`

That's it — Astro generates all pages at build time.

## Project Structure

```
3-js-tutorial/
├── astro.config.mjs                  # Astro config with Preact integration
├── src/
│   ├── chapters/<lang>/data/*.json   # Chapter JSON files per language
│   ├── styles/global.css             # W3Schools-inspired theme + landing page
│   ├── lib/
│   │   ├── languages.ts              # Language registry (add new languages here)
│   │   └── chapters.ts               # Per-language chapter imports + types
│   ├── layouts/
│   │   ├── LandingLayout.astro       # Landing page shell (no sidebar)
│   │   └── TutorialLayout.astro      # Tutorial shell: header, sidebar, content, monaco
│   ├── components/
│   │   ├── Header.astro              # Green header with back link
│   │   ├── Sidebar.astro             # Grouped nav links (zero JS)
│   │   ├── ChapterNav.astro          # Prev/Next links (zero JS)
│   │   ├── LanguageCard.astro        # Card for landing page
│   │   └── blocks/                   # Content block renderers (zero JS)
│   ├── islands/
│   │   └── MonacoEditor.tsx          # Preact island — only JS that ships to browser
│   └── pages/
│       ├── index.astro               # Landing page with language cards
│       └── [lang]/[id].astro         # Generates all chapter pages at build time
└── package.json
```

## URL Structure

```
/                  → Landing page (choose a language)
/js/intro          → JavaScript Introduction
/js/variables      → JavaScript Variables
/ai-video/ai_prompting       → AI Prompting
/ai-video/ai_automation_intro → AI Automation Introduction
```

## Getting Started

```bash
npm install
npm start       # dev server → http://localhost:4321
npm run build   # static build → dist/
npm run preview # preview production build
```

## Architecture

- **Astro SSG** — each chapter is a static HTML page generated at build time via `getStaticPaths()`
- **Multi-language routing** — `[lang]/[id].astro` loops over all languages × chapters
- **Island architecture** — Monaco editor is a Preact island (`client:idle`), loaded during browser idle time (~3KB Preact runtime)
- **Lazy Monaco** — `@monaco-editor/loader` fetches Monaco from CDN only on first "Try it" click (~1MB, on-demand)
- **CustomEvent bridge** — static "Try it" buttons dispatch a `try-it` event, the Preact island listens and opens the editor
- **Code evaluation** uses `new Function(code)()` with a `console.log` override to capture output
