# JS Basics — Webpack + ES Modules

A simple JavaScript project demonstrating ES module imports/exports, bundled and minified with Webpack.

## Project Structure

```
1-basic/
├── src/
│   ├── index.html          # HTML template
│   └── js/
│       ├── index.js        # Entry point
│       └── utils.js        # Exported helper functions
├── dist/                   # Build output (generated, not committed)
│   ├── index.html
│   └── bundle.js
├── webpack.config.cjs      # Webpack configuration
├── package.json
└── README.md
```

## Scripts

```bash
npm start       # Dev server with live reload (http://localhost:8080)
npm run build   # Production build (minified)
npm run dev     # Development build (readable)
```

## Concepts Covered

- ES Modules (`import` / `export`)
- Webpack bundling and minification
- `HtmlWebpackPlugin` for automatic script injection
- `webpack-dev-server` for live reload on file changes
