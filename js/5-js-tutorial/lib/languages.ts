export interface Language {
    id: string;
    name: string;
    description: string;
    monacoLang: string;
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
