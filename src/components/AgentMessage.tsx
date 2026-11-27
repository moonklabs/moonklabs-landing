import { AGENT_SHAPES } from "@/components/agents";
import { AGENT_LINES, type Stage } from "@/components/agent-script";

interface AgentMessageProps {
  readonly agent: number;
  readonly stage: Stage;
}

/** The caption under the orbit: which agent is on stage and what it is doing or has found. */
export default function AgentMessage({ agent, stage }: AgentMessageProps) {
  const shape = AGENT_SHAPES[agent];
  const line = AGENT_LINES[agent];
  const working = stage === "working";

  return (
    <p className="absolute -bottom-5 left-1/2 z-10 flex w-max max-w-[94%] -translate-x-1/2 items-center gap-2.5 rounded-full border border-line-strong bg-ink px-4 py-1.5 text-sm shadow-[var(--shadow-float)]">
      <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-mute">
        <span className="size-2 rounded-full" style={{ background: shape.color }} aria-hidden />
        {shape.name}
      </span>
      <span key={`${agent}-${stage}`} className="rise-in min-w-0 truncate">
        {working ? line.working : line.result}
        {working ? (
          <span className="ml-1 inline-flex gap-0.5 align-middle" aria-hidden>
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="size-1 animate-pulse rounded-full bg-mute" style={{ animationDelay: `${dot * 0.18}s` }} />
            ))}
          </span>
        ) : line.approve ? (
          <>
            {" "}
            <span className="font-medium text-accent">{line.approve}</span>
          </>
        ) : null}
      </span>
    </p>
  );
}
