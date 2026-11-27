import BrandShape from "@/components/BrandShape";
import { AGENT_SHAPES } from "@/components/agents";

const RADIUS_PERCENT = 40;

/** The eight agents circling a center mark, with the approval moment that defines how they work. */
export default function AgentOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]" role="img" aria-label="뭉클랩의 AI 에이전트 8종이 사람의 승인을 중심으로 일하는 모습">
      <p className="absolute right-0 top-0 z-10 text-right text-xs font-medium uppercase tracking-[0.12em] text-mute">
        Delegating
        <span className="mt-1.5 flex items-center justify-end gap-2 text-accent">
          <span className="size-2 rounded-full bg-accent" aria-hidden /> Human approves
        </span>
      </p>

      <div className="absolute inset-[6%] rounded-full border border-dashed border-line-strong" aria-hidden />
      <div className="absolute inset-[26%] rounded-full border border-line" aria-hidden />

      <div className="orbit-spin absolute inset-0" aria-hidden>
        {AGENT_SHAPES.map((agent, i) => {
          const angle = (i / AGENT_SHAPES.length) * Math.PI * 2 - Math.PI / 2;
          const left = 50 + RADIUS_PERCENT * Math.cos(angle);
          const top = 50 + RADIUS_PERCENT * Math.sin(angle);
          return (
            <span key={agent.name} className="absolute w-[17%]" style={{ left: `${left}%`, top: `${top}%`, translate: "-50% -50%" }}>
              <span className="orbit-counter block">
                <BrandShape color={agent.color} kind={agent.kind} icon={agent.icon} tilt={agent.tilt} className="w-full" />
              </span>
            </span>
          );
        })}
      </div>

      <div className="absolute left-1/2 top-1/2 flex size-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-fg text-center text-ink shadow-[var(--shadow-float)]">
        <span className="text-[clamp(0.8rem,1.6vw,1.1rem)] font-semibold tracking-tight">Moonklabs</span>
        <span className="mt-0.5 text-[10px] text-ink/60 md:text-xs">사람이 승인</span>
      </div>

      <p className="absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-line-strong bg-ink px-4 py-1.5 text-sm shadow-[var(--shadow-float)]">
        납기 지연 3건, 메일로 보낼까요? <span className="font-medium text-accent">네, 보내 줘</span>
      </p>
    </div>
  );
}
