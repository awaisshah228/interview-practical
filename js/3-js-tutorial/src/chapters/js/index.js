/**
 * chapters/js/index.js — JavaScript tutorial chapter list
 *
 * Each JSON file in ./data/ is one chapter.
 * Order here = order in the sidebar.
 *
 * JSON schema for every chapter:
 *   {
 *     "id":      string,        — unique identifier
 *     "title":   string,        — sidebar label
 *     "group":   string,        — sidebar section header
 *     "content": Block[]
 *   }
 *
 * Block types:
 *   { "type": "h1"|"h2"|"p",  "text": string }
 *   { "type": "note",          "text": string }
 *   { "type": "table",         "rows": string[][] }   // rows[0] = header
 *   { "type": "example",       "title": string, "code": string | string[] }
 *     — code can be a flat string or an array of lines (joined with \n by renderer)
 */

// ── JS Tutorial ───────────────────────────────────────────────────────────────
import intro      from "./data/intro.json";
import whereto    from "./data/whereto.json";
import output     from "./data/output.json";
import syntax     from "./data/syntax.json";
import statements from "./data/statements.json";
import comments   from "./data/comments.json";

// ── JS Variables ──────────────────────────────────────────────────────────────
import variables    from "./data/variables.json";
import varChapter   from "./data/var.json";
import letChapter   from "./data/let.json";
import constChapter from "./data/const.json";

// ── JS Data Types ─────────────────────────────────────────────────────────────
import datatypes from "./data/datatypes.json";
import operators from "./data/operators.json";

// ── JS Control Flow ───────────────────────────────────────────────────────────
import ifElse    from "./data/if_else.json";
import switchCh  from "./data/switch.json";
import forLoop   from "./data/for_loop.json";
import whileLoop from "./data/while_loop.json";

// ── JS Functions ──────────────────────────────────────────────────────────────
import functions       from "./data/functions.json";
import arrowFunctions  from "./data/arrow_functions.json";

// ── JS Objects & Arrays ───────────────────────────────────────────────────────
import objects from "./data/objects.json";
import strings from "./data/strings.json";
import numbers from "./data/numbers.json";
import arrays  from "./data/arrays.json";

// ── JS Scope ──────────────────────────────────────────────────────────────────
import scope    from "./data/scope.json";
import hoisting from "./data/hoisting.json";

export const chapters = [
    // JS Tutorial
    intro, whereto, output, syntax, statements, comments,
    // JS Variables
    variables, varChapter, letChapter, constChapter,
    // JS Data Types
    datatypes, operators,
    // JS Control Flow
    ifElse, switchCh, forLoop, whileLoop,
    // JS Functions
    functions, arrowFunctions,
    // JS Objects & Arrays
    objects, strings, numbers, arrays,
    // JS Scope
    scope, hoisting,
];
