/**
 * runner.js — Pure demo runner (no DOM, no Monaco)
 *
 * Imports every demo module and runs each example, logging the snippet
 * and its runtime output to the browser console (or Node.js if bundled
 * without the DOM-dependent renderer).
 *
 * Purpose:
 *   - Lets you verify the demo logic independently of the UI
 *   - Open DevTools → Console to see all results grouped by section
 *   - Useful for debugging a single demo without loading the editor
 */

import { varDemo } from "./var-scope.js";
import { letDemo, constDemo } from "./let-const-scope.js";
import { scopeChainDemo } from "./scope-chain.js";

// Each section maps a human-readable title to its demo function
const sections = [
    { title: "var — function scope & hoisting",   fn: varDemo },
    { title: "let — block scope & TDZ",           fn: letDemo },
    { title: "const — no reassign, mutable refs", fn: constDemo },
    { title: "Scope Chain & Shadowing",            fn: scopeChainDemo },
];

// Run every demo and log snippet + output to the console
sections.forEach(({ title, fn }) => {
    console.group(`📦 ${title}`);
    fn().forEach(({ snippet, output }, i) => {
        console.log(`── Demo ${i + 1} ──`);
        console.log("%cCODE\n" + snippet, "color: #79c0ff; font-family: monospace");
        console.log("%cOUTPUT  " + output, "color: #56d364");
    });
    console.groupEnd();
});

/**
 * getSections()
 *
 * Returns all demo sections with their pre-evaluated { snippet, output } pairs.
 * Called by renderer.js to populate the Monaco sidebar and editor.
 *
 * @returns {{ title: string, demos: { snippet: string, output: string }[] }[]}
 */
export function getSections() {
    return sections.map(({ title, fn }) => ({ title, demos: fn() }));
}
