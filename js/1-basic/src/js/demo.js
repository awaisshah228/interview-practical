/**
 * demo.js — Pure demo runner (no DOM)
 *
 * Imports the utility functions from utils.js and runs them with example
 * inputs, logging the results to the console.
 *
 * Purpose:
 *   - Verify that the utility functions work correctly in isolation
 *   - No DOM, no alerts — purely observable via DevTools → Console
 *   - Can be used as a reference for what each utility does
 *
 * Open DevTools → Console after `npm start` to see the output.
 */

import { formatGreeting, toUpperCase } from "./utils.js";

// ── Run examples ─────────────────────────────────────────────────────────────

console.group("📦 utils.js demos");

// toUpperCase — converts a string to uppercase
const sample = "Hi how are you doing?";
console.log("toUpperCase input :", sample);
console.log("toUpperCase output:", toUpperCase(sample));

// formatGreeting — prepends the greeting message
const formatted = formatGreeting(toUpperCase(sample));
console.log("formatGreeting    :", formatted);

console.groupEnd();
