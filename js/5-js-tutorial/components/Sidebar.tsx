"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Chapter } from "@/lib/chapters";

interface Props {
    chapters: Chapter[];
    lang: string;
}

export default function Sidebar({ chapters, lang }: Props) {
    const pathname = usePathname();

    // Derive active chapter from URL
    const pathParts = pathname.split("/");
    const activeId = pathParts.length >= 3 ? pathParts[2] : "__intro__";

    // Build groups preserving insertion order
    const groupOrder: string[] = [];
    const groupMap: Record<string, Chapter[]> = {};

    for (const ch of chapters) {
        const g = ch.group || "Other";
        if (!groupMap[g]) {
            groupMap[g] = [];
            groupOrder.push(g);
        }
        groupMap[g].push(ch);
    }

    const activeGroup = chapters.find((ch) => ch.id === activeId)?.group || "";

    const toggleGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.closest(".sidebar-group")?.classList.toggle("open");
    };

    return (
        <nav id="sidebar">
            {lang === "ai-video" && (
                <Link
                    href={`/${lang}`}
                    className={`nav-item course-outline-link${activeId === "__intro__" ? " active" : ""}`}
                >
                    Course Outline
                </Link>
            )}
            {groupOrder.map((groupName) => {
                const items = groupMap[groupName];
                const isActiveGroup = groupName === activeGroup;
                return (
                    <div key={groupName} className={`sidebar-group${isActiveGroup ? " open" : ""}`}>
                        <button className="sidebar-label" onClick={toggleGroup}>
                            <span>{groupName}</span>
                            <svg className="chevron" width="12" height="12" viewBox="0 0 12 12">
                                <path d="M3 4.5L6 7.5L9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className="sidebar-items">
                            {items.map((ch) => {
                                const href = `/${lang}/${ch.id}`;
                                const isActive = pathname === href;
                                return (
                                    <Link
                                        key={ch.id}
                                        href={href}
                                        className={`nav-item${isActive ? " active" : ""}`}
                                    >
                                        {ch.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </nav>
    );
}
