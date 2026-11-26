import BrandShape from "@/components/BrandShape";
import Reveal from "@/components/Reveal";
import { AGENT_SHAPES } from "@/components/agents";

export default function IntroSection() {
  return (
    <section id="approach" className="container-x pb-20 md:pb-28">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <h2 className="display-lg">
          에이전트와
          <br />
          팀원처럼 일하세요
        </h2>
        <div className="space-y-5 text-lg leading-relaxed">
          <p>에이전트는 챗봇이 아닙니다. 스스로 일하고, 보고하고, 승인받아 실행합니다. 질문에 답하는 데서 멈추지 않고 조회·정리·파일 저장까지 끝냅니다.</p>
          <p>위임 → 보고 → 승인 → 실행. 되돌리기 어려운 결정은 언제나 사람에게 묻고, 승인한 뒤에만 움직입니다.</p>
        </div>
      </div>

      <Reveal className="mt-14 md:mt-20">
        <ul className="grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 md:gap-x-6">
          {AGENT_SHAPES.map((agent, i) => (
            <li key={agent.name} className={`flex flex-col items-center text-center ${i % 2 === 1 ? "md:mt-8" : ""}`}>
              <span className="float-y block w-full max-w-[7.5rem]" style={{ animationDelay: `${i * -0.6}s` }}>
                <BrandShape color={agent.color} kind={agent.kind} icon={agent.icon} tilt={agent.tilt} className="w-full" />
              </span>
              <span className="mt-4 text-sm font-medium leading-snug md:text-[15px]">{agent.name}</span>
              <span className="mt-0.5 text-xs text-mute md:text-sm">{agent.product}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
