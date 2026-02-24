/**
 * index.js — Entry point (DOM wiring only)
 *
 * Handles all browser interaction for the page:
 *   - Listens for the button click
 *   - Reads the dynamic text from the DOM
 *   - Calls greet() which uses utils.js helpers to format and display the message
 *
 * Separation of concerns:
 *   utils.js  — pure helper functions (formatGreeting, toUpperCase) — no DOM
 *   demo.js   — runs utils in isolation and logs to console — no DOM
 *   index.js  — DOM interaction only — imports from both above
 */

import { formatGreeting, toUpperCase } from "./utils.js";
import "./demo.js"; // runs console demos on page load (check DevTools → Console)

/**
 * greet()
 * Formats the given text into a greeting and shows it as an alert.
 * @param {string} text - the raw text to greet with
 */
function greet(text) {
    alert(formatGreeting(toUpperCase(text)));
}

// ── DOM wiring ────────────────────────────────────────────────────────────────
// Wait for DOMContentLoaded is not needed — webpack injects the script with
// `defer`, so the DOM is already ready when this code runs.
document.querySelector("button").addEventListener("click", () => {
    const text = document.getElementById("dynamic").innerText;
    greet(text);
});
