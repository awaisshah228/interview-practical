/**
 * chapters/index.js — Exports all tutorial chapters in order
 * Add new chapters here to automatically include them in the sidebar.
 */
import variables from "./variables.js";
import varChapter from "./var.js";
import letChapter from "./let.js";
import constChapter from "./const.js";
import scope from "./scope.js";
import hoisting from "./hoisting.js";

export const chapters = [
    variables,
    varChapter,
    letChapter,
    constChapter,
    scope,
    hoisting,
];
