import AgentMascot from "@/components/AgentMascot";
import Emphasis from "@/components/Emphasis";
import Reveal from "@/components/Reveal";

const audiences = [
  {
    tag: "멀티채널 셀러",
    title: "채널마다 다른 정산,\n엑셀 대신 에이전트에게",
    bg: "bg-[#F8DCCB]",
  },
  {
    tag: "브랜드 · 커머스 운영팀",
    title: "사람을 늘리지 않고\n놓치지 않는 운영 체계",
    bg: "bg-[#DCEBD3]",
  },
  {
    tag: "에이전트를 도입하려는 기업",
    title: "검증된 방식 그대로,\n승인 가드레일까지",
    bg: "bg-[#E6DDF5]",
  },
];

export default function StorySection() {
  return (
    <section id="story" className="py-28 sm:py-36 px-6 bg-[#F3EBD8]">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-4xl mx-auto">
          <h2 className="section-title text-ink">
            팔았는가보다 <Emphasis>남았는가</Emphasis>,
            <br />
            사장님의 진짜 질문에서 시작했습니다
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <article className="relative mx-auto max-w-3xl rounded-[32px] bg-cream px-7 py-12 sm:px-14 sm:py-16 shadow-[0_30px_60px_-40px_rgba(60,40,10,0.35)]">
            <AgentMascot className="absolute -top-9 right-8 w-[4.5rem] sm:right-14" />
            <p className="text-sm font-semibold text-violet-700">대표의 편지</p>
            <div className="mt-6 space-y-5 text-[17px] leading-[1.9] text-zinc-800">
              <p className="font-serif text-[clamp(1.35rem,2.4vw,1.75rem)] font-bold leading-[1.6] tracking-[-0.02em] text-ink">
                여러 플랫폼에 입점한 사장님일수록 ‘얼마에 팔았는가’보다 ‘실제로 얼마가 남았는가’를 파악하기가 훨씬 어렵습니다.
              </p>
              <p>
                그래서 채널마다 다른 정산을 한곳에 모으는 일부터 시작했습니다. 빅데이터·시각화·풀스택·UI/UX·마케팅 전문가가 10년 넘게
                함께 일해 온 팀이고, 그 기술은 통합 정산 관리 시스템 특허 위에서 장사왕이 되어 지금 약 9,000명의 셀러와 함께하고
                있습니다.
              </p>
              <p>
                이제는 그 위에서 에이전트가 일하는 커머스를 만들고 있습니다. 에이전트가 먼저 살피고 보고하면, 사장님은 승인만 하면
                됩니다. 우리는 Sprintable로 에이전트에게 일을 맡기고 승인하는 방식을 매일 직접 씁니다.
              </p>
              <p>돈이 움직이는 결정만큼은, 언제나 사람의 몫으로 남겨 두겠습니다.</p>
            </div>
            <div className="mt-10 flex items-end gap-4">
              <span className="signature text-5xl leading-none text-ink">윤도선</span>
              <span className="pb-1 text-sm text-zinc-500">뭉클랩 대표</span>
            </div>
          </article>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {audiences.map((a, i) => (
            <Reveal key={a.tag} delay={i * 0.08} className="h-full">
              <div className={`h-full min-h-[280px] rounded-[28px] ${a.bg} p-7 flex flex-col`}>
                <span className="self-start text-xs font-semibold text-ink/70 bg-white/70 px-3 py-1 rounded-full">{a.tag}</span>
                <h3 className="mt-auto font-serif text-ink text-2xl font-bold leading-snug tracking-[-0.03em] whitespace-pre-line">{a.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
