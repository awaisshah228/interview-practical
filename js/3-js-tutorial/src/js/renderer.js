/**
 * renderer.js — W3Schools-style tutorial renderer
 *
 * Layout:
 *   - Sidebar: chapter list with active state + prev/next arrows
 *   - Content: renders typed content blocks (h1, h2, p, note, table, example)
 *   - Try-it panel: slides up from the bottom with an editable Monaco editor + Run button
 */

// ── Run code helper ──────────────────────────────────────────────────────────
function evalCode(code) {
    const logs = [];
    const orig = console.log;
    console.log = (...args) => {
        logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" "));
        orig(...args);
    };
    try {
        // eslint-disable-next-line no-new-func
        const ret = new Function(code)();
        console.log = orig;
        if (logs.length) return { ok: true,  text: logs.join("\n") };
        if (ret !== undefined) return { ok: true, text: String(ret) };
        return { ok: true, text: "✓ Ran with no output" };
    } catch (e) {
        console.log = orig;
        return { ok: false, text: e.message };
    }
}

// ── Content block renderers ──────────────────────────────────────────────────
function renderBlock(block, onTryIt) {
    switch (block.type) {
        case "h1": {
            const el = document.createElement("h1");
            el.textContent = block.text;
            return el;
        }
        case "h2": {
            const el = document.createElement("h2");
            el.textContent = block.text;
            return el;
        }
        case "p": {
            const el = document.createElement("p");
            el.textContent = block.text;
            return el;
        }
        case "note": {
            const el = document.createElement("div");
            el.className = "note-box";
            el.innerHTML = `<strong>📝 Note: </strong>${block.text}`;
            return el;
        }
        case "table": {
            const wrapper = document.createElement("div");
            wrapper.className = "table-wrapper";
            const table = document.createElement("table");
            block.rows.forEach((row, i) => {
                const tr = document.createElement("tr");
                row.forEach(cell => {
                    const td = document.createElement(i === 0 ? "th" : "td");
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
            wrapper.appendChild(table);
            return wrapper;
        }
        case "example": {
            const box = document.createElement("div");
            box.className = "example-box";

            const label = document.createElement("div");
            label.className = "example-label";
            label.textContent = block.title || "Example";
            box.appendChild(label);

            const pre = document.createElement("pre");
            const code = document.createElement("code");
            code.textContent = block.code;
            pre.appendChild(code);
            box.appendChild(pre);

            const btn = document.createElement("button");
            btn.className = "try-it-btn";
            btn.textContent = "Try it Yourself »";
            btn.addEventListener("click", () => onTryIt(block.code));
            box.appendChild(btn);

            return box;
        }
        default:
            return null;
    }
}

// ── Main render function ─────────────────────────────────────────────────────
export function render(chapters, monaco) {
    // Suppress Monaco clipboard cancel errors
    window.addEventListener("unhandledrejection", (e) => {
        if (e.reason?.message === "Canceled") e.preventDefault();
    });

    const sidebar    = document.getElementById("sidebar");
    const content    = document.getElementById("content");
    const tryItPanel = document.getElementById("try-it-panel");
    const tryItClose = document.getElementById("try-it-close");
    const tryItRun   = document.getElementById("try-it-run");
    const tryItOut   = document.getElementById("try-it-output");
    const tryItLabel = document.getElementById("try-it-output-label");
    const monacoEl   = document.getElementById("monaco-container");
    const mobileToggle = document.getElementById("mobile-toggle");

    // ── Monaco instance (created once, shared by all Try-it buttons) ──────────
    const editor = monaco.editor.create(monacoEl, {
        value: "",
        language: "javascript",
        theme: "vs-dark",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 13,
        fontFamily: "'Fira Code', 'Cascadia Code', monospace",
        automaticLayout: true,
        lineNumbers: "on",
        padding: { top: 10, bottom: 10 },
        scrollbar: { vertical: "auto", horizontal: "auto" },
    });

    // ── Try-it panel open/close ───────────────────────────────────────────────
    function openTryIt(code) {
        editor.getModel().setValue(code);
        tryItOut.textContent = "";
        tryItLabel.textContent = "";
        tryItPanel.classList.add("open");
        setTimeout(() => editor.focus(), 300);
    }
    tryItClose.addEventListener("click", () => tryItPanel.classList.remove("open"));

    // Ctrl+Enter to run from inside the editor
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);

    function runCode() {
        const result = evalCode(editor.getValue());
        tryItLabel.textContent = result.ok ? "▶ OUTPUT" : "✗ ERROR";
        tryItLabel.className   = result.ok ? "ok" : "error";
        tryItOut.textContent   = result.text;
    }
    tryItRun.addEventListener("click", runCode);

    // ── Chapter state ─────────────────────────────────────────────────────────
    let currentIdx = 0;

    function loadChapter(idx) {
        currentIdx = idx;
        const chapter = chapters[idx];

        // Highlight active sidebar item
        sidebar.querySelectorAll(".nav-item").forEach((el, i) => {
            el.classList.toggle("active", i === idx);
        });

        // Clear and render content
        content.innerHTML = "";
        chapter.content.forEach(block => {
            const el = renderBlock(block, openTryIt);
            if (el) content.appendChild(el);
        });

        // Prev / Next nav
        const nav = document.createElement("div");
        nav.className = "chapter-nav";
        if (idx > 0) {
            const prev = document.createElement("button");
            prev.className = "nav-btn prev-btn";
            prev.textContent = "❮ " + chapters[idx - 1].title;
            prev.addEventListener("click", () => loadChapter(idx - 1));
            nav.appendChild(prev);
        }
        if (idx < chapters.length - 1) {
            const next = document.createElement("button");
            next.className = "nav-btn next-btn";
            next.textContent = chapters[idx + 1].title + " ❯";
            next.addEventListener("click", () => loadChapter(idx + 1));
            nav.appendChild(next);
        }
        content.appendChild(nav);

        // Scroll content to top
        content.scrollTop = 0;

        // Close mobile sidebar after selection
        sidebar.classList.remove("open");
    }

    // ── Build sidebar nav ─────────────────────────────────────────────────────
    const label = document.createElement("p");
    label.className = "sidebar-label";
    label.textContent = "JS Tutorial";
    sidebar.appendChild(label);

    chapters.forEach((ch, i) => {
        const item = document.createElement("button");
        item.className = "nav-item";
        item.textContent = ch.title;
        item.addEventListener("click", () => loadChapter(i));
        sidebar.appendChild(item);
    });

    // ── Mobile sidebar toggle ─────────────────────────────────────────────────
    mobileToggle.addEventListener("click", () => sidebar.classList.toggle("open"));
    document.getElementById("sidebar-backdrop")
        .addEventListener("click", () => sidebar.classList.remove("open"));

    // Load first chapter
    loadChapter(0);
}
