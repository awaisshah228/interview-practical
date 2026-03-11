import Link from "next/link";
import type { Chapter } from "@/lib/chapters";

interface Props {
    chapters: Chapter[];
    currentIndex: number;
    lang: string;
}

export default function ChapterNav({ chapters, currentIndex, lang }: Props) {
    const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

    return (
        <div className="chapter-nav">
            {prev && <Link href={`/${lang}/${prev.id}`} className="nav-btn prev-btn">&#10094; {prev.title}</Link>}
            {next && <Link href={`/${lang}/${next.id}`} className="nav-btn next-btn">{next.title} &#10095;</Link>}
        </div>
    );
}
