import "./globals.css";

export const metadata = {
    title: "Code Tutorials",
    description: "Interactive tutorials with a built-in code editor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
