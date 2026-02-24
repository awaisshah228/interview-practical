/**
 * index.js — Entry point
 * Import order matters: monaco-setup must run before monaco-editor loads.
 */
import "./monaco-setup.js";
import * as monaco from "monaco-editor";
import "../styles.css";
import { chapters } from "./chapters/index.js";
import { render } from "./renderer.js";

render(chapters, monaco);
