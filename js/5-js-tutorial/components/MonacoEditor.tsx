"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";

function evalCode(code: string) {
    const logs: string[] = [];
    const orig = console.log;
    console.log = (...args: unknown[]) => {
        logs.push(
            args
                .map((a) =>
                    typeof a === "object" ? JSON.stringify(a, null, 2) : String(a),
                )
                .join(" "),
        );
        orig(...args);
    };
    try {
        const ret = new Function(code)();
        console.log = orig;
        if (logs.length) return { ok: true, text: logs.join("\n") };
        if (ret !== undefined) return { ok: true, text: String(ret) };
        return { ok: true, text: "\u2713 Ran with no output" };
    } catch (e: any) {
        console.log = orig;
        return { ok: false, text: e.message };
    }
}

export default function MonacoEditorPanel({ monacoLang = "javascript" }: { monacoLang?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("Click Run to see the output here.");
    const [label, setLabel] = useState({ text: "", cls: "" });
    const editorRef = useRef<any>(null);

    const runCode = useCallback(() => {
        const val = editorRef.current?.getValue() || code;
        const result = evalCode(val);
        setLabel({
            text: result.ok ? "\u25b6 OUTPUT" : "\u2717 ERROR",
            cls: result.ok ? "ok" : "error",
        });
        setOutput(result.text);
    }, [code]);

    const handleEditorMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            runCode();
        });
    };

    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            setCode(detail.code);
            setIsOpen(true);
            setOutput("Click Run to see the output here.");
            setLabel({ text: "", cls: "" });
        };
        window.addEventListener("try-it", handler);
        return () => window.removeEventListener("try-it", handler);
    }, []);

    return (
        <div id="try-it-panel" className={isOpen ? "open" : ""}>
            <div id="try-it-toolbar">
                <span id="try-it-title">Try it Yourself</span>
                <span id="try-it-hint">Ctrl+Enter to run</span>
                <button id="try-it-run" onClick={runCode}>&#9654; Run</button>
                <button id="try-it-close" onClick={() => setIsOpen(false)}>&#10005; Close</button>
            </div>
            <div id="monaco-container">
                {isOpen && (
                    <Editor
                        height="100%"
                        language={monacoLang}
                        theme="vs-dark"
                        value={code}
                        onChange={(val) => setCode(val || "")}
                        onMount={handleEditorMount}
                        options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            fontSize: 13,
                            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                            lineNumbers: "on",
                            padding: { top: 10, bottom: 10 },
                            scrollbar: { vertical: "auto", horizontal: "auto" },
                        }}
                    />
                )}
            </div>
            <div id="try-it-result">
                <span id="try-it-output-label" className={label.cls}>{label.text}</span>
                <pre id="try-it-output">{output}</pre>
            </div>
        </div>
    );
}
