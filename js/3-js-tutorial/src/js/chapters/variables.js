/**
 * chapters/variables.js
 * Tutorial chapter: JavaScript Variables — var, let, const overview
 */
export default {
    id: "variables",
    title: "JS Variables",
    content: [
        { type: "h1", text: "JavaScript Variables" },
        { type: "p",  text: "Variables are containers for storing data values. JavaScript has three ways to declare a variable: var, let, and const." },
        { type: "h2", text: "Which one to use?" },
        { type: "p",  text: "The general rule is: always declare variables with const. Use let only if the value will change. Avoid var in modern code." },
        { type: "table", rows: [
            ["Keyword", "Scope",    "Reassign", "Redeclare", "Hoisted"],
            ["var",     "Function", "✓",        "✓",         "✓ (as undefined)"],
            ["let",     "Block",    "✓",        "✗",         "✗ (TDZ)"],
            ["const",   "Block",    "✗",        "✗",         "✗ (TDZ)"],
        ]},
        { type: "h2", text: "Declaring Variables" },
        { type: "p",  text: "All three keywords are shown below. Notice that const requires an initial value." },
        { type: "example", title: "Example", code:
`var name = "Alice";      // function-scoped, avoid in modern code
let age  = 30;           // block-scoped, value can change
const PI = 3.14159;      // block-scoped, cannot be reassigned

console.log(name);
console.log(age);
console.log(PI);` },
        { type: "note", text: "It is a good practice to always declare variables at the top of their scope." },
        { type: "h2", text: "One Statement, Many Variables" },
        { type: "example", title: "Example", code:
`let person = "Alice", car = "Volvo", price = 200;
console.log(person, car, price);` },
    ],
};
