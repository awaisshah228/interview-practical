import { useState, useRef, useEffect } from "preact/hooks";
import loader from "@monaco-editor/loader";

/** Run code and capture console.log output. Returns {ok, text}. */
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

interface Props {
    monacoLang?: string;
}

export default function MonacoEditor({ monacoLang = "javascript" }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [output, setOutput] = useState("Click Run to see the output here.");
    const [label, setLabel] = useState({ text: "", cls: "" });

    const editorRef = useRef<any>(null);
    const monacoRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Run code from current editor value
    const runCode = () => {
        if (!editorRef.current) return;
        const result = evalCode(editorRef.current.getValue());
        setLabel({
            text: result.ok ? "\u25b6 OUTPUT" : "\u2717 ERROR",
            cls: result.ok ? "ok" : "error",
        });
        setOutput(result.text);
    };

    useEffect(() => {
        const handler = async (e: Event) => {
            const code = (e as CustomEvent).detail.code as string;
            setIsOpen(true);
            setOutput("Click Run to see the output here.");
            setLabel({ text: "", cls: "" });

            // Lazy-load Monaco on first open
            if (!editorRef.current) {
                const monaco = await loader.init();
                monacoRef.current = monaco;
                editorRef.current = monaco.editor.create(containerRef.current!, {
                    value: code,
                    language: monacoLang,
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
                editorRef.current.addCommand(
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
                    runCode,
                );
            } else {
                editorRef.current.getModel().setValue(code);
            }

            setTimeout(() => editorRef.current?.focus(), 300);
        };

        window.addEventListener("try-it", handler);
        return () => window.removeEventListener("try-it", handler);
    }, []);

    return (
        <div id="try-it-panel" class={isOpen ? "open" : ""}>
            <div id="try-it-toolbar">
                <span id="try-it-title">Try it Yourself</span>
                <span id="try-it-hint">Ctrl+Enter to run</span>
                <button id="try-it-run" onClick={runCode}>
                    &#9654; Run
                </button>
                <button id="try-it-close" onClick={() => setIsOpen(false)}>
                    &#10005; Close
                </button>
            </div>
            <div id="monaco-container" ref={containerRef}></div>
            <div id="try-it-result">
                <span id="try-it-output-label" class={label.cls}>
                    {label.text}
                </span>
                <pre id="try-it-output">{output}</pre>
            </div>
        </div>
    );
}
