import { notFound } from "next/navigation";
import { languages, getLanguage } from "@/lib/languages";
import { getChapters } from "@/lib/chapters";
import ChapterNav from "@/components/ChapterNav";
import ContentBlock from "@/components/blocks/ContentBlock";
import Link from "next/link";

export function generateStaticParams() {
    const params: { lang: string; id: string }[] = [];
    for (const language of languages) {
        const chapters = getChapters(language.id);
        for (const chapter of chapters) {
            params.push({ lang: language.id, id: chapter.id });
        }
    }
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const { lang, id } = await params;
    const language = getLanguage(lang);
    const chapters = getChapters(lang);
    const chapter = chapters.find((ch) => ch.id === id);
    return {
        title: chapter ? `${chapter.title} | ${language?.name} Tutorial` : "Tutorial",
    };
}

export default async function ChapterPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const { lang, id } = await params;
    const chapters = getChapters(lang);
    const index = chapters.findIndex((ch) => ch.id === id);

    if (index === -1) notFound();

    const chapter = chapters[index];

    return (
        <>
            {lang === "ai-video" && (
                <Link href={`/${lang}`} className="course-outline-back">&larr; Course Outline</Link>
            )}
            <ChapterNav chapters={chapters} currentIndex={index} lang={lang} />
            {chapter.content.map((block, i) => (
                <ContentBlock key={i} block={block} />
            ))}
            <ChapterNav chapters={chapters} currentIndex={index} lang={lang} />
        </>
    );
}
