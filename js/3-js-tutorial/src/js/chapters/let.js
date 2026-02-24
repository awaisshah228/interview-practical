/**
 * chapters/let.js
 * Tutorial chapter: The let keyword — block scope, TDZ, loop fix
 */
export default {
    id: "let",
    title: "JS let",
    content: [
        { type: "h1", text: "The JavaScript let Keyword" },
        { type: "p",  text: "The let keyword was introduced in ES6 (2015). It is block-scoped, cannot be re-declared, and is the preferred way to declare variables whose values will change." },
        { type: "h2", text: "let is Block Scoped" },
        { type: "p",  text: "A block is any code between { } curly braces. A let variable only exists inside the block it was declared in." },
        { type: "example", title: "Example — block scope", code:
`{
    let x = 10;
    console.log(x); // 10 — accessible inside block
}
// console.log(x); // ReferenceError — x is not defined here` },
        { type: "h2", text: "let Cannot Be Re-declared" },
        { type: "p",  text: "Trying to declare the same let variable twice in the same scope throws a SyntaxError." },
        { type: "example", title: "Example — no re-declaration", code:
`let name = "Alice";
name = "Bob";       // ✓ re-assignment is allowed
// let name = "Charlie"; // ✗ SyntaxError: already declared
console.log(name);` },
        { type: "h2", text: "Temporal Dead Zone (TDZ)" },
        { type: "p",  text: "Unlike var, a let variable cannot be accessed before its declaration. The time between entering the block and reaching the declaration is called the Temporal Dead Zone." },
        { type: "example", title: "Example — TDZ", code:
`try {
    console.log(y); // ReferenceError — in the TDZ
} catch(e) {
    console.log("Error:", e.message);
}
let y = 5;
console.log(y); // 5` },
        { type: "h2", text: "let Fixes the Loop Closure Bug" },
        { type: "example", title: "Example — let in loops", code:
`var funcs = [];
for (let i = 0; i < 3; i++) {
    // each iteration gets its own copy of i
    funcs.push(function() { return i; });
}
console.log(funcs[0](), funcs[1](), funcs[2]()); // 0 1 2` },
        { type: "note", text: "Use let when the variable value needs to change (loop counters, conditional reassignments). Use const for everything else." },
    ],
};
