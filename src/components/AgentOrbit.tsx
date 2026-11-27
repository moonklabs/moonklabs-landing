"use client";

import { useEffect, useRef, useState } from "react";
import BrandShape from "@/components/BrandShape";
import AgentMessage from "@/components/AgentMessage";
import { AGENT_SHAPES } from "@/components/agents";
import { scriptAt, type Stage } from "@/components/agent-script";
import { drawOrbitFrame, type OrbitState } from "@/components/orbit-scene";

/**
 * Moonklabs as a living particle core, with eight agents taking work from it and
 * reporting back. Canvas draws the core and the data streams; the agent shapes are
 * DOM nodes moved by the same frame loop so both stay in sync.
 */
export default function AgentOrbit() {
  // Which agent is on stage. Matches the static (reduced-motion) frame until the loop starts.
  const [onStage, setOnStage] = useState<{ agent: number; stage: Stage }>({ agent: 0, stage: "result" });
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const agentRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const agentLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!box || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state: OrbitState = { size: 0, tiltX: 0, tiltY: 0, targetX: 0, targetY: 0 };
    let raf = 0;
    let visible = true;
    let revealed = false;
    let dprCap = Math.min(window.devicePixelRatio || 1, 2);
    let lastNow = 0;
    let slow = 0;
    let stageKey = "";
    const start = performance.now();

    const resize = () => {
      const size = box.clientWidth;
      state.size = size;
      canvas.width = Math.round(size * dprCap);
      canvas.height = Math.round(size * dprCap);
      ctx.setTransform(dprCap, 0, 0, dprCap, 0, 0);
    };

    // On slow machines, a sustained run of long frames halves the canvas resolution once.
    const watchFrameRate = (now: number) => {
      const delta = now - lastNow;
      lastNow = now;
      if (delta > 200) return;
      slow = delta > 30 ? slow + 1 : Math.max(0, slow - 1);
      if (slow > 45 && dprCap > 1) {
        dprCap = 1;
        slow = 0;
        resize();
      }
    };

    const frame = (now: number) => {
      watchFrameRate(now);
      const time = reduced ? 3 : (now - start) / 1000;
      state.tiltX += (state.targetX - state.tiltX) * 0.05;
      state.tiltY += (state.targetY - state.tiltY) * 0.05;
      const point = scriptAt(time);
      const key = `${point.agent}-${point.stage}`;
      if (key !== stageKey) {
        stageKey = key;
        setOnStage({ agent: point.agent, stage: point.stage });
      }
      const placed = drawOrbitFrame(ctx, state, time);
      placed.forEach((spot, i) => {
        const el = agentRefs.current[i];
        if (el) el.style.transform = `translate(${spot.x}px, ${spot.y}px) translate(-50%, -50%) scale(${spot.scale})`;
      });
      if (!revealed) {
        // Agents sit at 0,0 until the first frame places them; reveal only once they are in position.
        revealed = true;
        if (agentLayerRef.current) agentLayerRef.current.style.opacity = "1";
        canvas.style.opacity = "1";
      }
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = box.getBoundingClientRect();
      state.targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.7;
      state.targetX = ((event.clientY - rect.top) / rect.height - 0.5) * -0.5;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced) frame(performance.now());
    });
    resizeObserver.observe(box);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(box);

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div ref={boxRef} className="relative mx-auto aspect-square w-full max-w-[34rem]" role="img" aria-label="뭉클랩의 AI 에이전트 8종이 사람의 승인을 받아 일하는 모습">
      <p className="absolute right-0 top-0 z-10 text-right text-xs font-medium uppercase tracking-[0.12em] text-mute">
        Delegating
        <span className="mt-1.5 flex items-center justify-end gap-2 text-accent">
          <span className="size-2 rounded-full bg-accent" aria-hidden /> Human approves
        </span>
      </p>

      <div
        className="absolute left-1/2 top-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(31,111,209,0.2) 0%, rgba(31,111,209,0.06) 40%, rgba(31,111,209,0) 68%)" }}
        aria-hidden
      />

      <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-0 transition-opacity duration-700" aria-hidden />

      <div ref={agentLayerRef} className="absolute inset-0 opacity-0 transition-opacity duration-700" aria-hidden>
        {AGENT_SHAPES.map((agent, i) => (
          <span
            key={agent.name}
            ref={(el) => {
              agentRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 w-[14%] will-change-transform"
          >
            <BrandShape color={agent.color} kind={agent.kind} icon={agent.icon} tilt={agent.tilt} className="w-full shadow-[var(--shadow-float)]" />
          </span>
        ))}
      </div>

      <AgentMessage agent={onStage.agent} stage={onStage.stage} />
    </div>
  );
}
