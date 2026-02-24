const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        clean: true,
    },
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.ttf$/, type: "asset/resource" },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new MonacoWebpackPlugin({ languages: ["javascript", "typescript"] }),
    ],
    devServer: {
        static: "./dist",
        open: true,
        hot: true,
        watchFiles: ["src/**/*.html", "src/**/*.js", "src/**/*.css"],
        client: {
            overlay: { runtimeErrors: (e) => e?.message !== "Canceled" },
        },
    },
};
