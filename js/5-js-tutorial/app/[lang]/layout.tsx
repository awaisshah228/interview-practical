import { notFound } from "next/navigation";
import { getLanguage } from "@/lib/languages";
import { getChapters } from "@/lib/chapters";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MonacoEditorPanel from "@/components/MonacoEditor";
import TutorialShell from "@/components/TutorialShell";
import ScrollToTop from "@/components/ScrollToTop";

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const language = getLanguage(lang);
    if (!language) notFound();

    const chapters = getChapters(lang);
    const isCodeLang = language.monacoLang !== "plaintext";

    return (
        <TutorialShell>
            <Header langName={language.name} />
            <div id="sidebar-backdrop" />
            <div id="layout">
                <Sidebar chapters={chapters} lang={lang} />
                <main id="content">
                    <ScrollToTop />
                    {children}
                </main>
            </div>
            {isCodeLang && <MonacoEditorPanel monacoLang={language.monacoLang} />}
        </TutorialShell>
    );
}
