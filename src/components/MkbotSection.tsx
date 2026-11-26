import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";
import { mkbotContactUrl, mkbotUrl } from "@/app/site-config";

const DESKTOP = { width: 2880, height: 1800 } as const;
const PHONE = { width: 780, height: 1688 } as const;

interface CropProps {
  readonly src: string;
  readonly alt: string;
  /** Which side of the desktop screen stays in view. */
  readonly side: "left" | "right";
}

/** A desktop screen shown as a window whose far side and lower part run off the card. */
function WindowCrop({ src, alt, side }: CropProps) {
  return (
    <div
      className="relative h-64 w-full overflow-hidden rounded-t-xl border border-b-0 border-line bg-ink shadow-[var(--shadow-float)] md:h-80"
    >
      <Image
        src={src}
        alt={alt}
        width={DESKTOP.width}
        height={DESKTOP.height}
        unoptimized
        loading="lazy"
        className={`absolute top-0 h-[150%] w-auto max-w-none ${side === "right" ? "right-0" : "left-0"}`}
      />
    </div>
  );
}

function PhoneCrop({ src, alt }: { readonly src: string; readonly alt: string }) {
  return (
    <div className="mx-auto h-64 w-56 overflow-hidden rounded-t-[2.25rem] border-[6px] border-b-0 border-fg bg-ink md:h-80 md:w-64">
      <Image src={src} alt={alt} width={PHONE.width} height={PHONE.height} unoptimized loading="lazy" className="block h-auto w-full" />
    </div>
  );
}

export default function MkbotSection() {
  return (
    <section id="mkbot" aria-labelledby="mkbot-title" className="container-x pb-24 md:pb-36">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm text-mute">MKbot.ai · 기업용 AI 업무 스튜디오</p>
        <h2 id="mkbot-title" className="display-md mt-3">
          시키면 끝까지 하는 업무 자동화 봇
        </h2>
        <p className="mt-4 text-lg leading-relaxed">
          MKbot.ai는 답만 하는 채팅이 아니라, PC마다 한 대씩 일하는 업무용 봇입니다. 파일을 읽고, 내장 브라우저로 사내 시스템을
          다루고, 휴대폰으로 시키면 사무실 PC가 일합니다.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
        <FeatureCard title="한 줄로 시키면 끝까지 합니다" text="봇이 할 일을 나누고, 순서대로 실행하고, 결과를 Excel·PowerPoint 파일로 남깁니다.">
          <WindowCrop
            src="/images/mkbot/report.png"
            alt="MKbot.ai가 10월 영업 실적 보고서를 PowerPoint와 Excel 파일로 만든 화면"
            side="left"
          />
        </FeatureCard>
        <FeatureCard
          delay={0.08}
          title="브라우저가 앱 안에 있습니다"
          text="이미 로그인한 사내 시스템과 협력사 포털을 사람처럼 읽고 다룹니다. API 연동 개발 없이 시작합니다."
        >
          <WindowCrop
            src="/images/mkbot/browser-automation.png"
            alt="MKbot.ai 내장 브라우저가 협력사 포털의 납기 현황 표를 읽고 있는 화면"
            side="right"
          />
        </FeatureCard>
        <FeatureCard title="휴대폰으로 시키면 PC가 일합니다" text="자리에 없어도 휴대폰에서 한 줄로 시킵니다. 휴대폰을 꺼도 사무실 PC에서 계속 진행합니다.">
          <PhoneCrop src="/images/mkbot/mobile-run.png" alt="휴대폰에서 시킨 일을 사무실 PC의 봇이 단계별로 진행하는 모바일 화면" />
        </FeatureCard>
        <FeatureCard
          delay={0.08}
          title="되돌리기 어려운 일은 먼저 묻습니다"
          text="메일 발송이나 제출처럼 되돌리기 어려운 일은 휴대폰 알림으로 묻고, 승인한 뒤에만 실행합니다."
        >
          <PhoneCrop src="/images/mkbot/mobile-approve.png" alt="봇이 찾은 납기 지연 3건을 메일로 보낼지 승인을 요청하는 모바일 화면" />
        </FeatureCard>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <a href={mkbotContactUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          우리 회사에 도입 문의
        </a>
        <a href={mkbotUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
          mkbot.ai 둘러보기 <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
      <p className="mt-5 text-center text-sm text-mute">제품 화면 시안 · 샘플 데이터</p>
    </section>
  );
}
