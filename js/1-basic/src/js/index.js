import { formatGreeting, toUpperCase } from "./utils.js";

function greet(text) {
    alert(formatGreeting(toUpperCase(text)));
}

document.querySelector("button").addEventListener("click", () => {
    const text = document.getElementById("dynamic").innerText;
    greet(text);
});
