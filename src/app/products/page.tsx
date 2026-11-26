import type { Metadata } from "next";
import MkbotSection from "@/components/MkbotSection";
import BeejetSection from "@/components/BeejetSection";
import PageHeader from "@/components/PageHeader";
import ProductsSection from "@/components/ProductsSection";
import FilmSection from "@/components/FilmSection";
import JobsSection from "@/components/JobsSection";
import SiteShell from "@/components/SiteShell";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "제품",
  description: "MKbot.ai, Beejet, 장사왕, Sprintable. 업무 자동화부터 커머스 운영, 에이전트 팀 조율까지 뭉클랩의 AI 에이전트 제품을 소개합니다.",
  alternates: { canonical: "/products/" },
};

export default function ProductsPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="PRODUCTS"
        title="일을 맡길 수 있는 에이전트 제품"
        description="사무 업무는 MKbot.ai, 셀러의 반복 업무는 Beejet, 커머스 운영은 장사왕, 에이전트 팀 조율은 Sprintable이 맡습니다. 어느 제품이든 최종 결정은 사람이 승인합니다."
      />
      <FilmSection />
      <MkbotSection />
      <BeejetSection />
      <ProductsSection />
      <JobsSection />
      <CTASection />
    </SiteShell>
  );
}
