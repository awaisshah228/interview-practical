import type { Block } from "@/lib/chapters";
import HeadingBlock from "./HeadingBlock";
import ParagraphBlock from "./ParagraphBlock";
import NoteBlock from "./NoteBlock";
import TableBlock from "./TableBlock";
import ExampleBlock from "./ExampleBlock";
import ExerciseBlock from "./ExerciseBlock";
import ImageBlock from "./ImageBlock";

export default function ContentBlock({ block }: { block: Block }) {
    switch (block.type) {
        case "h1": return <HeadingBlock text={block.text!} level={1} />;
        case "h2": return <HeadingBlock text={block.text!} level={2} />;
        case "p": return <ParagraphBlock text={block.text!} />;
        case "note": return <NoteBlock text={block.text!} />;
        case "table": return <TableBlock rows={block.rows!} />;
        case "example": return <ExampleBlock title={block.title} code={block.code!} />;
        case "exercise": return <ExerciseBlock question={block.question!} options={block.options!} answer={block.answer!} />;
        case "image": return <ImageBlock src={block.src} alt={block.alt} caption={block.caption} />;
        default: return null;
    }
}
