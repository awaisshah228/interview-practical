# 3 — JS Tutorial (W3Schools-style) — Webpack SPA [DEPRECATED]

> **Deprecated:** This is the original Webpack-based version. See `js/4-js-tutorial` for the Astro SSG version with multi-language support, landing page, and better performance.

An interactive JavaScript tutorial site that mirrors the W3Schools layout: left sidebar chapter navigation, rendered content area, and a **"Try it Yourself"** Monaco editor panel that slides up from the bottom.

## Getting Started

```bash
npm install
npm start       # dev server → http://localhost:8080
npm run build   # production build → dist/
```

## Project Structure

```
3-js-tutorial/
├── src/
│   ├── index.html                 # HTML shell
│   ├── styles.css                 # W3Schools-inspired theme
│   ├── js/
│   │   ├── index.js               # Entry point
│   │   ├── monaco-setup.js        # Monaco worker setup
│   │   └── renderer.js            # DOM renderer: sidebar, content, try-it panel
│   └── chapters/
│       └── js/data/*.json         # 24 chapter JSON files
├── webpack.config.cjs             # Webpack 5 config
└── package.json
```
