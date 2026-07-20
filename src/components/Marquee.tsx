export default function Marquee() {
  const items = [
    "LLM Systems",
    "Agentic Orchestration",
    "RAG Pipelines",
    "MCP Tooling",
    "Next.js",
    "TypeScript",
    "Rust",
    "Python",
    "Vector Search",
    "Observability",
    "Eval Harness",
    "Fine-tuning",
  ];

  const repeated = [...items, ...items];

  return (
    <div
      className="py-5 overflow-hidden"
      style={{ borderBottom: "1px solid rgba(28,27,23,0.08)" }}
      aria-label="뭉클랩 기술 스택"
    >
      <div className="marquee-inner">
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-zinc-400 text-sm font-medium tracking-wide whitespace-nowrap px-7">
              {item}
            </span>
            <span className="text-zinc-300 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
