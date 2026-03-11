# 5-js-tutorial — Next.js Tutorial Platform

Converted from Astro (4-js-tutorial) to **Next.js 16 App Router** with static export.

## Structure

```
5-js-tutorial/
├── app/
│   ├── layout.tsx          # Root layout (imports global.css)
│   ├── page.tsx            # Landing page (language picker)
│   ├── globals.css         # W3Schools-inspired theme
│   ├── ai-video/
│   │   └── page.tsx        # AI Video course outline
│   └── [lang]/[id]/
│       └── page.tsx        # Dynamic chapter pages (SSG)
├── chapters/               # JSON chapter data (js/, ai-video/)
├── lib/
│   ├── chapters.ts         # Chapter registry & types
│   └── languages.ts        # Language definitions
├── components/
│   ├── Header.tsx           # Green header bar
│   ├── Sidebar.tsx          # Collapsible sidebar (client component)
│   ├── ChapterNav.tsx       # Prev/Next navigation
│   ├── TutorialShell.tsx    # Mobile sidebar toggle logic
│   ├── MonacoEditor.tsx     # Monaco code editor (client component)
│   └── blocks/              # Content block renderers
│       ├── ContentBlock.tsx  # Block type router
│       ├── ExampleBlock.tsx  # Code + "Try it Yourself"
│       ├── ExerciseBlock.tsx # MCQ quiz
│       └── ...
└── next.config.ts           # Static export config
```

## Scripts

- `npm run dev` — Dev server (http://localhost:3000)
- `npm run build` — Static export to `out/`
- `npm start` — Production server

## Key Differences from Astro Version

- Uses `@monaco-editor/react` instead of `@monaco-editor/loader` (no CDN style issues)
- Sidebar is a React client component with `usePathname()` for active state
- ExerciseBlock uses React state instead of vanilla JS
- No view transitions (no style corruption issues with Monaco)
- All 141 chapters statically generated via `generateStaticParams()`
