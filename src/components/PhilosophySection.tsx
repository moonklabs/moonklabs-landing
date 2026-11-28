import Reveal from "@/components/Reveal";

const pillars = [
  { no: "01", title: "위임", en: "DELEGATION", text: "답만 하는 챗봇이 아닙니다. 한 줄로 시키면 조회·정리·파일 저장까지 끝까지 해냅니다." },
  { no: "02", title: "승인", en: "APPROVAL", text: "되돌리기 어려운 결정은 언제나 사람에게 묻고, 승인한 뒤에만 실행합니다." },
  { no: "03", title: "책임", en: "ACCOUNTABILITY", text: "권한 제어와 승인 가드레일, 실행 로그로 에이전트가 한 일을 남기고 확인합니다." },
] as const;

export default function PhilosophySection() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="bg-[#0b1220] py-20 text-white md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_2.2fr]">
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#8fb4ff]">Our philosophy</p>
          <h2 id="philosophy-title" className="mt-5 text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-tight tracking-tight">
            일을 맡길 수 있는
            <br />
            AI 에이전트
          </h2>
        </div>
        <ul className="grid md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.no} delay={i * 0.08} className="h-full">
              <li className="h-full list-none border-t border-white/15 py-8 md:border-l md:border-t-0 md:px-8 md:py-0">
                <p className="text-sm text-[#8fb4ff]">{pillar.no}</p>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{pillar.title}</h3>
                <p className="mt-1 text-xs tracking-[0.12em] text-white/50">{pillar.en}</p>
                <p className="mt-6 leading-relaxed text-white/75">{pillar.text}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
