import Avatar from "@/components/Avatar";
import Reveal from "@/components/Reveal";

const audiences = [
  { tag: "반복 업무가 많은 실무팀", title: "조회·정리·보고는 봇에게, 판단은 사람에게", color: "#5fb3a1" },
  { tag: "멀티채널 셀러", title: "채널마다 다른 정산, 엑셀 대신 에이전트에게", color: "#e2692d" },
  { tag: "브랜드 · 커머스 운영팀", title: "사람을 늘리지 않고 놓치지 않는 운영 체계", color: "#3b74e8" },
  { tag: "에이전트를 도입하려는 기업", title: "검증된 방식 그대로, 승인 가드레일까지", color: "#d94a9a" },
] as const;

export default function StorySection() {
  return (
    <section id="story" aria-labelledby="story-title" className="container-x pb-24 md:pb-36">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <h2 id="story-title" className="display-lg">
          팔았는가보다 남았는가,
          <br />
          셀러의 질문에서 시작했습니다
        </h2>
        <div className="space-y-5 text-lg leading-relaxed">
          <p>빅데이터·시각화·풀스택·UI/UX·마케팅 전문가가 10년 넘게 함께 일해 온 팀입니다.</p>
          <p>
            커머스 플랫폼 통합 정산 관리 시스템 특허 위에서 장사왕이 약 9,000명의 셀러와 함께 성장하고 있고, 우리는 Sprintable로
            에이전트에게 일을 맡기고 승인하는 방식을 매일 직접 씁니다.
          </p>
        </div>
      </div>

      <Reveal className="mt-12 md:mt-16">
        <figure className="rounded-3xl bg-card p-8 md:p-14">
          <blockquote className="display-md max-w-4xl">
            “여러 플랫폼에 입점한 셀러일수록 <span className="text-mute">‘얼마에 팔았는가’</span>보다 ‘실제로 얼마가 남았는가’를
            파악하기가 훨씬 어렵다.”
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3">
            <Avatar name="윤" color="#0a0a0a" className="size-11 text-base" />
            <span>
              <span className="block font-medium">윤도선</span>
              <span className="block text-sm text-mute">뭉클랩 대표</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>

      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {audiences.map((a, i) => (
          <Reveal key={a.tag} delay={i * 0.06} className="h-full">
            <li className="flex h-full min-h-48 list-none flex-col rounded-3xl bg-card p-7">
              <span className="size-3 rounded-full" style={{ background: a.color }} aria-hidden />
              <p className="mt-4 text-sm text-mute">{a.tag}</p>
              <h3 className="mt-auto pt-6 text-lg font-medium leading-snug tracking-tight">{a.title}</h3>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
