import Link from "next/link";
import AgentOrbit from "@/components/AgentOrbit";
import Eyebrow from "@/components/Eyebrow";

export default function Hero() {
  return (
    <section id="top" className="container-x grid items-center gap-10 pb-16 pt-8 md:gap-12 md:pb-28 md:pt-20 lg:min-h-[44rem] lg:grid-cols-[1.05fr_1fr]">
      <div className="order-2 lg:order-1">
        <Eyebrow>Moonklabs · AI agents for work</Eyebrow>
        <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
          AI Agents for
          <br />
          Your <span className="text-accent">Work</span>
        </h1>
        <p className="mt-6 text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-snug tracking-tight text-fg/80">
          일은 에이전트에게, 결정은 사람에게
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
          뭉클랩은 당신의 업무를 위한 AI 에이전트를 만듭니다. 사무 업무는 MKbot.ai, 셀러의 반복 업무는 Beejet, 커머스 운영은 장사왕, 에이전트 팀 조율은
          Sprintable이 맡고, 사람은 승인과 결정에 집중합니다.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link href="/company/" className="btn-primary max-sm:h-12 max-sm:w-full">
            회사 소개
          </Link>
          <Link href="/products/" className="inline-flex h-12 items-center justify-center rounded-full border border-fg px-6 transition-colors hover:bg-fg hover:text-ink max-sm:w-full sm:h-11">
            제품 보기
          </Link>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <AgentOrbit />
      </div>
    </section>
  );
}
