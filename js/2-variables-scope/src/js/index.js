/**
 * index.js — Entry point
 *
 * Renders a single Monaco editor + output panel on the right,
 * and a sidebar on the left to navigate between all demo snippets.
 * Clicking any demo in the sidebar loads its code into the editor
 * and its runtime output into the output panel.
 */

import "./monaco-setup.js"; // must be first — sets MonacoEnvironment before monaco loads
import * as monaco from "monaco-editor";
import "../styles.css";
import { varDemo } from "./var-scope.js";
import { letDemo, constDemo } from "./let-const-scope.js";
import { scopeChainDemo } from "./scope-chain.js";

// ── All sections + their demos ───────────────────────────────────────────────
const sections = [
    { title: "var — function scope & hoisting",   demos: varDemo() },
    { title: "let — block scope & TDZ",           demos: letDemo() },
    { title: "const — no reassign, mutable refs", demos: constDemo() },
    { title: "Scope Chain & Shadowing",            demos: scopeChainDemo() },
];

// ── Build DOM ────────────────────────────────────────────────────────────────
const app = document.getElementById("app");

// Sidebar
const sidebar = document.createElement("nav");
sidebar.id = "sidebar";

// Main area: editor + output stacked
const main = document.createElement("div");
main.id = "main";

const editorContainer = document.createElement("div");
editorContainer.id = "editor-container";

const outputPanel = document.createElement("div");
outputPanel.id = "output-panel";

const outputLabel = document.createElement("span");
outputLabel.className = "output-label";
outputLabel.textContent = "OUTPUT";

const outputText = document.createElement("p");
outputText.id = "output-text";
outputText.textContent = "← select a demo from the sidebar";

outputPanel.appendChild(outputLabel);
outputPanel.appendChild(outputText);
main.appendChild(editorContainer);
main.appendChild(outputPanel);
app.appendChild(sidebar);
app.appendChild(main);

// ── Single Monaco instance ───────────────────────────────────────────────────
const editor = monaco.editor.create(editorContainer, {
    value: "// Select a demo from the sidebar",
    language: "javascript",
    theme: "vs-dark",
    readOnly: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    lineNumbers: "on",
    fontSize: 13,
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    automaticLayout: true,
    scrollbar: { vertical: "auto", horizontal: "hidden" },
    overviewRulerLanes: 0,
    padding: { top: 12 },
});

// ── Sidebar: build nav items ─────────────────────────────────────────────────
let activeItem = null;

sections.forEach(({ title, demos }) => {
    const group = document.createElement("div");
    group.className = "nav-group";

    const groupTitle = document.createElement("p");
    groupTitle.className = "nav-group-title";
    groupTitle.textContent = title;
    group.appendChild(groupTitle);

    demos.forEach(({ snippet, output }, idx) => {
        const item = document.createElement("button");
        item.className = "nav-item";
        item.textContent = `${idx + 1}. ${output.split("—")[0].trim().slice(0, 38)}`;
        item.title = output; // full text on hover

        item.addEventListener("click", () => {
            if (activeItem) activeItem.classList.remove("active");
            activeItem = item;
            item.classList.add("active");

            // Load into the single editor
            editor.getModel().setValue(snippet);
            outputText.textContent = output;
        });

        group.appendChild(item);
    });

    sidebar.appendChild(group);
});

// Auto-select the first demo
sidebar.querySelector(".nav-item").click();
