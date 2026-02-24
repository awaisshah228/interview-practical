/**
 * monaco-setup.js — Must be the FIRST import in index.js
 * Sets MonacoEnvironment before monaco-editor initialises.
 */
self.MonacoEnvironment = {
    getWorkerUrl(_moduleId, label) {
        if (label === "typescript" || label === "javascript") return "/ts.worker.js";
        return "/editor.worker.js";
    },
};
