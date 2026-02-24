# Interview Practical

A collection of hands-on JavaScript and web development exercises organized by topic.

## Structure

```
interview-practical/
└── js/
    ├── 1-basic/            # ES Modules, Webpack bundling, dev server
    ├── 2-variables-scope/  # var / let / const, scope chain, hoisting
    ├── 3-js-tutorial/      # [DEPRECATED] Webpack SPA version of the JS tutorial
    └── 4-js-tutorial/      # Astro SSG multi-language tutorial with landing page
```

## Topics

| Folder | Topic |
|--------|-------|
| `js/1-basic` | ES Modules, Webpack, HtmlWebpackPlugin, webpack-dev-server |
| `js/2-variables-scope` | `var` / `let` / `const`, hoisting, scope chain, shadowing |
| `js/3-js-tutorial` | **[Deprecated]** Webpack SPA — W3Schools-style JS tutorial |
| `js/4-js-tutorial` | **Astro SSG** — Multi-language code tutorials with landing page, zero JS content, lazy Monaco editor |

## Getting Started

Each subfolder is a standalone project. Navigate into one and install dependencies:

```bash
cd js/4-js-tutorial
npm install
npm start       # dev server with live reload
npm run build   # production build
```
