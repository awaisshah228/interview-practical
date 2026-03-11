"use client";

import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
    "data-code-lang"?: string;
}

export default function TutorialShell({ children, "data-code-lang": codeLang }: Props) {
    useEffect(() => {
        const toggle = document.getElementById("mobile-toggle");
        const sidebar = document.getElementById("sidebar");
        const backdrop = document.getElementById("sidebar-backdrop");

        const onToggle = () => {
            sidebar?.classList.toggle("open");
            backdrop?.classList.toggle("visible");
        };
        const onBackdrop = () => {
            sidebar?.classList.remove("open");
            backdrop?.classList.remove("visible");
        };

        toggle?.addEventListener("click", onToggle);
        backdrop?.addEventListener("click", onBackdrop);
        return () => {
            toggle?.removeEventListener("click", onToggle);
            backdrop?.removeEventListener("click", onBackdrop);
        };
    }, []);

    return (
        <div
            data-code-lang={codeLang}
            style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", height: "100vh" }}
        >
            {children}
        </div>
    );
}
