# JS Basics — Webpack + ES Modules

A simple JavaScript project demonstrating ES module imports/exports, bundled and minified with Webpack.

## Project Structure

```
1-basic/
├── index.html          # HTML template
├── script.js           # Entry point
├── utils.js            # Exported helper functions
├── webpack.config.cjs  # Webpack configuration
├── dist/               # Build output (generated)
│   ├── index.html
│   └── bundle.js
└── package.json
```

## Scripts

```bash
npm run build   # Production build (minified)
npm run dev     # Development build (readable)
```

## Concepts Covered

- ES Modules (`import` / `export`)
- Webpack bundling and minification
- `HtmlWebpackPlugin` for automatic script injection
