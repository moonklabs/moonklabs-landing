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

const stars = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 70,
  delay: (i % 7) * 0.4,
  size: i % 5 === 0 ? 2 : 1,
}));

export default function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-black text-white">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b0b2a] via-[#2b2a8a] to-[#6b5cff]" />
      {stars.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="star absolute rounded-full bg-white"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto px-6 pt-32 sm:pt-40 pb-56 sm:pb-72 text-center">
        <Reveal>
          <h2 className="section-title">
            장사는 에이전트에게,
            <br />
            결정은 당신에게.
          </h2>
          <p className="mt-5 text-lg text-white/70 leading-relaxed">
            장사왕과 Sprintable로 검증한 방식으로, 귀사의 커머스 운영에 맞는 에이전트 팀을 함께 설계합니다.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={mailHref}
              className="px-7 py-3.5 rounded-full text-[15px] font-semibold bg-white/15 backdrop-blur border border-white/30 hover:bg-white hover:text-black transition-colors"
            >
              도입 상담 메일 보내기
            </a>
            <a
              href={sellerkingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full text-[15px] font-semibold bg-white text-black hover:bg-signal transition-colors"
            >
              장사왕 시작하기 ↗
            </a>
          </div>
          <p className="mt-6 text-sm text-white/50">보통 1영업일 이내 회신드립니다 · {contactEmail}</p>
        </Reveal>
      </div>

      {/* 지평선: 거대한 원의 윗부분이 빛나는 행성처럼 보이도록 */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-[calc(100%-180px)] sm:top-[calc(100%-240px)] w-[260vw] sm:w-[180vw] aspect-square rounded-full bg-black"
        style={{ boxShadow: "0 -2px 0 rgba(255,255,255,0.9), 0 -20px 60px rgba(190,180,255,0.9), 0 -60px 160px rgba(140,120,255,0.7)" }}
      />
    </section>
  );
}
