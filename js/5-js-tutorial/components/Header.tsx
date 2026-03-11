import Link from "next/link";

export default function Header({ langName }: { langName?: string }) {
    return (
        <header>
            <button id="mobile-toggle" aria-label="Toggle sidebar">&#9776;</button>
            {langName ? (
                <>
                    <Link href="/" className="logo-link">&#9664;</Link>
                    <span className="logo">{langName}<span>Tutorial</span></span>
                </>
            ) : (
                <span className="logo">Code<span>Tutorials</span></span>
            )}
        </header>
    );
}
