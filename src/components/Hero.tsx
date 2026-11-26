import { ArrowUpRight, Sparkles } from "lucide-react";
import HeroAppMock from "@/components/HeroAppMock";
import { mkbotUrl } from "@/app/site-config";

export default function Hero() {
  return (
    <section id="top" className="container-x pb-20 pt-14 text-center md:pb-28 md:pt-24">
      <a
        href={mkbotUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2.5 pr-1.5 text-[15px] transition-colors hover:bg-card"
      >
        <span>
          <strong className="font-semibold">MKbot.ai를 소개합니다.</strong> 브라우저가 내장된 업무 자동화 봇
        </span>
        <span className="flex size-6 items-center justify-center rounded-full bg-pill">
          <ArrowUpRight className="size-3.5" aria-hidden />
        </span>
      </a>

      <h1 className="display-xl mx-auto mt-8 max-w-4xl">
        당신의 업무를 위한{" "}
        <span className="whitespace-nowrap">
          <span className="mr-[0.12em] inline-flex size-[0.92em] translate-y-[0.1em] items-center justify-center rounded-full bg-fg text-ink">
            <Sparkles className="size-[55%]" strokeWidth={2.4} aria-hidden />
          </span>
          AI 에이전트
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mute">
        시키면 에이전트가 끝까지 실행하고, 결정은 사람이 승인합니다. 사무 업무는 MKbot.ai, 커머스 운영은 장사왕, 에이전트 팀
        조율은 Sprintable이 맡습니다.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href="#contact" className="btn-primary">
          도입 상담하기
        </a>
        <a href="#mkbot" className="btn-secondary">
          MKbot.ai 살펴보기
        </a>
      </div>

      <figure className="mx-auto mt-14 max-w-5xl md:mt-16">
        <HeroAppMock />
        <figcaption className="mt-4 text-sm text-mute">MKbot.ai 앱 화면 구성을 옮긴 예시 · 샘플 데이터</figcaption>
      </figure>
    </section>
  );
}
