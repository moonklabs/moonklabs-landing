import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SiteShell from "@/components/SiteShell";
import { companyInfo, contactEmail } from "@/app/site-config";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "뭉클랩 홈페이지 문의 양식으로 수집하는 개인정보의 항목, 이용 목적, 보유 기간을 안내합니다.",
  alternates: { canonical: "/privacy/" },
};

const EFFECTIVE_DATE = "2026년 11월 27일";

const sections: readonly { readonly title: string; readonly body: readonly string[] }[] = [
  {
    title: "1. 수집하는 개인정보와 이용 목적",
    body: [
      "수집 항목: 회사명, 이름, 이메일, 연락처(선택), 관심 제품·문의 유형, 문의 내용",
      "이용 목적: 도입·제휴 문의에 대한 확인, 상담, 회신",
      "문의 양식 외에 별도의 개인정보를 수집하지 않으며, 이 홈페이지는 회원가입과 로그인 기능이 없습니다.",
    ],
  },
  {
    title: "2. 보유 및 이용 기간",
    body: ["문의 접수일로부터 1년간 보관한 뒤 지체 없이 파기합니다. 법령에 따라 보관해야 하는 경우에는 해당 기간 동안 보관합니다."],
  },
  {
    title: "3. 처리 위탁 및 국외 이전",
    body: [
      "문의 내용은 아래 사업자의 서비스를 통해 전달·보관됩니다.",
      "· Cloudflare, Inc. — 문의 접수·전달 서버(Cloudflare Workers) 및 메일 발송",
      "· Google LLC — 사내 메신저(Google Chat)와 업무용 메일(Google Workspace)",
      "위 사업자의 서버는 국외에 있을 수 있으며, 전송 항목은 위 1항의 수집 항목과 같고 전송 시점은 문의를 보내는 즉시입니다.",
    ],
  },
  {
    title: "4. 제3자 제공",
    body: ["수집한 개인정보를 정보주체의 동의 없이 제3자에게 제공하지 않습니다. 다만 법령에 근거한 요청이 있는 경우는 예외로 합니다."],
  },
  {
    title: "5. 정보주체의 권리",
    body: [
      "언제든지 개인정보의 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 아래 문의처로 연락주시면 지체 없이 조치합니다.",
      "개인정보 수집·이용에 동의하지 않을 권리가 있으나, 동의하지 않으면 문의 양식으로는 상담을 접수할 수 없습니다. 이 경우 이메일로 문의하실 수 있습니다.",
    ],
  },
  {
    title: "6. 안전성 확보 조치",
    body: ["문의 전송 구간은 HTTPS로 암호화하며, 문의 접수 서버는 허용된 출처의 요청만 받고 반복 요청을 제한합니다. 열람 권한은 문의를 처리하는 담당자로 제한합니다."],
  },
];

export default function PrivacyPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="PRIVACY" title="개인정보 처리방침" description={`시행일 ${EFFECTIVE_DATE}`} />
      <section className="container-x pb-24 md:pb-36">
        <div className="max-w-3xl space-y-10 leading-relaxed">
          <p>
            {companyInfo.legalName}(이하 “뭉클랩”)은 홈페이지 문의 양식으로 받은 개인정보를 아래와 같이 처리합니다. 장사왕, Sprintable, MKbot.ai, Beejet 등
            각 제품 사이트와 서비스의 개인정보 처리는 해당 서비스의 방침을 따릅니다.
          </p>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-medium tracking-tight">{section.title}</h2>
              <div className="mt-3 space-y-2 text-mute">
                {section.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h2 className="text-xl font-medium tracking-tight">7. 개인정보 문의처</h2>
            <p className="mt-3 text-mute">
              {companyInfo.legalName} 대표 {companyInfo.ceo} · {companyInfo.address} ·{" "}
              <a href={`mailto:${contactEmail}`} className="underline underline-offset-2">
                {contactEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
