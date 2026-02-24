/**
 * renderer.js — Monaco Editor UI renderer (DOM only)
 *
 * Features:
 *   - Collapsible sidebar with mobile hamburger toggle + backdrop
 *   - Single editable Monaco editor (horizontal + vertical scroll)
 *   - Breadcrumb: section name + Demo X / Y counter
 *   - Toolbar: ▶ Run (eval code, capture console.log) + ↺ Reset (restore snippet)
 *   - Output panel: shows runtime result or error
 *
 * @param {{ title: string, demos: { snippet: string, output: string }[] }[]} sections
 * @param {object} monaco - the monaco-editor module
 */
export function render(sections, monaco) {
    // Monaco's clipboard service cancels a DeferredPromise on focus loss.
    // This is harmless — suppress it so it doesn't show as an unhandled rejection.
    window.addEventListener("unhandledrejection", (e) => {
        if (e.reason?.message === "Canceled") e.preventDefault();
    });

    const app       = document.getElementById("app");
    const toggle    = document.getElementById("sidebar-toggle");
    const backdrop  = document.getElementById("sidebar-backdrop");

    // ── Sidebar ──────────────────────────────────────────────────────────────
    const sidebar = document.createElement("nav");
    sidebar.id = "sidebar";

    // Mobile sidebar toggle
    function openSidebar()  { sidebar.classList.add("open");  backdrop.classList.add("visible"); }
    function closeSidebar() { sidebar.classList.remove("open"); backdrop.classList.remove("visible"); }
    toggle.addEventListener("click", () =>
        sidebar.classList.contains("open") ? closeSidebar() : openSidebar()
    );
    backdrop.addEventListener("click", closeSidebar);

    // ── Main area ────────────────────────────────────────────────────────────
    const main = document.createElement("div");
    main.id = "main";

    // Breadcrumb bar
    const breadcrumb = document.createElement("div");
    breadcrumb.id = "breadcrumb";
    const breadcrumbSection = document.createElement("span");
    breadcrumbSection.id = "breadcrumb-section";
    const breadcrumbSep = document.createElement("span");
    breadcrumbSep.className = "breadcrumb-sep";
    breadcrumbSep.textContent = "›";
    const breadcrumbDemo = document.createElement("span");
    breadcrumbDemo.id = "breadcrumb-demo";
    breadcrumb.appendChild(breadcrumbSection);
    breadcrumb.appendChild(breadcrumbSep);
    breadcrumb.appendChild(breadcrumbDemo);

    // Editor toolbar: Run + Reset buttons
    const toolbar = document.createElement("div");
    toolbar.id = "editor-toolbar";

    const runBtn = document.createElement("button");
    runBtn.id = "btn-run";
    runBtn.innerHTML = "&#9654; Run";
    runBtn.title = "Run the code (Ctrl+Enter)";

    const resetBtn = document.createElement("button");
    resetBtn.id = "btn-reset";
    resetBtn.innerHTML = "&#8635; Reset";
    resetBtn.title = "Restore the original demo snippet";

    const shortcutHint = document.createElement("span");
    shortcutHint.className = "toolbar-hint";
    shortcutHint.textContent = "Ctrl+Enter to run";

    toolbar.appendChild(runBtn);
    toolbar.appendChild(resetBtn);
    toolbar.appendChild(shortcutHint);

    // Monaco container
    const editorContainer = document.createElement("div");
    editorContainer.id = "editor-container";

    // Output panel
    const outputPanel = document.createElement("div");
    outputPanel.id = "output-panel";
    const outputLabel = document.createElement("span");
    outputLabel.className = "output-label";
    outputLabel.textContent = "EXPECTED OUTPUT";
    const outputText = document.createElement("p");
    outputText.id = "output-text";
    outputText.textContent = "Select a demo from the sidebar.";
    outputPanel.appendChild(outputLabel);
    outputPanel.appendChild(outputText);

    main.appendChild(breadcrumb);
    main.appendChild(toolbar);
    main.appendChild(editorContainer);
    main.appendChild(outputPanel);
    app.appendChild(sidebar);
    app.appendChild(main);

    // ── Monaco editor ────────────────────────────────────────────────────────
    const editor = monaco.editor.create(editorContainer, {
        value: "// Select a demo from the sidebar",
        language: "javascript",
        theme: "vs-dark",
        readOnly: false,                   // editable — user can modify snippets
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        fontSize: 13,
        fontFamily: "'Fira Code', 'Cascadia Code', monospace",
        automaticLayout: true,
        scrollbar: {
            vertical: "auto",
            horizontal: "auto",            // allow horizontal scroll for long lines
            horizontalScrollbarSize: 8,
        },
        overviewRulerLanes: 0,
        padding: { top: 12, bottom: 12 },
        wordWrap: "off",                   // off so horizontal scroll works
    });

    // ── Run logic ────────────────────────────────────────────────────────────
    // Captures console.log calls inside the executed code and shows them in
    // the output panel. Falls back to showing the return value or errors.
    function runCode() {
        const code = editor.getValue();
        const logs = [];

        // Temporarily override console.log to capture output
        const originalLog = console.log;
        console.log = (...args) => {
            logs.push(args.map(a =>
                typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
            ).join(" "));
            originalLog(...args);
        };

        try {
            // eslint-disable-next-line no-new-func
            const result = new Function(code)();
            console.log = originalLog;

            outputLabel.textContent = "▶ RUN OUTPUT";
            outputLabel.className = "output-label run";
            if (logs.length > 0) {
                outputText.textContent = logs.join("\n");
            } else if (result !== undefined) {
                outputText.textContent = String(result);
            } else {
                outputText.textContent = "✓ Ran with no output";
            }
        } catch (err) {
            console.log = originalLog;
            outputLabel.textContent = "✗ ERROR";
            outputLabel.className = "output-label error";
            outputText.textContent = err.message;
        }
    }

    runBtn.addEventListener("click", runCode);

    // Ctrl+Enter keyboard shortcut to run
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        runCode
    );

    // ── Reset logic ──────────────────────────────────────────────────────────
    // Stores the original snippet when a demo is selected, restores it on reset
    let currentSnippet = "";

    function resetCode() {
        editor.getModel().setValue(currentSnippet);
        outputLabel.textContent = "EXPECTED OUTPUT";
        outputLabel.className = "output-label";
        outputText.textContent = currentOutput;
    }

    resetBtn.addEventListener("click", resetCode);

    // ── Sidebar nav ──────────────────────────────────────────────────────────
    let activeItem   = null;
    let currentOutput = "";

    const totalDemos = sections.reduce((sum, s) => sum + s.demos.length, 0);
    let globalDemoIndex = 0;

    sections.forEach(({ title, demos }, sectionIdx) => {
        const group = document.createElement("div");
        group.className = "nav-group";

        const groupHeader = document.createElement("div");
        groupHeader.className = "nav-group-header";

        const badge = document.createElement("span");
        badge.className = "nav-group-badge";
        badge.textContent = String(sectionIdx + 1).padStart(2, "0");

        const groupTitle = document.createElement("span");
        groupTitle.className = "nav-group-title";
        groupTitle.textContent = title;

        groupHeader.appendChild(badge);
        groupHeader.appendChild(groupTitle);
        group.appendChild(groupHeader);

        demos.forEach(({ snippet, output }, demoIdx) => {
            globalDemoIndex++;
            const thisGlobalIdx = globalDemoIndex;

            const item = document.createElement("button");
            item.className = "nav-item";
            item.textContent = `${demoIdx + 1}. ${output.split("—")[0].trim()}`;

            item.addEventListener("click", () => {
                if (activeItem) activeItem.classList.remove("active");
                activeItem = item;
                item.classList.add("active");

                // Store originals for reset
                currentSnippet = snippet;
                currentOutput  = output;

                // Update breadcrumb
                breadcrumbSection.textContent = title;
                breadcrumbDemo.textContent = `Demo ${thisGlobalIdx} / ${totalDemos}`;

                // Load snippet into editor, show pre-computed expected output
                editor.getModel().setValue(snippet);
                outputLabel.textContent = "EXPECTED OUTPUT";
                outputLabel.className = "output-label";
                outputText.textContent = output;

                // Close sidebar on mobile after selection
                closeSidebar();
            });

            group.appendChild(item);
        });

        if (sectionIdx < sections.length - 1) {
            const divider = document.createElement("hr");
            divider.className = "nav-divider";
            group.appendChild(divider);
        }

        sidebar.appendChild(group);
    });

    const hint = document.createElement("p");
    hint.className = "sidebar-hint";
    hint.textContent = "Click a demo to load it";
    sidebar.appendChild(hint);

    // Auto-select first demo
    sidebar.querySelector(".nav-item").click();
}
