export default function HeadingBlock({ text, level }: { text: string; level: 1 | 2 }) {
    return level === 1 ? <h1>{text}</h1> : <h2>{text}</h2>;
}
