/**
 * utils.js — Pure helper functions (no DOM, no side effects)
 *
 * Exported functions used by:
 *   index.js — calls them when the button is clicked
 *   demo.js  — calls them on page load to log examples to the console
 *
 * These functions are deliberately kept pure (same input → same output,
 * no external state) so they are easy to test and reuse.
 */

/**
 * formatGreeting()
 * Prepends a greeting prefix to any string.
 * @param {string} text - the message to include in the greeting
 * @returns {string} the full greeting string
 */
export function formatGreeting(text) {
    return "Hello, welcome to JavaScript! " + text;
}

/**
 * toUpperCase()
 * Converts a string to all uppercase letters.
 * @param {string} text - the string to convert
 * @returns {string} the uppercase version of the input
 */
export function toUpperCase(text) {
    return text.toUpperCase();
}
