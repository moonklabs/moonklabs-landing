import type { ReactNode } from "react";

// posts.ts의 markdown-lite 서브셋(##, ###, -, >, **bold**, `code`)만 렌더링한다.
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-semibold" style={{ color: "#1C1B17" }}>
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <code
          key={key++}
          className="text-[0.9em] px-1.5 py-0.5 rounded-md"
          style={{ background: "rgba(28,27,23,0.06)" }}
        >
          {token.slice(1, -1)}
        </code>,
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export default function MarkdownLite({ content }: { content: string }) {
  const blocks = content
    .trim()
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="font-display text-xl font-bold pt-2"
              style={{ letterSpacing: "-0.01em", color: "#1C1B17" }}
            >
              {renderInline(block.slice(4))}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="font-display text-2xl font-bold pt-4"
              style={{ letterSpacing: "-0.01em", color: "#1C1B17" }}
            >
              {renderInline(block.slice(3))}
            </h2>
          );
        }
        if (block.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="font-display text-lg leading-relaxed pl-5 py-1"
              style={{ borderLeft: "3px solid rgba(124,58,237,0.5)", color: "#3F3D38" }}
            >
              {renderInline(block.replace(/^> /gm, "").replace(/\n/g, " "))}
            </blockquote>
          );
        }
        const lines = block.split("\n");
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="space-y-2.5">
              {lines.map((l, j) => (
                <li key={j} className="flex items-start gap-3 text-[15px] leading-relaxed text-zinc-600">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                  <span>{renderInline(l.slice(2))}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-[15px] leading-8 text-zinc-600">
            {renderInline(block.replace(/\n/g, " "))}
          </p>
        );
      })}
    </div>
  );
}
