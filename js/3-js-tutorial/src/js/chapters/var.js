/**
 * chapters/var.js
 * Tutorial chapter: The var keyword — quirks, hoisting, function scope
 */
export default {
    id: "var",
    title: "JS var",
    content: [
        { type: "h1", text: "The JavaScript var Keyword" },
        { type: "p",  text: "Before 2015 (ES6), var was the only way to declare a variable. It has several quirks that make it error-prone in modern code." },
        { type: "h2", text: "var is Function Scoped" },
        { type: "p",  text: "A var variable lives in the entire function it is declared in — not just the block (if/for/while) where it appears." },
        { type: "example", title: "Example — var leaks out of blocks", code:
`function demo() {
    if (true) {
        var message = "I'm inside the if block";
    }
    // var is still accessible here — it leaked out!
    console.log(message);
}
demo();` },
        { type: "h2", text: "var is Hoisted" },
        { type: "p",  text: "Declarations with var are moved to the top of their function before execution. The variable exists, but its value is undefined until the assignment line runs." },
        { type: "example", title: "Example — hoisting", code:
`console.log(x); // undefined — NOT a ReferenceError
var x = 10;
console.log(x); // 10` },
        { type: "h2", text: "var Can Be Re-declared" },
        { type: "p",  text: "Unlike let and const, var allows you to declare the same variable name twice without throwing an error. This can silently overwrite values." },
        { type: "example", title: "Example — re-declaration", code:
`var score = 100;
var score = 200; // no error — silently overwrites
console.log(score); // 200` },
        { type: "note", text: "Avoid var in modern JavaScript. Use let for values that change and const for values that don't." },
        { type: "h2", text: "The Classic Loop Bug" },
        { type: "p",  text: "Because var is function-scoped, all loop iterations share the same variable. This causes a common closure bug:" },
        { type: "example", title: "Example — var loop closure bug", code:
`var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs.push(function() { return i; });
}
// All three functions return 3 — they share the same i
console.log(funcs[0](), funcs[1](), funcs[2]());` },
    ],
};
