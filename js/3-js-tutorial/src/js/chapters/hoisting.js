/**
 * chapters/hoisting.js
 * Tutorial chapter: JavaScript Hoisting — declarations moved to top
 */
export default {
    id: "hoisting",
    title: "JS Hoisting",
    content: [
        { type: "h1", text: "JavaScript Hoisting" },
        { type: "p",  text: "Hoisting is JavaScript's default behaviour of moving declarations to the top of their scope before code executes. Only the declaration is hoisted — not the initialisation." },
        { type: "h2", text: "var is Hoisted" },
        { type: "p",  text: "var declarations are hoisted as undefined. You can reference the variable before its line — but its value will be undefined." },
        { type: "example", title: "Example — var hoisting", code:
`console.log(x); // undefined — hoisted but not yet assigned
var x = 5;
console.log(x); // 5

// JavaScript internally sees this as:
// var x;          ← hoisted declaration
// console.log(x); ← undefined
// x = 5;          ← assignment stays in place
// console.log(x); ← 5` },
        { type: "h2", text: "let and const — Temporal Dead Zone" },
        { type: "p",  text: "let and const are hoisted too, but accessing them before declaration throws a ReferenceError. This period is called the Temporal Dead Zone (TDZ)." },
        { type: "example", title: "Example — TDZ", code:
`try {
    console.log(y); // ReferenceError: Cannot access 'y' before initialisation
} catch(e) {
    console.log("Caught:", e.message);
}
let y = 10;
console.log(y); // 10` },
        { type: "h2", text: "Function Declarations are Fully Hoisted" },
        { type: "p",  text: "Function declarations (not expressions) are fully hoisted — you can call them before they appear in the code." },
        { type: "example", title: "Example — function hoisting", code:
`// Call before declaration — works!
console.log(add(2, 3)); // 5

function add(a, b) {
    return a + b;
}` },
        { type: "h2", text: "Function Expressions are NOT Hoisted" },
        { type: "example", title: "Example — expression not hoisted", code:
`try {
    console.log(multiply(2, 3)); // TypeError or ReferenceError
} catch(e) {
    console.log("Caught:", e.message);
}

const multiply = function(a, b) { return a * b; };` },
        { type: "note", text: "Always declare variables and functions before using them. This avoids all hoisting surprises." },
    ],
};
