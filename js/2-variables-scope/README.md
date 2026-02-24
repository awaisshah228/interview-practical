# JS Variables & Scope

Demonstrates all JavaScript variable types (`var`, `let`, `const`) and their scoping rules, rendered live in the browser.

## Project Structure

```
2-variables-scope/
├── src/
│   ├── index.html              # HTML template
│   └── js/
│       ├── index.js            # Entry point — renders all demos
│       ├── var-scope.js        # var: function scope, hoisting, loop bug
│       ├── let-const-scope.js  # let/const: block scope, TDZ, mutation
│       └── scope-chain.js      # Scope chain & variable shadowing
├── dist/                       # Build output (generated, not committed)
├── webpack.config.cjs
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

| Concept | File |
|---------|------|
| `var` — function scope, hoisting, re-declaration | `var-scope.js` |
| `var` loop closure bug | `var-scope.js` |
| `let` — block scope, no re-declaration, TDZ | `let-const-scope.js` |
| `let` loop closure fix | `let-const-scope.js` |
| `const` — block scope, no reassign, object mutation | `let-const-scope.js` |
| Scope chain — inner to outer lookup | `scope-chain.js` |
| Variable shadowing | `scope-chain.js` |
