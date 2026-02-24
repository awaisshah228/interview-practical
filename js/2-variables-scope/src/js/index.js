/**
 * index.js — Entry point
 *
 * Wires together the two concerns of this project:
 *
 *   runner.js   — pure demo logic: runs all examples and logs to console
 *   renderer.js — Monaco UI: sidebar nav + single editor + output panel
 *
 * Separation of concerns:
 *   ┌─────────────┐     sections data      ┌──────────────┐
 *   │  runner.js  │ ─────────────────────► │ renderer.js  │
 *   │  (no DOM)   │                        │  (DOM only)  │
 *   └─────────────┘                        └──────────────┘
 *         ▲                                       ▲
 *    demo modules                           monaco-editor
 *  (var/let/const/scope)
 *
 * Import order matters:
 *   1. monaco-setup.js  — sets MonacoEnvironment BEFORE monaco initialises
 *   2. monaco-editor    — reads MonacoEnvironment to locate worker scripts
 *   3. styles.css       — injected via style-loader at runtime
 *   4. runner / renderer — application logic
 */

import "./monaco-setup.js";       // 1. must be first — worker env setup
import * as monaco from "monaco-editor"; // 2. monaco reads env on load
import "../styles.css";            // 3. injected as <style> by style-loader

import { getSections } from "./runner.js";   // runs demos + logs to console
import { render } from "./renderer.js";      // builds Monaco UI

// Pass demo data and monaco instance into the renderer
render(getSections(), monaco);
