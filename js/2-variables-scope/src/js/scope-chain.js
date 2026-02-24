/**
 * scope-chain.js
 *
 * Demonstrates how JavaScript resolves variable names via the scope chain:
 *  - JS looks for a variable in the current scope first, then walks outward
 *    through enclosing scopes until it finds it (or throws ReferenceError)
 *  - Shadowing: an inner variable with the same name as an outer one
 *    "shadows" (hides) the outer variable within that inner scope
 *  - Global scope is the outermost scope — always the last stop in the chain
 */

const globalVar = "global";

function outer() {
    const outerVar = "outer";
    function inner() {
        const innerVar = "inner";
        // inner → outer → global: walks the chain until found
        return { innerVar, outerVar, globalVar };
    }
    return inner();
}

export function scopeChainDemo() {
    const demos = [];

    // ─── 1. Scope chain lookup ───────────────────────────────────────────────
    const { innerVar, outerVar, globalVar: gv } = outer();
    demos.push({
        snippet:
`const globalVar = "global";

function outer() {
    const outerVar = "outer";
    function inner() {
        const innerVar = "inner";
        console.log(innerVar);  // found in own scope
        console.log(outerVar);  // found in outer()
        console.log(globalVar); // found in global scope
    }
    inner();
}`,
        output: `innerVar="${innerVar}" | outerVar="${outerVar}" | globalVar="${gv}" — inner sees all enclosing scopes`
    });

    // ─── 2. Variable shadowing ───────────────────────────────────────────────
    const shadow = "outer value";
    function shadowDemo() {
        const shadow = "inner value"; // shadows the outer 'shadow'
        return shadow;
    }
    demos.push({
        snippet:
`const shadow = "outer value";

function shadowDemo() {
    const shadow = "inner value"; // shadows outer
    console.log(shadow); // "inner value"
}

console.log(shadow); // "outer value" — outer is untouched`,
        output: `inside: "${shadowDemo()}" | outside: "${shadow}" — same name, different bindings`
    });

    return demos;
}
