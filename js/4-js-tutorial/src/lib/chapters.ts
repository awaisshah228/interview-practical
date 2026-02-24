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

// ── JS chapters ─────────────────────────────────────────────────────────────

// Group 1: JS Tutorial
import intro from "../chapters/js/data/intro.json";
import whereto from "../chapters/js/data/whereto.json";
import output from "../chapters/js/data/output.json";

// Group 2: JS Syntax
import syntax from "../chapters/js/data/syntax.json";
import statements from "../chapters/js/data/statements.json";
import comments from "../chapters/js/data/comments.json";

// Group 3: JS Variables
import variables from "../chapters/js/data/variables.json";
import varChapter from "../chapters/js/data/var.json";
import letChapter from "../chapters/js/data/let.json";
import constChapter from "../chapters/js/data/const.json";
import types from "../chapters/js/data/types.json";

// Group 4: JS Operators
import operators from "../chapters/js/data/operators.json";
import arithmetic from "../chapters/js/data/arithmetic.json";
import assignment from "../chapters/js/data/assignment.json";
import comparisons from "../chapters/js/data/comparisons.json";

// Group 5: JS Conditions
import conditionals from "../chapters/js/data/conditionals.json";
import jsIf from "../chapters/js/data/js_if.json";
import ifElse from "../chapters/js/data/if_else.json";
import ternary from "../chapters/js/data/ternary.json";
import switchCh from "../chapters/js/data/switch.json";
import booleans from "../chapters/js/data/booleans.json";
import logical from "../chapters/js/data/logical.json";

// Group 6: JS Loops
import loopsIntro from "../chapters/js/data/loops_intro.json";
import forLoop from "../chapters/js/data/for_loop.json";
import whileLoop from "../chapters/js/data/while_loop.json";
import breakContinue from "../chapters/js/data/break_continue.json";
import controlFlow from "../chapters/js/data/control_flow.json";

// Group 7: JS Strings
import strings from "../chapters/js/data/strings.json";
import stringTemplates from "../chapters/js/data/string_templates.json";
import stringMethods from "../chapters/js/data/string_methods.json";
import stringSearch from "../chapters/js/data/string_search.json";

// Group 8: JS Numbers
import numbers from "../chapters/js/data/numbers.json";
import numberMethods from "../chapters/js/data/number_methods.json";
import numberProperties from "../chapters/js/data/number_properties.json";
import bitwise from "../chapters/js/data/bitwise.json";
import bigint from "../chapters/js/data/bigint.json";

// Group 9: JS Functions
import functions from "../chapters/js/data/functions.json";
import functionInvocation from "../chapters/js/data/function_invocation.json";
import functionParameters from "../chapters/js/data/function_parameters.json";
import functionReturns from "../chapters/js/data/function_returns.json";
import functionExpressions from "../chapters/js/data/function_expressions.json";
import arrowFunctions from "../chapters/js/data/arrow_functions.json";

// Group 10: JS Objects
import objects from "../chapters/js/data/objects.json";
import objectProperties from "../chapters/js/data/object_properties.json";
import objectMethods from "../chapters/js/data/object_methods.json";
import objectThis from "../chapters/js/data/object_this.json";
import objectDisplay from "../chapters/js/data/object_display.json";
import objectConstructors from "../chapters/js/data/object_constructors.json";

// Group 11: JS Scope
import scope from "../chapters/js/data/scope.json";
import codeBlocks from "../chapters/js/data/code_blocks.json";
import hoisting from "../chapters/js/data/hoisting.json";
import strictMode from "../chapters/js/data/strict_mode.json";

// Group 12: JS Dates
import dates from "../chapters/js/data/dates.json";
import dateFormats from "../chapters/js/data/date_formats.json";
import dateGet from "../chapters/js/data/date_get.json";
import dateSet from "../chapters/js/data/date_set.json";

// Group 13: JS Arrays
import arrays from "../chapters/js/data/arrays.json";
import arrayMethods from "../chapters/js/data/array_methods.json";
import arraySearch from "../chapters/js/data/array_search.json";
import arraySort from "../chapters/js/data/array_sort.json";
import arrayIterations from "../chapters/js/data/array_iterations.json";
import arrayConst from "../chapters/js/data/array_const.json";

// Group 14: JS Sets
import sets from "../chapters/js/data/sets.json";
import setMethods from "../chapters/js/data/set_methods.json";

// Group 15: JS Maps
import maps from "../chapters/js/data/maps.json";
import mapMethods from "../chapters/js/data/map_methods.json";

// Group 16: JS Iterations
import iterables from "../chapters/js/data/iterables.json";
import iterators from "../chapters/js/data/iterators.json";
import generators from "../chapters/js/data/generators.json";

// Group 17: JS Math
import math from "../chapters/js/data/math.json";
import mathRandom from "../chapters/js/data/math_random.json";

// Group 18: JS RegExp
import regexp from "../chapters/js/data/regexp.json";
import regexpPatterns from "../chapters/js/data/regexp_patterns.json";
import regexpMethods from "../chapters/js/data/regexp_methods.json";

// Group 19: JS Destructuring
import destructuring from "../chapters/js/data/destructuring.json";

// Group 20: JS Data Types
import datatypes from "../chapters/js/data/datatypes.json";
import typeofCh from "../chapters/js/data/typeof.json";
import typeConversion from "../chapters/js/data/type_conversion.json";

// Group 21: JS Errors
import errors from "../chapters/js/data/errors.json";
import errorHandling from "../chapters/js/data/error_handling.json";

// Group 22: JS Debugging
import debugging from "../chapters/js/data/debugging.json";

// Group 23: JS Conventions
import styleGuide from "../chapters/js/data/style_guide.json";
import bestPractices from "../chapters/js/data/best_practices.json";

// Group 24: JS HTML DOM
import htmldom from "../chapters/js/data/htmldom.json";
import domElements from "../chapters/js/data/dom_elements.json";
import domHtml from "../chapters/js/data/dom_html.json";
import domCss from "../chapters/js/data/dom_css.json";
import domAnimations from "../chapters/js/data/dom_animations.json";

// Group 25: JS Events
import events from "../chapters/js/data/events.json";
import eventListener from "../chapters/js/data/event_listener.json";
import mouseEvents from "../chapters/js/data/mouse_events.json";
import keyboardEvents from "../chapters/js/data/keyboard_events.json";

// Group 26: JS Classes
import classes from "../chapters/js/data/classes.json";
import classInheritance from "../chapters/js/data/class_inheritance.json";
import classStatic from "../chapters/js/data/class_static.json";

// Group 27: JS Async
import asyncIntro from "../chapters/js/data/async_intro.json";
import callbacks from "../chapters/js/data/callbacks.json";
import promises from "../chapters/js/data/promises.json";
import asyncAwait from "../chapters/js/data/async_await.json";
import fetchApi from "../chapters/js/data/fetch_api.json";

// Group 28: JS Modules
import modules from "../chapters/js/data/modules.json";
import modulesExport from "../chapters/js/data/modules_export.json";
import modulesImport from "../chapters/js/data/modules_import.json";

// Group 29: JS JSON
import jsonIntro from "../chapters/js/data/json_intro.json";
import jsonParse from "../chapters/js/data/json_parse.json";
import jsonStringify from "../chapters/js/data/json_stringify.json";

// Group 30: JS Web APIs
import storageApi from "../chapters/js/data/storage_api.json";
import geolocationApi from "../chapters/js/data/geolocation_api.json";
import workersApi from "../chapters/js/data/workers_api.json";

// Group 31: JS AJAX
import ajaxIntro from "../chapters/js/data/ajax_intro.json";
import ajaxRequest from "../chapters/js/data/ajax_request.json";
import ajaxResponse from "../chapters/js/data/ajax_response.json";

// Group 32: JS Advanced Functions
import closures from "../chapters/js/data/closures.json";
import functionCallApplyBind from "../chapters/js/data/function_call_apply_bind.json";
import iife from "../chapters/js/data/iife.json";

// Group 33: JS Advanced Objects
import prototypes from "../chapters/js/data/prototypes.json";
import objectAccessors from "../chapters/js/data/object_accessors.json";
import objectProtection from "../chapters/js/data/object_protection.json";

// Group 34: JS DOM Navigation
import domNavigation from "../chapters/js/data/dom_navigation.json";
import domNodes from "../chapters/js/data/dom_nodes.json";
import domCollections from "../chapters/js/data/dom_collections.json";

// Group 35: JS Window
import windowCh from "../chapters/js/data/window.json";
import locationCh from "../chapters/js/data/location.json";
import historyWindow from "../chapters/js/data/history_window.json";
import cookies from "../chapters/js/data/cookies.json";

// Group 36: JS Graphics
import canvas from "../chapters/js/data/canvas.json";
import chartjs from "../chapters/js/data/chartjs.json";

// ── AI Video chapters ───────────────────────────────────────────────────────

// AI Fundamentals
import aiPrompting from "../chapters/ai-video/data/ai_prompting.json";
import aiStyles from "../chapters/ai-video/data/styles.json";

// AI Video Production
import aiVideoWorkflow from "../chapters/ai-video/data/ai_video_workflow.json";
import aiVideoIdeas from "../chapters/ai-video/data/ai_video_ideas.json";
import aiVideoScripts from "../chapters/ai-video/data/ai_video_scripts.json";

// AI Image & Video Tools
import aiImageGeneration from "../chapters/ai-video/data/ai_image_generation.json";
import aiVideoTools from "../chapters/ai-video/data/ai_video_tools.json";

// AI Automation (NEW)
import aiAutomationIntro from "../chapters/ai-video/data/ai_automation_intro.json";
import automatedPipelines from "../chapters/ai-video/data/automated_pipelines.json";
import batchProcessing from "../chapters/ai-video/data/batch_processing.json";
import schedulingPublishing from "../chapters/ai-video/data/scheduling_publishing.json";
import apiIntegrations from "../chapters/ai-video/data/api_integrations.json";
import workflowTools from "../chapters/ai-video/data/workflow_tools.json";

// Extras
import aiExtras from "../chapters/ai-video/data/extras.json";

// ── Chapter map (lang → ordered chapters) ───────────────────────────────────

const chapterMap: Record<string, Chapter[]> = {
    js: [
        // JS Tutorial
        intro, whereto, output,
        // JS Syntax
        syntax, statements, comments,
        // JS Variables
        variables, varChapter, letChapter, constChapter, types,
        // JS Operators
        operators, arithmetic, assignment, comparisons,
        // JS Conditions
        conditionals, jsIf, ifElse, ternary, switchCh, booleans, logical,
        // JS Loops
        loopsIntro, forLoop, whileLoop, breakContinue, controlFlow,
        // JS Strings
        strings, stringTemplates, stringMethods, stringSearch,
        // JS Numbers
        numbers, numberMethods, numberProperties, bitwise, bigint,
        // JS Functions
        functions, functionInvocation, functionParameters, functionReturns, functionExpressions, arrowFunctions,
        // JS Objects
        objects, objectProperties, objectMethods, objectThis, objectDisplay, objectConstructors,
        // JS Scope
        scope, codeBlocks, hoisting, strictMode,
        // JS Dates
        dates, dateFormats, dateGet, dateSet,
        // JS Arrays
        arrays, arrayMethods, arraySearch, arraySort, arrayIterations, arrayConst,
        // JS Sets
        sets, setMethods,
        // JS Maps
        maps, mapMethods,
        // JS Iterations
        iterables, iterators, generators,
        // JS Math
        math, mathRandom,
        // JS RegExp
        regexp, regexpPatterns, regexpMethods,
        // JS Destructuring
        destructuring,
        // JS Data Types
        datatypes, typeofCh, typeConversion,
        // JS Errors
        errors, errorHandling,
        // JS Debugging
        debugging,
        // JS Conventions
        styleGuide, bestPractices,
        // JS HTML DOM
        htmldom, domElements, domHtml, domCss, domAnimations,
        // JS Events
        events, eventListener, mouseEvents, keyboardEvents,
        // JS Classes
        classes, classInheritance, classStatic,
        // JS Async
        asyncIntro, callbacks, promises, asyncAwait, fetchApi,
        // JS Modules
        modules, modulesExport, modulesImport,
        // JS JSON
        jsonIntro, jsonParse, jsonStringify,
        // JS Web APIs
        storageApi, geolocationApi, workersApi,
        // JS AJAX
        ajaxIntro, ajaxRequest, ajaxResponse,
        // JS Advanced Functions
        closures, functionCallApplyBind, iife,
        // JS Advanced Objects
        prototypes, objectAccessors, objectProtection,
        // JS DOM Navigation
        domNavigation, domNodes, domCollections,
        // JS Window
        windowCh, locationCh, historyWindow, cookies,
        // JS Graphics
        canvas, chartjs,
    ] as Chapter[],
    "ai-video": [
        // AI Fundamentals
        aiPrompting, aiStyles,
        // AI Video Production
        aiVideoWorkflow, aiVideoIdeas, aiVideoScripts,
        // AI Image & Video Tools
        aiImageGeneration, aiVideoTools,
        // AI Automation
        aiAutomationIntro, automatedPipelines, batchProcessing,
        schedulingPublishing, apiIntegrations, workflowTools,
        // Extras
        aiExtras,
    ] as Chapter[],
};

export function getChapters(lang: string): Chapter[] {
    return chapterMap[lang] ?? [];
}
