import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import SiteShell from "@/components/SiteShell";
import { contactEmail } from "@/app/site-config";
import { benefits, openPositions } from "@/content/company";

export const metadata: Metadata = {
  title: "채용",
  description: "에이전트에게 일을 맡기고 승인하는 방식으로 일하는 뭉클랩에서 함께할 분을 찾습니다.",
  alternates: { canonical: "/careers/" },
};

const ways = [
  { title: "에이전트와 팀원처럼", text: "Sprintable로 에이전트에게 일을 맡기고 승인하는 방식을 매일 직접 씁니다." },
  { title: "결정은 사람이", text: "되돌리기 어려운 일은 사람이 승인한 뒤에만 실행한다는 원칙을 제품과 일하는 방식에 똑같이 적용합니다." },
  { title: "셀러의 질문에서 시작", text: "‘얼마에 팔았는가’보다 ‘실제로 얼마가 남았는가’. 현장의 질문에서 제품을 시작합니다." },
] as const;

const applyHref = `mailto:${contactEmail}?subject=${encodeURIComponent("[채용 문의]")}`;

export default function CareersPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="CAREERS"
        title="함께 에이전트의 시대를 만들 분을 찾습니다"
        description="뭉클랩은 에이전트에게 일을 맡기고, 사람은 승인과 결정에 집중하는 방식으로 일합니다."
      />

      <section aria-labelledby="ways-title" className="container-x pb-20 md:pb-28">
        <h2 id="ways-title" className="display-md">
          일하는 방식
        </h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {ways.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="h-full">
              <li className="flex h-full min-h-48 list-none flex-col rounded-3xl bg-card p-8">
                <h3 className="text-xl font-medium tracking-tight">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-mute">{item.text}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="positions-title" className="container-x pb-20 md:pb-28">
        <h2 id="positions-title" className="display-md">
          채용 포지션
        </h2>
        {openPositions.length > 0 ? (
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {openPositions.map((position) => (
              <li key={position.title} className="list-none">
                <a href={position.href ?? applyHref} className="flex items-center justify-between gap-4 py-6 hover:opacity-70">
                  <span>
                    <span className="block text-lg font-medium">{position.title}</span>
                    <span className="block text-sm text-mute">{position.type}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">
            지금 공개된 포지션은 없습니다. 함께하고 싶은 분은 아래로 연락주시면 검토 후 회신드립니다.
          </p>
        )}
        {benefits.length > 0 ? (
          <ul className="mt-10 grid gap-3 text-lg md:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="list-none rounded-2xl bg-card px-6 py-4">
                {benefit}
              </li>
            ))}
          </ul>
        ) : null}
        <a href={applyHref} className="btn-primary mt-10">
          {contactEmail}로 지원·문의
        </a>
      </section>
    </SiteShell>
  );
}
