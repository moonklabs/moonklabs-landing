import AgentMascot from "@/components/AgentMascot";
import Emphasis from "@/components/Emphasis";
import Reveal from "@/components/Reveal";
import { contactEmail, sellerkingUrl } from "@/app/site-config";

const mailSubject = "뭉클랩 에이전트 커머스 도입 문의";
const mailBody = [
  "안녕하세요, 에이전트 커머스 도입 상담을 원합니다.",
  "",
  "회사/브랜드명: ",
  "입점 채널: ",
  "관심 영역: 장사왕 순이익·정산 / 장사왕 광고·재고 Agent / Sprintable / 기업 맞춤 Agent 자동화",
  "현재 과제: ",
].join("\n");
const mailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

export default function CTASection() {
  return (
    <section id="contact" className="bg-cream px-4 sm:px-6 pt-24 sm:pt-32 pb-20 sm:pb-28">
      <Reveal>
        <div className="relative mx-auto max-w-5xl rounded-[40px] bg-peach px-6 pt-24 pb-16 sm:px-12 sm:pt-28 sm:pb-20 text-center">
          <AgentMascot className="absolute left-1/2 -top-14 w-28 -translate-x-1/2 sm:-top-16 sm:w-32" />
          <h2 className="section-title text-ink">
            장사는 에이전트와,
            <br />
            결정은 <Emphasis className="text-violet-800">당신</Emphasis>이
          </h2>
          <p className="mt-6 mx-auto max-w-xl text-lg text-ink/75 leading-relaxed">
            장사왕과 Sprintable로 검증한 방식으로, 귀사의 커머스 운영에 맞는 에이전트 팀을 함께 설계합니다.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={mailHref} className="px-7 py-3.5 rounded-full text-[15px] font-semibold bg-ink text-white hover:bg-zinc-800 transition-colors">
              도입 상담 메일 보내기
            </a>
            <a
              href={sellerkingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full text-[15px] font-semibold bg-white text-ink hover:bg-cream transition-colors"
            >
              장사왕 시작하기 ↗
            </a>
          </div>
          <p className="mt-6 text-sm text-ink/60">보통 1영업일 이내 회신드립니다 · {contactEmail}</p>
        </div>
      </Reveal>
    </section>
  );
}
