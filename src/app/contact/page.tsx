import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import SiteShell from "@/components/SiteShell";
import { contactEmail } from "@/app/site-config";

export const metadata: Metadata = {
  title: "도입·제휴 문의",
  description: "우리 회사 업무에 맞는 AI 에이전트 도입, 제휴를 문의하세요. 보통 1영업일 이내 회신드립니다.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="CONTACT" title="우리 회사에 도입 문의" description="현재 과제를 알려주시면 맞는 제품과 도입 방식을 제안드립니다. 제휴 문의도 이 양식으로 받습니다." />
      <section className="container-x pb-24 md:pb-36">
        <div className="max-w-2xl">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
          <p className="mt-5 text-sm text-mute">
            보통 1영업일 이내 회신드립니다 ·{" "}
            <a href={`mailto:${contactEmail}`} className="underline-offset-4 hover:underline">
              {contactEmail}
            </a>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
