/**
 * chapters/const.js
 * Tutorial chapter: The const keyword — immutable binding, mutable objects
 */
export default {
    id: "const",
    title: "JS const",
    content: [
        { type: "h1", text: "The JavaScript const Keyword" },
        { type: "p",  text: "The const keyword declares a variable with a constant binding — the variable cannot be reassigned. It does NOT make the value immutable." },
        { type: "h2", text: "Must Be Initialized" },
        { type: "p",  text: "A const variable must be assigned a value when it is declared. You cannot declare it first and assign it later." },
        { type: "example", title: "Example", code:
`const PI = 3.14159;
console.log(PI);

// const x; // ✗ SyntaxError: Missing initializer` },
        { type: "h2", text: "Cannot Be Reassigned" },
        { type: "example", title: "Example — reassignment throws", code:
`const speed = 100;
try {
    speed = 200; // TypeError: Assignment to constant variable
} catch(e) {
    console.log("Error:", e.message);
}
console.log(speed); // still 100` },
        { type: "h2", text: "Objects and Arrays Are Still Mutable" },
        { type: "p",  text: "const prevents reassigning the variable, but if the value is an object or array, its properties and elements can still be changed." },
        { type: "example", title: "Example — const object", code:
`const person = { name: "Alice", age: 30 };
person.name = "Bob"; // ✓ allowed — mutating a property
person.city = "NYC"; // ✓ allowed — adding a property
console.log(person);

// person = {}; // ✗ TypeError — reassigning the binding` },
        { type: "example", title: "Example — const array", code:
`const colors = ["red", "green"];
colors.push("blue"); // ✓ allowed — mutating the array
colors[0] = "pink";  // ✓ allowed — changing an element
console.log(colors);

// colors = []; // ✗ TypeError — reassigning the binding` },
        { type: "note", text: "Use const by default. Only switch to let when you know the variable needs to be reassigned." },
    ],
};
