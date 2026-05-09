import React from 'react';

interface MarkdownTableProps {
  markdown: string;
}

export const MarkdownTable: React.FC<MarkdownTableProps> = ({ markdown }) => {
  if (!markdown || !markdown.trim()) {
    return <p className="text-xs text-[hsl(var(--foreground-muted))] italic">No data</p>;
  }

  const parseTable = () => {
    const lines = markdown.split('\n').filter(l => l.trim().length > 0);
    // Filter out rows that just contain "|---|---| etc"
    const dataLines = lines.filter(l => !/^[\s|:\-]+$/.test(l));

    if (dataLines.length === 0) return { head: [], body: [] };

    // Helper to parse a markdown table row separated by pipes
    const parseRow = (line: string) => {
      let trimmed = line.trim();
      // Remove leading/trailing pipes
      if (trimmed.startsWith('|')) trimmed = trimmed.substring(1);
      if (trimmed.endsWith('|')) trimmed = trimmed.substring(0, trimmed.length - 1);
      return trimmed.split('|').map(cell => cell.trim());
    };

    const head = parseRow(dataLines[0]);
    const body = dataLines.slice(1).map(line => parseRow(line));

    return { head, body };
  };

  const { head, body } = parseTable();

  if (head.length === 0) {
    return <p className="text-xs text-[hsl(var(--foreground-muted))] italic">No data</p>;
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border border-[var(--border)] bg-[hsl(var(--card))]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[400px]">
          <thead>
            <tr className="bg-[hsl(var(--muted))]/50">
              {head.map((col, idx) => (
                <th key={idx} className="text-left px-4 py-3 font-semibold border-b border-[var(--border)] text-[hsl(var(--foreground))] text-xs uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, rowIdx) => (
              <tr 
                key={rowIdx} 
                className={`transition-colors hover:bg-[hsl(var(--muted))]/60 ${rowIdx % 2 === 1 ? 'bg-[hsl(var(--muted))]/30' : ''}`}
              >
                {row.map((col, colIdx) => (
                  <td key={colIdx} className="px-4 py-3 border-b border-[var(--border)]/30 text-[hsl(var(--foreground-muted))] last:border-b-0 whitespace-pre-wrap">
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
