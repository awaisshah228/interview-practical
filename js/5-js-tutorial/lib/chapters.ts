/**
 * chapters.ts — Loads chapter JSON from public/chapters/ at build time.
 * JSON files live in public/ so they're NOT bundled into JS.
 *
 * To add a new language:
 *   1. Create public/chapters/<lang>/data/*.json
 *   2. Add a new entry to `chapterOrder` below
 */

import fs from "fs";
import path from "path";

// ── Types ───────────────────────────────────────────────────────────────────

export interface Block {
    type: "h1" | "h2" | "p" | "note" | "table" | "example" | "exercise" | "image";
    text?: string;
    rows?: string[][];
    title?: string;
    code?: string | string[];
    question?: string;
    options?: string[];
    answer?: number;
    src?: string;
    alt?: string;
    caption?: string;
}

export interface Chapter {
    id: string;
    title: string;
    group: string;
    content: Block[];
}

// ── Chapter ordering per language (filenames without .json) ─────────────────

const chapterOrder: Record<string, string[]> = {
    js: [
        "intro", "whereto", "output",
        "syntax", "statements", "comments",
        "variables", "var", "let", "const", "types",
        "operators", "arithmetic", "assignment", "comparisons",
        "conditionals", "js_if", "if_else", "ternary", "switch", "booleans", "logical",
        "loops_intro", "for_loop", "while_loop", "break_continue", "control_flow",
        "strings", "string_templates", "string_methods", "string_search",
        "numbers", "number_methods", "number_properties", "bitwise", "bigint",
        "functions", "function_invocation", "function_parameters", "function_returns", "function_expressions", "arrow_functions",
        "objects", "object_properties", "object_methods", "object_this", "object_display", "object_constructors",
        "scope", "code_blocks", "hoisting", "strict_mode",
        "dates", "date_formats", "date_get", "date_set",
        "arrays", "array_methods", "array_search", "array_sort", "array_iterations", "array_const",
        "sets", "set_methods",
        "maps", "map_methods",
        "iterables", "iterators", "generators",
        "math", "math_random",
        "regexp", "regexp_patterns", "regexp_methods",
        "destructuring",
        "datatypes", "typeof", "type_conversion",
        "errors", "error_handling",
        "debugging",
        "style_guide", "best_practices",
        "htmldom", "dom_elements", "dom_html", "dom_css", "dom_animations",
        "events", "event_listener", "mouse_events", "keyboard_events",
        "classes", "class_inheritance", "class_static",
        "async_intro", "callbacks", "promises", "async_await", "fetch_api",
        "modules", "modules_export", "modules_import",
        "json_intro", "json_parse", "json_stringify",
        "storage_api", "geolocation_api", "workers_api",
        "ajax_intro", "ajax_request", "ajax_response",
        "closures", "function_call_apply_bind", "iife",
        "prototypes", "object_accessors", "object_protection",
        "dom_navigation", "dom_nodes", "dom_collections",
        "window", "location", "history_window", "cookies",
        "canvas", "chartjs",
    ],
    "ai-video": [
        "ai_prompting", "styles",
        "ai_video_workflow", "ai_video_ideas", "ai_video_scripts",
        "ai_image_generation", "ai_video_tools",
        "ai_automation_intro", "automated_pipelines", "batch_processing",
        "scheduling_publishing", "api_integrations", "workflow_tools",
        "extras",
    ],
};

// ── Load chapters from filesystem ───────────────────────────────────────────

function loadChapter(lang: string, filename: string): Chapter {
    const filePath = path.join(process.cwd(), "public", "chapters", lang, "data", `${filename}.json`);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Chapter;
}

const chapterCache: Record<string, Chapter[]> = {};

export function getChapters(lang: string): Chapter[] {
    if (chapterCache[lang]) return chapterCache[lang];
    const order = chapterOrder[lang];
    if (!order) return [];
    const chapters = order.map((name) => loadChapter(lang, name));
    chapterCache[lang] = chapters;
    return chapters;
}
