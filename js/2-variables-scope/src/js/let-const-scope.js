/**
 * let-const-scope.js
 *
 * Demonstrates `let` and `const` declarations in JavaScript:
 *
 * `let`:
 *  - Block scoped — dies at the closing } of the block it was declared in
 *  - Cannot be re-declared in the same scope (SyntaxError)
 *  - Temporal Dead Zone (TDZ) — accessing before declaration throws ReferenceError
 *  - Fixes the classic var loop closure bug
 *
 * `const`:
 *  - Block scoped, same as let
 *  - Must be initialized at declaration
 *  - Cannot be reassigned (TypeError), but object/array contents CAN be mutated
 */

export function letDemo() {
    const demos = [];

    // ─── 1. Block scope ──────────────────────────────────────────────────────
    let blockResult;
    if (true) {
        let blockScoped = "only inside this block";
        blockResult = blockScoped;
    }
    // blockScoped is dead here — ReferenceError if accessed
    demos.push({
        snippet:
`if (true) {
    let blockScoped = "only inside this block";
    console.log(blockScoped); // ✓ works
}
console.log(blockScoped); // ✗ ReferenceError`,
        output: `inside block: "${blockResult}" | outside: ReferenceError — let is block scoped`
    });

    // ─── 2. Re-assignment (allowed) vs re-declaration (not allowed) ──────────
    let y = 10;
    y = 20; // ok
    demos.push({
        snippet:
`let y = 10;
y = 20;        // ✓ re-assignment is fine
let y = 30;    // ✗ SyntaxError: already declared`,
        output: `y = ${y} — re-assignment works; re-declaration throws SyntaxError`
    });

    // ─── 3. Loop closure fix ─────────────────────────────────────────────────
    const funcs = [];
    for (let i = 0; i < 3; i++) {
        funcs.push(() => i); // each iteration gets its own i
    }
    demos.push({
        snippet:
`const funcs = [];
for (let i = 0; i < 3; i++) {
    funcs.push(() => i); // each i is a new binding
}
console.log(funcs.map(f => f())); // [0, 1, 2]`,
        output: `[${funcs.map(f => f()).join(", ")}] — each callback has its own copy of i`
    });

    return demos;
}

export function constDemo() {
    const demos = [];

    // ─── 1. Primitive — cannot reassign ──────────────────────────────────────
    const PI = 3.14159;
    demos.push({
        snippet:
`const PI = 3.14159;
PI = 3; // ✗ TypeError: Assignment to constant variable`,
        output: `PI = ${PI} — reassigning a const primitive throws TypeError`
    });

    // ─── 2. Object — reference is const, contents are mutable ───────────────
    const person = { name: "Alice" };
    person.name = "Bob"; // mutating property, not reassigning the binding
    demos.push({
        snippet:
`const person = { name: "Alice" };
person.name = "Bob";  // ✓ mutation is allowed
person = {};          // ✗ TypeError: reassigning the binding`,
        output: `person.name = "${person.name}" — object properties can be mutated`
    });

    // ─── 3. Array — same rule ─────────────────────────────────────────────────
    const nums = [1, 2, 3];
    nums.push(4);
    demos.push({
        snippet:
`const nums = [1, 2, 3];
nums.push(4);  // ✓ mutation allowed
nums = [];     // ✗ TypeError`,
        output: `nums = [${nums.join(", ")}] — arrays declared with const can still be mutated`
    });

    return demos;
}
