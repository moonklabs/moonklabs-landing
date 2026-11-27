import type { Metadata } from "next";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import Eyebrow from "@/components/Eyebrow";
import NumberedSection from "@/components/NumberedSection";
import SiteShell from "@/components/SiteShell";
import { companyInfo, companyStats, contactHref } from "@/app/site-config";
import { history, investment, leaders, recognitions } from "@/content/company";

export const metadata: Metadata = {
  title: "회사 소개",
  description: "뭉클랩은 당신의 업무를 위한 AI 에이전트를 만드는 팀입니다. 팀과 철학, 인증과 투자 이력을 소개합니다.",
  alternates: { canonical: "/company/" },
};

const audiences = [
  { tag: "반복 업무가 많은 실무팀", title: "조회·정리·보고는 봇에게, 판단은 사람에게", color: "#5fb3a1" },
  { tag: "멀티채널 셀러", title: "채널마다 다른 정산, 엑셀 대신 에이전트에게", color: "#e2692d" },
  { tag: "브랜드 · 커머스 운영팀", title: "사람을 늘리지 않고 놓치지 않는 운영 체계", color: "#3b74e8" },
  { tag: "에이전트를 도입하려는 기업", title: "검증된 방식 그대로, 승인 가드레일까지", color: "#d94a9a" },
] as const;

export default function CompanyPage() {
  return (
    <SiteShell>
      <header className="container-x pb-14 pt-14 md:pb-20 md:pt-24">
        <Eyebrow>Company</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
          일은 에이전트에게,
          <br />
          결정은 사람에게 맡기는 사람들
        </h1>
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-4">
          {companyStats.map((stat) => (
            <div key={stat.label} className="bg-ink p-6 md:p-8">
              <dd className="text-3xl font-semibold tracking-tight md:text-4xl">{stat.value}</dd>
              <dt className="mt-3 text-[15px] font-medium">{stat.label}</dt>
              <p className="mt-1 text-sm text-mute">{stat.note}</p>
            </div>
          ))}
        </dl>
      </header>

      <NumberedSection index="01" label="철학" en="PHILOSOPHY" id="philosophy-title">
        <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-snug tracking-tight">팔았는가보다 남았는가, 셀러의 질문에서 시작했습니다</h3>
        <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-fg/80">
          <p>빅데이터·시각화·풀스택·UI/UX·마케팅 전문가가 10년 넘게 함께 일해 온 팀입니다.</p>
          <p>
            커머스 플랫폼 통합 정산 관리 시스템 특허 위에서 장사왕이 약 9,000명의 셀러와 함께 성장하고 있고, 우리는 Sprintable로 에이전트에게 일을 맡기고
            승인하는 방식을 매일 직접 씁니다.
          </p>
        </div>
        <figure className="mt-10 rounded-3xl bg-card p-8 md:p-10">
          <blockquote className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-snug tracking-tight">
            “여러 플랫폼에 입점한 셀러일수록 <span className="text-mute">‘얼마에 팔았는가’</span>보다 ‘실제로 얼마가 남았는가’를 파악하기가 훨씬 어렵다.”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <Avatar name="윤" color="#0a0a0a" className="size-10 text-base" />
            <span>
              <span className="block font-medium">{companyInfo.ceo}</span>
              <span className="block text-sm text-mute">뭉클랩 대표</span>
            </span>
          </figcaption>
        </figure>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {audiences.map((a) => (
            <li key={a.tag} className="list-none rounded-2xl border border-line p-6">
              <span className="block size-2.5 rounded-full" style={{ background: a.color }} aria-hidden />
              <p className="mt-3 text-sm text-mute">{a.tag}</p>
              <p className="mt-2 font-medium leading-snug">{a.title}</p>
            </li>
          ))}
        </ul>
      </NumberedSection>

      {history.length > 0 ? (
        <NumberedSection index="02" label="연혁" en="HISTORY" id="history-title">
          <ol className="divide-y divide-line">
            {history.map((item) => (
              <li key={`${item.year}-${item.title}`} className="grid gap-2 py-6 first:pt-0 md:grid-cols-[8rem_1fr] md:gap-8">
                <span className="text-2xl font-semibold tracking-tight">{item.year}</span>
                <div>
                  <p className="text-lg font-medium">{item.title}</p>
                  {item.detail ? <p className="mt-1 text-mute">{item.detail}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </NumberedSection>
      ) : null}

      {leaders.length > 0 ? (
        <NumberedSection index="03" label="팀" en="FOUNDERS" id="team-title">
          <ul className="grid gap-5 md:grid-cols-2">
            {leaders.map((leader) => (
              <li key={leader.name} className="list-none rounded-3xl bg-card p-8">
                <p className="text-xs tracking-[0.12em] text-accent">{leader.role}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{leader.name}</p>
                {leader.career.length > 0 ? (
                  <ul className="mt-5 space-y-1.5 text-mute">
                    {leader.career.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </NumberedSection>
      ) : null}

      <NumberedSection index="04" label="인증 · 투자" en="RECOGNITION" id="recognition-title">
        {investment ? <h3 className="mb-8 text-2xl font-semibold tracking-tight">{investment}</h3> : null}
        <ul className="grid gap-4 sm:grid-cols-2">
          {recognitions.map((item) => (
            <li key={item.title} className="list-none rounded-2xl bg-card p-6">
              <p className="text-sm text-accent">{item.detail}</p>
              <p className="mt-2 text-lg font-medium leading-snug tracking-tight">{item.title}</p>
            </li>
          ))}
        </ul>
      </NumberedSection>

      <NumberedSection index="05" label="채용" en="CAREERS" id="careers-title">
        <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-snug tracking-tight">함께 에이전트의 시대를 만들어 갈 분을 환영합니다</h3>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/careers/" className="btn-primary">
            채용 보기
          </Link>
          <Link href={contactHref} className="btn-secondary">
            도입 문의
          </Link>
        </div>
      </NumberedSection>
      <div className="pb-20 md:pb-28" />
    </SiteShell>
  );
}
