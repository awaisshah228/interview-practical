/**
 * chapters/scope.js
 * Tutorial chapter: JavaScript Scope — global, function, block, scope chain
 */
export default {
    id: "scope",
    title: "JS Scope",
    content: [
        { type: "h1", text: "JavaScript Scope" },
        { type: "p",  text: "Scope determines where a variable is accessible. JavaScript has three types: Global, Function, and Block scope." },
        { type: "h2", text: "Global Scope" },
        { type: "p",  text: "Variables declared outside any function or block are global — they can be accessed from anywhere in the code." },
        { type: "example", title: "Example — global scope", code:
`const globalMessage = "I am global";

function show() {
    console.log(globalMessage); // accessible inside functions
}

show();
console.log(globalMessage); // accessible outside too` },
        { type: "h2", text: "Function Scope" },
        { type: "p",  text: "Variables declared with var inside a function are only accessible within that function." },
        { type: "example", title: "Example — function scope", code:
`function greet() {
    var localName = "Alice"; // only exists inside greet()
    console.log("Hello,", localName);
}

greet();
try {
    console.log(localName); // ReferenceError
} catch(e) {
    console.log("Error:", e.message);
}` },
        { type: "h2", text: "Block Scope" },
        { type: "p",  text: "Variables declared with let and const are scoped to the nearest { } block." },
        { type: "example", title: "Example — block scope", code:
`{
    const blockVar = "I only live in this block";
    console.log(blockVar); // ✓
}
try {
    console.log(blockVar); // ReferenceError
} catch(e) {
    console.log("Error:", e.message);
}` },
        { type: "h2", text: "The Scope Chain" },
        { type: "p",  text: "When JavaScript looks up a variable, it starts in the current scope and walks outward to enclosing scopes until it finds it — or throws a ReferenceError." },
        { type: "example", title: "Example — scope chain lookup", code:
`const level1 = "global";

function outer() {
    const level2 = "outer function";

    function inner() {
        const level3 = "inner function";
        // inner can see all three — walks the chain outward
        console.log(level3); // own scope
        console.log(level2); // outer function scope
        console.log(level1); // global scope
    }
    inner();
}
outer();` },
        { type: "h2", text: "Variable Shadowing" },
        { type: "p",  text: "An inner variable with the same name as an outer one shadows (hides) it within the inner scope." },
        { type: "example", title: "Example — shadowing", code:
`const color = "blue";

function paint() {
    const color = "red"; // shadows the outer color
    console.log("Inside:", color);  // red
}

paint();
console.log("Outside:", color); // blue — unchanged` },
    ],
};
