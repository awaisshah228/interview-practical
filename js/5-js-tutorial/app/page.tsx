import Link from "next/link";
import { languages } from "@/lib/languages";
import { getChapters } from "@/lib/chapters";

export default function LandingPage() {
    return (
        <div className="landing-body">
            <header>
                <span className="logo">Code<span>Tutorials</span></span>
            </header>
            <main className="landing">
                <h1 className="landing-title">Choose a Tutorial</h1>
                <p className="landing-subtitle">Interactive tutorials with a built-in code editor</p>
                <div className="lang-grid">
                    {languages.map((lang) => {
                        const chapters = getChapters(lang.id);
                        const firstId = chapters[0]?.id ?? "";
                        const hasRoadmap = lang.id === "ai-video";
                        const href = hasRoadmap ? `/${lang.id}` : `/${lang.id}/${firstId}`;
                        return (
                            <Link key={lang.id} href={href} className="lang-card">
                                <h2 className="lang-card-title">{lang.name}</h2>
                                <p className="lang-card-desc">{lang.description}</p>
                                <span className="lang-card-meta">{chapters.length} chapters</span>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
