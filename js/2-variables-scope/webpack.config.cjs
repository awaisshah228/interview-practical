/**
 * webpack.config.cjs
 *
 * Webpack configuration for the 2-variables-scope project.
 * Uses .cjs extension (CommonJS) so that require() works here even though
 * the rest of the project uses "type": "module" in package.json.
 *
 * Build modes:
 *   npm run build  →  production (minified, optimised)
 *   npm run dev    →  development (readable, source maps)
 *   npm start      →  dev server with live reload
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
    // ── Entry ──────────────────────────────────────────────────────────────────
    // The single file webpack starts from. It follows all imports recursively
    // to build the full dependency graph.
    entry: "./src/js/index.js",

    // ── Output ─────────────────────────────────────────────────────────────────
    output: {
        filename: "bundle.js",                        // name of the main output file
        path: path.resolve(__dirname, "dist"),         // absolute path to output folder
        publicPath: "/",                              // base URL for all assets (required by Monaco workers)
        clean: true,                                  // delete dist/ before every build
    },

    // ── Loaders ────────────────────────────────────────────────────────────────
    // Webpack only understands JS/JSON by default. Loaders teach it how to
    // process other file types before bundling them.
    module: {
        rules: [
            {
                // css-loader  : resolves @import and url() inside CSS files
                // style-loader: injects the resulting CSS into the page via <style> tags at runtime
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                // Monaco ships a codicon icon font (.ttf). This rule tells webpack
                // to copy font files as static assets and return their URL.
                test: /\.ttf$/,
                type: "asset/resource",
            },
        ],
    },

    // ── Plugins ────────────────────────────────────────────────────────────────
    // Plugins extend webpack at a higher level than loaders (build pipeline hooks).
    plugins: [
        // Generates dist/index.html from our template, automatically injecting
        // a <script> tag pointing to bundle.js with the `defer` attribute.
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),

        // Monaco Editor needs Web Workers for language services (syntax checking,
        // IntelliSense). This plugin extracts those workers into separate files:
        //   editor.worker.js  — core editor worker (always needed)
        //   ts.worker.js      — TypeScript/JavaScript language worker
        // It also sets MonacoEnvironment automatically, but we override it in
        // monaco-setup.js to ensure it runs before Monaco initialises.
        new MonacoWebpackPlugin({
            languages: ["javascript", "typescript"],
        }),
    ],

    // ── Dev Server ─────────────────────────────────────────────────────────────
    // Only used by `npm start` (webpack serve). Not included in build output.
    devServer: {
        static: "./dist",                             // serve files from dist/
        open: true,                                   // open browser automatically
        hot: true,                                    // Hot Module Replacement — swap modules without full reload
        watchFiles: ["src/**/*.html", "src/**/*.js"], // also trigger reload when HTML/JS source files change
        client: {
            // Monaco's clipboard service internally cancels a DeferredPromise when
            // the editor loses focus — this is harmless but leaks into the overlay.
            // Filter it out so it doesn't block the screen during development.
            overlay: {
                runtimeErrors: (error) => error?.message !== "Canceled",
            },
        },
    },
};
