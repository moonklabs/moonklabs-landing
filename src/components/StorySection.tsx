import Reveal from "@/components/Reveal";

const audiences = [
  {
    tag: "멀티채널 셀러",
    title: "채널마다 다른 정산,\n엑셀 대신 에이전트에게",
    bg: "from-[#2a1a4a] via-[#1a1030] to-black",
  },
  {
    tag: "브랜드 · 커머스 운영팀",
    title: "사람을 늘리지 않고\n놓치지 않는 운영 체계",
    bg: "from-[#16351a] via-[#0f2412] to-black",
  },
  {
    tag: "에이전트를 도입하려는 기업",
    title: "검증된 방식 그대로,\n승인 가드레일까지",
    bg: "from-[#1a2440] via-[#101830] to-black",
  },
];

export default function StorySection() {
  return (
    <section id="story" className="py-28 sm:py-36 px-6 bg-[#F7F7F8]">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-4xl mx-auto">
          <h2 className="section-title text-black">
            팔았는가보다 남았는가,
            <br />
            셀러의 진짜 질문에서 시작했습니다
          </h2>
          <p className="mt-6 text-lg text-zinc-500 leading-relaxed">
            빅데이터·시각화·풀스택·UI/UX·마케팅 전문가가 10년 넘게 함께 일해 온 팀입니다.
            <br className="hidden md:block" /> 커머스 플랫폼 통합 정산 관리 시스템 특허 위에서 장사왕이 약 9,000명의 셀러와 함께
            성장하고 있고,
            <br className="hidden md:block" /> 우리는 Sprintable로 에이전트에게 일을 맡기고 승인하는 방식을 매일 직접 씁니다.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <figure className="rounded-[28px] bg-white px-8 py-12 sm:px-16 sm:py-16 text-center shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            <blockquote className="text-[clamp(1.35rem,2.6vw,2rem)] font-bold leading-snug tracking-[-0.03em] text-black">
              “여러 플랫폼에 입점한 셀러일수록 <span className="text-zinc-400">‘얼마에 팔았는가’</span>보다{" "}
              <span className="text-violet-600">‘실제로 얼마가 남았는가’</span>를 파악하기가 훨씬 어렵다.”
            </blockquote>
            <figcaption className="mt-6 text-sm text-zinc-500">윤도선 · 뭉클랩 대표</figcaption>
          </figure>
        </Reveal>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {audiences.map((a, i) => (
            <Reveal key={a.tag} delay={i * 0.08} className="h-full">
              <div className={`relative h-full min-h-[300px] rounded-[28px] overflow-hidden bg-gradient-to-br ${a.bg} p-7 flex flex-col`}>
                <div aria-hidden className="absolute inset-0 grid-bg opacity-50" />
                <span className="relative self-start text-xs font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full">{a.tag}</span>
                <h3 className="relative mt-auto text-white text-2xl font-bold leading-snug tracking-[-0.03em] whitespace-pre-line">{a.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
