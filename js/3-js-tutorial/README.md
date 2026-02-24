# 3 — JS Tutorial (W3Schools-style)

An interactive JavaScript tutorial site that mirrors the W3Schools layout: left sidebar chapter navigation, rendered content area, and a **"Try it Yourself"** Monaco editor panel that slides up from the bottom.

## Features

- Chapter-by-chapter navigation via a collapsible sidebar
- Rendered content blocks: headings, paragraphs, note boxes, comparison tables, and syntax-highlighted code examples
- **Try it Yourself** button on every example — loads the snippet into an embedded Monaco editor
- **Run** button (or `Ctrl+Enter`) executes the code and displays `console.log` output
- Prev / Next chapter navigation at the bottom of each page
- Fully responsive — sidebar becomes a slide-in overlay on mobile

## Chapters

| # | Chapter | Covers |
|---|---------|--------|
| 1 | Variables | `var`, `let`, `const` — overview and comparison table |
| 2 | var | Function scope, hoisting, re-declaration, loop-var bug |
| 3 | let | Block scope, TDZ, loop fix with `let` |
| 4 | const | Immutable binding, mutable object/array content |
| 5 | Scope | Global, function, block scope; scope chain; shadowing |
| 6 | Hoisting | `var` hoisting, TDZ for `let`/`const`, function declaration hoisting |

## Project Structure

```
3-js-tutorial/
├── src/
│   ├── index.html                 # HTML shell (header, sidebar, content, try-it panel)
│   ├── styles.css                 # W3Schools-inspired light theme + dark code blocks
│   └── js/
│       ├── index.js               # Entry point — wires chapters → render()
│       ├── monaco-setup.js        # Sets MonacoEnvironment before editor loads
│       ├── renderer.js            # DOM renderer: sidebar, content blocks, try-it panel
│       └── chapters/
│           ├── index.js           # Exports ordered chapters array
│           ├── variables.js       # Chapter 1 data
│           ├── var.js             # Chapter 2 data
│           ├── let.js             # Chapter 3 data
│           ├── const.js           # Chapter 4 data
│           ├── scope.js           # Chapter 5 data
│           └── hoisting.js        # Chapter 6 data
├── webpack.config.cjs             # Webpack 5 config (Monaco plugin, CSS/TTF loaders)
└── package.json
```

## Getting Started

```bash
npm install
npm start       # dev server → http://localhost:8080
npm run build   # production build → dist/
```

## Key Technical Details

- **`monaco-setup.js` must be the first import** — sets `self.MonacoEnvironment` so Monaco's workers load correctly via `publicPath: "/"`
- **Single Monaco instance** created once; its content is swapped on every "Try it Yourself" click
- **Code evaluation** uses `new Function(code)()` with a `console.log` override to capture output
- **"Canceled" error** from Monaco's clipboard service is suppressed via `devServer.client.overlay` filter + `unhandledrejection` handler
