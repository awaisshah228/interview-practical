/**
 * chapters.ts — Loads all chapter JSON and exports them per language.
 * Runs only at build time (Astro server-side). None of this ships to the browser.
 *
 * To add a new language:
 *   1. Create src/chapters/<lang>/data/*.json
 *   2. Import them below and add a new entry to `chapterMap`
 */

// ── Types ───────────────────────────────────────────────────────────────────

export interface Block {
    type: "h1" | "h2" | "p" | "note" | "table" | "example" | "exercise";
    text?: string;
    rows?: string[][];
    title?: string;
    code?: string | string[];
    question?: string;
    options?: string[];
    answer?: number;
}

export interface Chapter {
    id: string;
    title: string;
    group: string;
    content: Block[];
}

// ── JS chapters ─────────────────────────────────────────────────────────────

import intro from "../chapters/js/data/intro.json";
import whereto from "../chapters/js/data/whereto.json";
import output from "../chapters/js/data/output.json";
import syntax from "../chapters/js/data/syntax.json";
import statements from "../chapters/js/data/statements.json";
import comments from "../chapters/js/data/comments.json";
import variables from "../chapters/js/data/variables.json";
import varChapter from "../chapters/js/data/var.json";
import letChapter from "../chapters/js/data/let.json";
import constChapter from "../chapters/js/data/const.json";
import datatypes from "../chapters/js/data/datatypes.json";
import operators from "../chapters/js/data/operators.json";
import ifElse from "../chapters/js/data/if_else.json";
import switchCh from "../chapters/js/data/switch.json";
import forLoop from "../chapters/js/data/for_loop.json";
import whileLoop from "../chapters/js/data/while_loop.json";
import functions from "../chapters/js/data/functions.json";
import arrowFunctions from "../chapters/js/data/arrow_functions.json";
import objects from "../chapters/js/data/objects.json";
import strings from "../chapters/js/data/strings.json";
import numbers from "../chapters/js/data/numbers.json";
import arrays from "../chapters/js/data/arrays.json";
import scope from "../chapters/js/data/scope.json";
import hoisting from "../chapters/js/data/hoisting.json";

// ── Chapter map (lang → ordered chapters) ───────────────────────────────────

const chapterMap: Record<string, Chapter[]> = {
    js: [
        intro, whereto, output, syntax, statements, comments,
        variables, varChapter, letChapter, constChapter,
        datatypes, operators,
        ifElse, switchCh, forLoop, whileLoop,
        functions, arrowFunctions,
        objects, strings, numbers, arrays,
        scope, hoisting,
    ] as Chapter[],
    // python: [ ... ] as Chapter[],
};

export function getChapters(lang: string): Chapter[] {
    return chapterMap[lang] ?? [];
}
