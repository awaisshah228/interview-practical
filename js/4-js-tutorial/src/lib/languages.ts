/**
 * languages.ts — Language registry.
 *
 * To add a new tutorial language:
 *   1. Create src/chapters/<id>/data/*.json  (chapter files)
 *   2. Add an import map in src/lib/chapters.ts
 *   3. Add an entry here
 */

export interface Language {
    id: string;          // URL slug: "js", "python"
    name: string;        // Display name: "JavaScript", "Python"
    description: string; // Short tagline for the landing page
    monacoLang: string;  // Monaco editor language id
}

export const languages: Language[] = [
    {
        id: "js",
        name: "JavaScript",
        description: "The language of the web — learn variables, functions, objects, and more",
        monacoLang: "javascript",
    },
    {
        id: "ai-video",
        name: "AI Video & Automation",
        description: "AI video creation, prompting, image generation, and automated video pipelines",
        monacoLang: "plaintext",
    },
];

export function getLanguage(id: string): Language | undefined {
    return languages.find((l) => l.id === id);
}
