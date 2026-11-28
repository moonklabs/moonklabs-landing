import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";
import { PhoneCrop, WindowCrop } from "@/components/ScreenCrops";
import { beejetUrl } from "@/app/site-config";

export default function BeejetSection() {
  return (
    <section id="beejet" aria-labelledby="beejet-title" className="container-x pb-24 md:pb-36">
      <div className="mx-auto max-w-3xl md:text-center">
        <div className="flex items-center gap-2.5 md:justify-center">
          <Image src="/images/beejet/beejet-mark.svg" alt="" width={28} height={28} unoptimized className="size-7" />
          <span className="text-xl font-semibold tracking-tight">Beejet</span>
        </div>
        <p className="mt-3 text-sm text-mute">Beejet.ai · 이커머스 업무 AI 봇 · 베타 초대권 신청 중</p>
        <h2 id="beejet-title" className="display-md mt-3">
          셀러의 반복 업무는 Beejet에게
        </h2>
        <p className="mt-4 text-lg leading-relaxed">
          정산 엑셀 받기, 광고 키워드 정리, 소싱처 품절 확인. 한 줄로 시키면 Beejet이 마켓 화면을 직접 열어 끝까지 하고, 마켓을 바꾸는 일은
          승인받은 뒤에만 합니다.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
        <FeatureCard title="한 줄로 시키면 파일로 돌아옵니다" text="쿠팡 WING에서 정산 엑셀을 받아 표로 정리하고, 내 PC 폴더에 저장합니다.">
          <WindowCrop src="/images/beejet/DeskSettle.png" alt="Beejet이 로켓그로스 정산 엑셀을 받아 표로 정리한 화면" side="left" />
        </FeatureCard>
        <FeatureCard
          delay={0.08}
          title="브라우저가 앱 안에 있습니다"
          text="마켓과 솔루션 화면을 사람처럼 열어 읽고 입력합니다. 연동 개발을 기다리지 않습니다."
        >
          <WindowCrop src="/images/beejet/DeskBrowser.png" alt="Beejet 내장 브라우저로 마켓 화면을 여는 모습" side="right" />
        </FeatureCard>
        <FeatureCard title="광고 키워드도 정리해 둡니다" text="주문 없이 돈만 쓰는 키워드를 찾아 제외 후보로 정리합니다.">
          <WindowCrop src="/images/beejet/DeskAds.png" alt="Beejet이 광고 제외 키워드를 정리한 화면" side="left" />
        </FeatureCard>
        <FeatureCard
          delay={0.08}
          title="마켓을 바꾸기 전에 먼저 묻습니다"
          text="조건, 한도, 범위, 되돌리는 법을 한 번에 보여 주고 승인한 규칙 안에서만 움직입니다."
        >
          <PhoneCrop src="/images/beejet/MobApprove.png" alt="마켓을 바꾸는 일의 규칙과 한도를 보여 주고 승인을 요청하는 화면" />
        </FeatureCard>
      </div>

      <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-3">
        <a href={beejetUrl} target="_blank" rel="noopener noreferrer" className="btn-primary max-sm:h-12">
          Beejet 베타 신청 <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
      <p className="mt-5 text-sm text-mute md:text-center">제품 화면 시안 · 상품과 숫자는 예시입니다</p>
    </section>
  );
}
