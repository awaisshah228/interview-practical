export default function TableBlock({ rows }: { rows: string[][] }) {
    const [header, ...body] = rows;
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>{header.map((cell, i) => <th key={i}>{cell}</th>)}</tr>
                </thead>
                <tbody>
                    {body.map((row, ri) => (
                        <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
