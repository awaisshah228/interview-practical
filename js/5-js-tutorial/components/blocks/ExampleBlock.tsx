"use client";

export default function ExampleBlock({ title, code }: { title?: string; code: string | string[] }) {
    const codeStr = Array.isArray(code) ? code.join("\n") : code;

    const handleTryIt = () => {
        window.dispatchEvent(new CustomEvent("try-it", { detail: { code: codeStr } }));
    };

    return (
        <div className="example-box">
            <div className="example-label">{title || "Example"}</div>
            <pre><code>{codeStr}</code></pre>
            <button className="try-it-btn" onClick={handleTryIt}>
                Try it Yourself &raquo;
            </button>
        </div>
    );
}
