"use client";

import { useEffect } from "react";

export default function TutorialShell({ children }: { children: React.ReactNode }) {
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

    return <>{children}</>;
}
