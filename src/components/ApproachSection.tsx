import Reveal from "@/components/Reveal";

const steps = [
  {
    no: "01",
    title: "위임",
    body: "정산 확인, 광고 점검, 재고 체크처럼 매일 반복하던 운영 업무를 역할별 에이전트에게 맡깁니다.",
    tone: "bg-[#F6F3E6]",
  },
  {
    no: "02",
    title: "보고",
    body: "에이전트가 채널 데이터를 읽고 이상 신호를 찾아, 근거와 함께 다음 액션을 정리해 보고합니다.",
    tone: "bg-[#EFE6F6]",
  },
  {
    no: "03",
    title: "승인",
    body: "돈이 움직이는 결정은 사람이 합니다. 셀러는 대시보드를 뒤지는 대신 제안을 보고 승인만 합니다.",
    tone: "bg-[#E6F6E6]",
  },
  {
    no: "04",
    title: "실행",
    body: "승인된 액션은 에이전트가 끝까지 실행하고 결과를 기록합니다. 다음 루프는 더 정확해집니다.",
    tone: "bg-[#E6E8F6]",
  },
];

export default function ApproachSection() {
  return (
    <section id="approach" className="py-28 sm:py-36 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="section-title text-black">
            우리가 커머스를
            <br />
            풀어가는 방식
          </h2>
          <p className="mt-5 text-lg text-zinc-500 leading-relaxed">
            에이전트는 챗봇이 아닙니다. 스스로 일하고, 보고하고, 승인받아 실행하는 운영의 주체입니다.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <Reveal key={step.no} delay={i * 0.08} className="h-full">
              <div className={`h-full rounded-[28px] ${step.tone} p-7 flex flex-col min-h-[280px]`}>
                <span className="text-sm font-semibold text-zinc-500">STEP {step.no}</span>
                <p className="mt-3 text-[15px] text-zinc-600 leading-relaxed">{step.body}</p>
                <h3 className="mt-auto pt-8 text-right text-5xl font-bold tracking-[-0.04em] text-black">{step.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-zinc-400">
            위임 → 보고 → 승인 → 실행. 이 루프를 Sprintable이 조율하고, 장사왕이 커머스 현장에서 돌립니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
