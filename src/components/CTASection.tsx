import { contactEmail } from "@/app/site-config";

const mailSubject = "뭉클랩 AI 에이전트 도입 문의";
const mailInterests = ["MKbot.ai", "장사왕 순이익·정산", "장사왕 광고·재고 Agent", "Sprintable", "기업 맞춤 Agent 자동화"] as const;
const mailBody = [
  "안녕하세요, AI 에이전트 도입 상담을 원합니다.",
  "",
  "회사/브랜드명: ",
  "업무 또는 입점 채널: ",
  `관심 영역: ${mailInterests.join(" / ")}`,
  "현재 과제: ",
].join("\n");
const mailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

export default function CTASection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="container-x overflow-hidden pt-4 text-center">
      <h2 id="contact-title" className="display-md">
        일은 에이전트에게, 결정은 당신에게.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed">
        MKbot.ai, 장사왕, Sprintable로 검증한 방식으로 귀사의 업무에 맞는 에이전트를 함께 설계합니다.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href={mailHref} className="btn-primary">
          도입 상담 메일 보내기
        </a>
      </div>
      <p className="mt-5 text-sm text-mute">보통 1영업일 이내 회신드립니다 · {contactEmail}</p>

      {/* A large outlined mark that rises from the footer line. */}
      <svg aria-hidden viewBox="0 0 1000 500" className="mx-auto mt-16 block w-full max-w-5xl text-line-strong md:mt-20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 500 A498 498 0 0 1 998 500" />
        <path d="M330 500 V330 L500 440 L670 330 V500" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </section>
  );
}
