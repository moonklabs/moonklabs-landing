export default function AgentMascot({ className, still }: { className?: string; still?: boolean }) {
  return (
    <svg viewBox="0 0 124 124" fill="none" aria-hidden className={`${still ? "" : "mascot"} ${className ?? ""}`}>
      <g stroke="#1A1713" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 22V38" />
        <circle cx="60" cy="16" r="6" fill="#A3E635" />
        <path
          d="M60 108C20 82 8 58 18 40C28 24 50 24 60 42C70 24 92 24 102 40C112 58 100 82 60 108Z"
          fill="#F8B9A0"
        />
        <path d="M22 68C11 71 8 80 12 88" />
        <circle cx="12" cy="90" r="5" fill="#F8B9A0" />
        <g className="mascot-arm">
          <path d="M98 68C113 66 116 56 113 46" />
          <circle cx="113" cy="42" r="5" fill="#F8B9A0" />
        </g>
        <path d="M51 70C55 77 65 77 69 70" />
      </g>
      <ellipse className="mascot-eye" cx="46" cy="58" rx="4" ry="5.5" fill="#1A1713" />
      <ellipse className="mascot-eye" cx="74" cy="58" rx="4" ry="5.5" fill="#1A1713" />
      <circle cx="37" cy="68" r="5" fill="#F28B82" opacity="0.55" />
      <circle cx="83" cy="68" r="5" fill="#F28B82" opacity="0.55" />
    </svg>
  );
}
