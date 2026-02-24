/**
 * renderer.js — W3Schools-style tutorial renderer
 *
 * Responsibilities (DOM-only, no data/logic here):
 *   - Builds a GROUPED sidebar from chapters[].group
 *   - Renders typed content blocks (h1, h2, p, note, table, example)
 *   - Manages the slide-up "Try it Yourself" Monaco editor panel
 *   - Handles prev/next chapter navigation
 *   - Mobile sidebar toggle
 *
 * Chapter data format (parsed from JSON):
 *   { id, title, group, content: [ block, ... ] }
 *
 * Block types:
 *   { type: "h1"|"h2"|"p",   text: string }
 *   { type: "note",           text: string }
 *   { type: "table",          rows: string[][] }    // rows[0] = header row
 *   { type: "example",        title: string, code: string | string[] }
 *     ↑ code can be a string or an array of lines (joined with \n)
 */

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Normalise code: accepts a string or an array of lines. */
function toCodeString(code) {
    return Array.isArray(code) ? code.join("\n") : code;
}

/** Run code and capture console.log output. Returns {ok, text}. */
function evalCode(code) {
    const logs = [];
    const orig = console.log;
    console.log = (...args) => {
        logs.push(args.map(a =>
            typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
        ).join(" "));
        orig(...args);
    };
    try {
        // eslint-disable-next-line no-new-func
        const ret = new Function(code)();
        console.log = orig;
        if (logs.length)       return { ok: true,  text: logs.join("\n") };
        if (ret !== undefined) return { ok: true,  text: String(ret) };
        return { ok: true,  text: "✓ Ran with no output" };
    } catch (e) {
        console.log = orig;
        return { ok: false, text: e.message };
    }
}

// ── Block renderers ───────────────────────────────────────────────────────────

/**
 * Renders a single content block into a DOM element.
 * @param {object}   block
 * @param {function} onTryIt - called with code string when "Try it" is clicked
 * @returns {HTMLElement|null}
 */
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
            block.rows.forEach((row, rowIdx) => {
                const tr = document.createElement("tr");
                row.forEach(cell => {
                    const td = document.createElement(rowIdx === 0 ? "th" : "td");
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
            wrapper.appendChild(table);
            return wrapper;
        }

        case "example": {
            const code = toCodeString(block.code);

            const box = document.createElement("div");
            box.className = "example-box";

            const label = document.createElement("div");
            label.className = "example-label";
            label.textContent = block.title || "Example";
            box.appendChild(label);

            const pre = document.createElement("pre");
            const codeEl = document.createElement("code");
            codeEl.textContent = code;
            pre.appendChild(codeEl);
            box.appendChild(pre);

            const btn = document.createElement("button");
            btn.className = "try-it-btn";
            btn.textContent = "Try it Yourself »";
            btn.addEventListener("click", () => onTryIt(code));
            box.appendChild(btn);

            return box;
        }

        default:
            return null;
    }
}

// ── Sidebar builder ───────────────────────────────────────────────────────────

/**
 * Builds the grouped sidebar nav.
 * Groups are derived from chapters[i].group — insertion order is preserved.
 *
 * @param {HTMLElement} sidebar
 * @param {object[]}    chapters
 * @param {function}    onSelect(idx) - called when a nav item is clicked
 * @returns {HTMLButtonElement[]} navItems - flat array indexed by chapter index
 */
function buildSidebar(sidebar, chapters, onSelect) {
    const groupOrder = [];                  // keeps insertion order
    const groupMap   = Object.create(null); // groupName → [{ch, idx}]

    chapters.forEach((ch, idx) => {
        const g = ch.group || "Other";
        if (!groupMap[g]) {
            groupMap[g] = [];
            groupOrder.push(g);
        }
        groupMap[g].push({ ch, idx });
    });

    const navItems = [];   // flat array at chapter's original index position

    groupOrder.forEach(groupName => {
        // Section label
        const label = document.createElement("p");
        label.className = "sidebar-label";
        label.textContent = groupName;
        sidebar.appendChild(label);

        // Nav buttons
        groupMap[groupName].forEach(({ ch, idx }) => {
            const btn = document.createElement("button");
            btn.className = "nav-item";
            btn.textContent = ch.title;
            btn.addEventListener("click", () => onSelect(idx));
            sidebar.appendChild(btn);
            navItems[idx] = btn;   // index matches chapters array
        });
    });

    return navItems;
}

// ── Main render function ──────────────────────────────────────────────────────

/**
 * Bootstraps the full tutorial UI.
 * @param {object[]} chapters - array imported from chapters/index.js
 * @param {object}   monaco   - the monaco-editor module
 */
export function render(chapters, monaco) {

    // Suppress Monaco clipboard cancel errors (harmless internal promise cancel)
    window.addEventListener("unhandledrejection", (e) => {
        if (e.reason?.message === "Canceled") e.preventDefault();
    });

    // ── DOM references ────────────────────────────────────────────────────────
    const sidebar      = document.getElementById("sidebar");
    const content      = document.getElementById("content");
    const tryItPanel   = document.getElementById("try-it-panel");
    const tryItClose   = document.getElementById("try-it-close");
    const tryItRun     = document.getElementById("try-it-run");
    const tryItOut     = document.getElementById("try-it-output");
    const tryItLabel   = document.getElementById("try-it-output-label");
    const monacoEl     = document.getElementById("monaco-container");
    const mobileToggle = document.getElementById("mobile-toggle");
    const backdrop     = document.getElementById("sidebar-backdrop");

    // ── Monaco editor (one instance, reused by all Try-it buttons) ────────────
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

    // ── Try-it panel ──────────────────────────────────────────────────────────
    function openTryIt(code) {
        editor.getModel().setValue(code);
        tryItOut.textContent   = "";
        tryItLabel.textContent = "";
        tryItLabel.className   = "";
        tryItPanel.classList.add("open");
        setTimeout(() => editor.focus(), 300);
    }

    function runCode() {
        const result = evalCode(editor.getValue());
        tryItLabel.textContent = result.ok ? "▶ OUTPUT" : "✗ ERROR";
        tryItLabel.className   = result.ok ? "ok" : "error";
        tryItOut.textContent   = result.text;
    }

    tryItClose.addEventListener("click", () => tryItPanel.classList.remove("open"));
    tryItRun.addEventListener("click", runCode);
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);

    // ── Chapter loading ───────────────────────────────────────────────────────
    let navItems = [];

    function loadChapter(idx) {
        const chapter = chapters[idx];

        // Highlight active sidebar button
        navItems.forEach((btn, i) => {
            if (btn) btn.classList.toggle("active", i === idx);
        });

        // Render content blocks
        content.innerHTML = "";
        chapter.content.forEach(block => {
            const el = renderBlock(block, openTryIt);
            if (el) content.appendChild(el);
        });

        // Prev / Next navigation
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

        content.scrollTop = 0;
        sidebar.classList.remove("open");
        backdrop.classList.remove("visible");
    }

    // ── Build sidebar + load first chapter ────────────────────────────────────
    navItems = buildSidebar(sidebar, chapters, loadChapter);
    loadChapter(0);

    // ── Mobile sidebar toggle ─────────────────────────────────────────────────
    mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        backdrop.classList.toggle("visible");
    });
    backdrop.addEventListener("click", () => {
        sidebar.classList.remove("open");
        backdrop.classList.remove("visible");
    });
}
