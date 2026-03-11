import Link from "next/link";
import { notFound } from "next/navigation";
import { languages } from "@/lib/languages";

export function generateStaticParams() {
    // Only ai-video has an index page; js redirects to first chapter
    return languages
        .filter((l) => l.id === "ai-video")
        .map((l) => ({ lang: l.id }));
}

export default async function LangIndex({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    if (lang !== "ai-video") notFound();

    return (
        <div className="rm-intro">
            <h2>What You&apos;ll Learn</h2>
            <p>This course covers the full AI video creation stack, from prompting fundamentals to fully automated publishing workflows:</p>
            <ul className="rm-intro-list">
                <li><strong>AI Fundamentals</strong> — Master prompting techniques and visual styles for AI-generated content</li>
                <li><strong>Video Production</strong> — Plan workflows, generate ideas, and write scripts with AI assistance</li>
                <li><strong>Image &amp; Video Tools</strong> — Hands-on with Midjourney, DALL·E, Runway, Pika, and more</li>
                <li><strong>Automation</strong> — Build pipelines, batch process content, schedule publishing, and integrate APIs</li>
            </ul>

            <h2>Who Is This For?</h2>
            <p>Content creators, marketers, developers, and anyone looking to leverage AI for video production at scale. No coding experience required for the fundamentals — the automation sections introduce API concepts gradually.</p>

            <div className="rm-intro-cta">
                <Link href={`/${lang}/ai_prompting`} className="nav-btn">Start with AI Prompting &rarr;</Link>
            </div>
        </div>
    );
}
