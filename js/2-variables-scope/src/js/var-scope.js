/**
 * var-scope.js
 *
 * Demonstrates the behaviour of `var` declarations in JavaScript:
 *  - Function scoped (not block scoped) — leaks out of if/for blocks
 *  - Hoisted to the top of its function as `undefined`
 *  - Can be re-declared in the same scope without error
 *  - Classic loop closure bug: all callbacks share the same `i`
 */

export function varDemo() {
    const demos = [];

    // ─── 1. var leaks out of blocks ──────────────────────────────────────────
    if (true) {
        var insideBlock = "declared inside if block";
    }
    demos.push({
        snippet:
`if (true) {
    var insideBlock = "declared inside if block";
}
console.log(insideBlock); // accessible outside!`,
        output: `"${insideBlock}" — var is NOT block scoped`
    });

    // ─── 2. Re-declaration ───────────────────────────────────────────────────
    var x = 1;
    var x = 2; // no error
    demos.push({
        snippet:
`var x = 1;
var x = 2; // no SyntaxError
console.log(x);`,
        output: `x = ${x} — var allows re-declaration`
    });

    // ─── 3. Hoisting ─────────────────────────────────────────────────────────
    const beforeVal = hoistedVar; // undefined, not ReferenceError
    var hoistedVar = "now assigned";
    demos.push({
        snippet:
`console.log(hoistedVar); // before declaration
var hoistedVar = "now assigned";
console.log(hoistedVar); // after declaration`,
        output: `before: ${beforeVal} | after: "${hoistedVar}" — hoisted as undefined`
    });

    // ─── 4. Loop closure bug ─────────────────────────────────────────────────
    const funcs = [];
    for (var i = 0; i < 3; i++) {
        funcs.push(() => i);
    }
    demos.push({
        snippet:
`const funcs = [];
for (var i = 0; i < 3; i++) {
    funcs.push(() => i); // all capture the same i
}
console.log(funcs.map(f => f())); // [3, 3, 3]`,
        output: `[${funcs.map(f => f()).join(", ")}] — all share the same var i (= 3 after loop)`
    });

    return demos;
}
