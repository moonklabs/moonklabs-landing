import type { ReactNode } from "react";
import AgentMascot from "@/components/AgentMascot";
import Emphasis from "@/components/Emphasis";
import Reveal from "@/components/Reveal";

const panel = "rounded-2xl bg-white/80 p-3.5 text-[13px] text-ink space-y-2";

const steps: { no: string; title: string; body: string; tone: string; ui: ReactNode }[] = [
  {
    no: "01",
    title: "위임",
    body: "정산 확인, 광고 점검, 재고 체크처럼 매일 반복하던 운영 업무를 역할별 에이전트에게 맡깁니다.",
    tone: "bg-[#F3EBD8]",
    ui: (
      <div className={panel}>
        {["정산 확인", "광고 점검", "재고 체크"].map((task) => (
          <div key={task} className="flex items-center gap-2">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-ink text-[9px] text-white">✓</span>
            {task}
            <span className="ml-auto text-zinc-400">매일</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    no: "02",
    title: "보고",
    body: "에이전트가 채널 데이터를 읽고 이상 신호를 찾아, 근거와 함께 다음 액션을 정리해 보고합니다.",
    tone: "bg-[#F8DCCB]",
    ui: (
      <div className={panel}>
        <span className="text-[11px] font-semibold text-violet-700">광고 Agent · 보고</span>
        <p className="font-semibold leading-snug">캠페인 B 전환율이 3일 연속 떨어졌어요</p>
        <p className="text-zinc-500">근거 2건 첨부 · 예산 재분배안 포함</p>
      </div>
    ),
  },
  {
    no: "03",
    title: "승인",
    body: "돈이 움직이는 결정은 사람이 합니다. 사장님은 대시보드를 뒤지는 대신 제안을 보고 승인만 하면 됩니다.",
    tone: "bg-[#E6DDF5]",
    ui: (
      <div className={panel}>
        <p className="font-semibold leading-snug">예산 30%를 캠페인 A로 옮길까요?</p>
        <div className="flex gap-2 pt-1">
          <span className="flex-1 rounded-full border border-black/15 bg-white py-1.5 text-center font-semibold">보류</span>
          <span className="flex-1 rounded-full bg-ink py-1.5 text-center font-semibold text-white">승인</span>
        </div>
      </div>
    ),
  },
  {
    no: "04",
    title: "실행",
    body: "승인된 액션은 에이전트가 끝까지 실행하고 결과를 기록합니다. 다음 루프는 더 정확해집니다.",
    tone: "bg-[#DCEBD3]",
    ui: (
      <div className={panel}>
        <div className="flex items-center gap-2 font-semibold">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-signal text-[9px] text-ink">✓</span>
          예산 재분배 완료
        </div>
        <p className="text-zinc-500">결과가 기록됐어요. 다음 제안이 더 정확해집니다.</p>
      </div>
    ),
  },
];

export default function ApproachSection() {
  return (
    <section id="approach" className="py-28 sm:py-36 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <AgentMascot className="mx-auto mb-6 w-16" />
          <h2 className="section-title text-ink">
            맡기고, 보고받고,
            <br />
            <Emphasis>승인</Emphasis>하면 실행됩니다
          </h2>
          <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
            에이전트는 챗봇이 아닙니다. 스스로 일하고, 보고하고, 승인받아 실행하는 운영의 동료입니다.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <Reveal key={step.no} delay={i * 0.08} className="h-full">
              <div className={`h-full rounded-[28px] ${step.tone} p-7 flex flex-col min-h-[380px]`}>
                <span className="text-sm font-semibold text-zinc-600">STEP {step.no}</span>
                <h3 className="mt-2 font-serif text-4xl font-bold tracking-[-0.03em] text-ink">{step.title}</h3>
                <p className="mt-3 text-[15px] text-zinc-700 leading-relaxed">{step.body}</p>
                <div className="mt-auto pt-6">{step.ui}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-zinc-500">
            위임 → 보고 → 승인 → 실행. 이 루프를 Sprintable이 조율하고, 장사왕이 커머스 현장에서 돌립니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
