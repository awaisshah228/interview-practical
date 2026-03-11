export default function NoteBlock({ text }: { text: string }) {
    return (
        <div className="note-box">
            <strong>&#128221; Note: </strong>
            <span dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    );
}
