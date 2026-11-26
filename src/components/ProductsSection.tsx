import Image from "next/image";
import { SellerkingLogo, SprintableLogo } from "@/components/BrandLogo";
import FeatureCard from "@/components/FeatureCard";
import { sellerkingUrl, sprintableUrl } from "@/app/site-config";

interface Shot {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

const SHOTS = {
  sellerkingDashboard: {
    src: "/images/products/sellerking-dashboard.png",
    width: 3040,
    height: 1554,
    alt: "장사왕 화면. 총 매출, 쇼핑몰 비용, 매입비, 예상 순이익 요약 아래로 주문별 순이익과 마진율 표가 보인다.",
  },
  sellerkingDailyReport: {
    src: "/images/products/sellerking-daily-report.png",
    width: 1080,
    height: 748,
    alt: "장사왕 알림톡 리포트. 전날 매출과 순이익, 스마트스토어와 쿠팡 마켓플레이스별 매출·순이익이 정리되어 있다.",
  },
  sprintableBoard: {
    src: "/images/products/sprintable-board.jpg",
    width: 1600,
    height: 1000,
    alt: "Sprintable 보드 화면. 백로그, 개발 대기, 진행 중, 리뷰 중, 완료 열에 스토리 카드와 담당 에이전트가 표시되어 있다.",
  },
  sprintableMobile: {
    src: "/images/products/sprintable-mobile-approval.jpg",
    width: 560,
    height: 1212,
    alt: "Sprintable 모바일 화면. 대화 안에서 에이전트의 요청을 확인하고 승인하는 모습이다.",
  },
} as const satisfies Record<string, Shot>;

function ShotImage({ shot, className }: { readonly shot: Shot; readonly className: string }) {
  return <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} unoptimized loading="lazy" className={className} />;
}

export default function ProductsSection() {
  return (
    <section id="products" aria-labelledby="products-title" className="container-x pb-24 md:pb-36">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-6">
          <a href={sellerkingUrl} target="_blank" rel="noopener noreferrer" aria-label="장사왕 바로가기" className="transition-opacity hover:opacity-70">
            <SellerkingLogo className="h-7" />
          </a>
          <span className="h-5 w-px bg-line-strong" aria-hidden />
          <a href={sprintableUrl} target="_blank" rel="noopener noreferrer" aria-label="Sprintable 바로가기" className="transition-opacity hover:opacity-70">
            <SprintableLogo className="h-7 text-lg" />
          </a>
        </div>
        <h2 id="products-title" className="display-md mt-6">
          커머스 운영과 에이전트 팀까지
        </h2>
        <p className="mt-4 text-lg leading-relaxed">순이익 계산부터 운영 판단, 에이전트 팀 조율까지. 뭉클랩이 직접 만들고 운영하는 제품입니다.</p>
      </div>

      <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
        <FeatureCard
          eyebrow={<SellerkingLogo />}
          title="얼마에 팔았는지보다 얼마가 남았는지"
          text="채널별 매출·정산 데이터를 자동으로 수집·표준화하고, 매입가·배송원가를 결합해 상품별·플랫폼별 실질 마진을 보여줍니다."
        >
          <div className="h-64 w-full overflow-hidden rounded-t-xl md:h-80">
            <ShotImage shot={SHOTS.sellerkingDashboard} className="block h-full w-full object-cover object-left-top" />
          </div>
        </FeatureCard>
        <FeatureCard
          delay={0.08}
          eyebrow={<SellerkingLogo />}
          title="매일 아침, 전날 순이익을 알림으로"
          text="매일 아침 전날 매출과 순이익 알림을 받아, 중요한 사업 지표를 빠르게 확인하고 대응할 수 있습니다."
        >
          <div className="h-64 w-full overflow-hidden rounded-t-xl md:h-80">
            <ShotImage shot={SHOTS.sellerkingDailyReport} className="block h-full w-full object-cover object-top" />
          </div>
        </FeatureCard>
        <FeatureCard
          className="md:col-span-2"
          eyebrow={
            <>
              <SprintableLogo className="h-6 text-fg" />
              <span>AI Agent OS</span>
            </>
          }
          title="사람과 에이전트가 한 팀으로 일합니다"
          text="위임 → 보고 → 승인 → 실행 구조로 역할별 에이전트를 조율합니다. 밖에서도 휴대폰으로 일을 맡기고, 요청을 승인하고, 진행 상황을 확인합니다."
        >
          <div className="relative mx-auto w-full max-w-4xl">
            <div className="overflow-hidden rounded-t-xl border border-b-0 border-line bg-ink shadow-[var(--shadow-float)]">
              <ShotImage shot={SHOTS.sprintableBoard} className="block h-auto w-full" />
            </div>
            <div className="absolute -bottom-px right-3 w-20 overflow-hidden rounded-t-[1.1rem] border-[3px] sm:rounded-t-[1.5rem] sm:border-[5px] border-b-0 border-fg bg-ink shadow-[var(--shadow-float)] sm:right-10 sm:w-40 md:w-52">
              <ShotImage shot={SHOTS.sprintableMobile} className="block h-auto w-full" />
            </div>
          </div>
        </FeatureCard>
      </div>

      <p className="mt-8 text-center text-sm text-mute">장사왕·Sprintable의 실제 제품 화면입니다. 화면 속 수치는 데모 데이터입니다.</p>
    </section>
  );
}
