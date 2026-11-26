import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SellerkingLogo, SprintableLogo } from "@/components/BrandLogo";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { beejetUrl, mkbotUrl, sellerkingUrl, sprintableUrl } from "@/app/site-config";

interface Shot {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

interface ProductRow {
  readonly no: string;
  readonly category: string;
  readonly brand: ReactNode;
  readonly headline: string;
  readonly summary: string;
  readonly points: readonly { readonly title: string; readonly text: string }[];
  readonly link: { readonly label: string; readonly href: string };
  readonly interest: string;
  readonly tint: string;
  readonly shot: Shot;
}

const Wordmark = ({ children }: { readonly children: ReactNode }) => <span className="text-2xl font-semibold tracking-tight">{children}</span>;

const ROWS: readonly ProductRow[] = [
  {
    no: "01",
    category: "기업용 AI 업무 스튜디오",
    brand: <Wordmark>MKbot.ai</Wordmark>,
    headline: "PC마다 한 대씩\n일하는 업무 봇",
    summary: "파일을 읽고, 내장 브라우저로 사내 시스템을 다루고, 휴대폰으로 시키면 사무실 PC가 일합니다. 결과는 Excel·PowerPoint 파일로 남습니다.",
    points: [
      { title: "브라우저가 앱 안에 있습니다", text: "이미 로그인한 사내 시스템과 협력사 포털을 사람처럼 읽고 다룹니다. API 연동 개발 없이 시작합니다." },
      { title: "되돌리기 어려운 일은 먼저 묻습니다", text: "메일 발송이나 제출은 휴대폰 알림으로 묻고, 승인한 뒤에만 실행합니다." },
    ],
    link: { label: "MKbot.ai 자세히 보기", href: mkbotUrl },
    interest: "MKbot.ai",
    tint: "#e4f2ee",
    shot: { src: "/images/mkbot/report.png", width: 2880, height: 1800, alt: "MKbot.ai가 10월 영업 실적 보고서를 PowerPoint와 Excel 파일로 만든 화면" },
  },
  {
    no: "02",
    category: "셀러 전용 이커머스 업무 봇 · 베타 초대권 신청 중",
    brand: (
      <span className="flex items-center gap-2.5">
        <Image src="/images/beejet/beejet-mark.svg" alt="" width={28} height={28} unoptimized className="size-7" />
        <Wordmark>Beejet</Wordmark>
      </span>
    ),
    headline: "셀러의 반복 업무는\nBeejet에게",
    summary: "정산 엑셀 받기, 광고 키워드 정리, 소싱처 품절 확인. 한 줄로 시키면 마켓 화면을 직접 열어 끝까지 합니다.",
    points: [
      { title: "한 줄로 시키면 파일로 돌아옵니다", text: "쿠팡 WING에서 정산 엑셀을 받아 표로 정리하고, 내 PC 폴더에 저장합니다." },
      { title: "마켓을 바꾸기 전에 먼저 묻습니다", text: "조건, 한도, 범위, 되돌리는 법을 보여 주고 승인한 규칙 안에서만 움직입니다." },
    ],
    link: { label: "Beejet 베타 신청", href: beejetUrl },
    interest: "Beejet",
    tint: "#fbf0d2",
    shot: { src: "/images/beejet/DeskSettle.png", width: 2880, height: 1800, alt: "Beejet이 로켓그로스 정산 엑셀을 받아 표로 정리한 화면" },
  },
  {
    no: "03",
    category: "이커머스 순이익 자동화 SaaS",
    brand: <SellerkingLogo className="h-7" />,
    headline: "얼마에 팔았는지보다\n얼마가 남았는지",
    summary: "채널별 매출·정산 데이터를 자동으로 수집·표준화하고, 매입가·배송원가를 결합해 상품별·플랫폼별 실질 마진을 보여줍니다. 약 9,000명의 셀러가 사용합니다.",
    points: [
      { title: "매일 아침, 전날 순이익을 알림으로", text: "전날 매출과 순이익을 알림으로 받아 중요한 사업 지표를 빠르게 확인합니다." },
      { title: "광고·재고 Agent", text: "광고 비효율과 품절·과재고 리스크를 먼저 감지하고, 바로 승인할 수 있는 다음 액션을 제안합니다." },
    ],
    link: { label: "장사왕 자세히 보기", href: sellerkingUrl },
    interest: "장사왕",
    tint: "#fcebe1",
    shot: { src: "/images/products/sellerking-dashboard.png", width: 3040, height: 1554, alt: "장사왕 화면. 총 매출, 쇼핑몰 비용, 매입비, 예상 순이익 요약 아래로 주문별 순이익과 마진율 표가 보인다." },
  },
  {
    no: "04",
    category: "AI Agent OS",
    brand: <SprintableLogo className="h-7 text-fg" />,
    headline: "사람과 에이전트가\n한 팀으로 일합니다",
    summary: "위임 → 보고 → 승인 → 실행 구조로 역할별 에이전트를 조율하고, 최종 승인은 사람이 쥡니다.",
    points: [
      { title: "에이전트 팀을 한 보드에서", text: "백로그부터 완료까지 스토리와 담당 에이전트를 한눈에 보고 조율합니다." },
      { title: "밖에서도 휴대폰으로", text: "대화 안에서 에이전트의 요청을 확인하고 승인하며 진행 상황을 확인합니다." },
    ],
    link: { label: "Sprintable 자세히 보기", href: sprintableUrl },
    interest: "Sprintable",
    tint: "#f7e6f0",
    shot: { src: "/images/products/sprintable-board.jpg", width: 1600, height: 1000, alt: "Sprintable 보드 화면. 백로그, 개발 대기, 진행 중, 리뷰 중, 완료 열에 스토리 카드와 담당 에이전트가 표시되어 있다." },
  },
];

function Row({ row }: { readonly row: ProductRow }) {
  return (
    <article className="grid items-center gap-10 py-14 first:pt-0 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-20">
      <div>
        <p className="text-[13px] font-medium tracking-[0.04em] text-accent">
          {row.no} · {row.category}
        </p>
        <div className="mt-5 flex h-8 items-center">{row.brand}</div>
        <h3 className="mt-6 whitespace-pre-line text-[clamp(1.75rem,2.8vw,2.25rem)] font-semibold leading-tight tracking-tight">{row.headline}</h3>
        <p className="mt-5 text-lg leading-relaxed text-mute">{row.summary}</p>
        <dl className="mt-8 space-y-6">
          {row.points.map((point) => (
            <div key={point.title}>
              <dt className="font-semibold text-accent">{point.title}</dt>
              <dd className="mt-1.5 leading-relaxed text-fg/75">{point.text}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 font-medium">
          <a href={row.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 border-b border-fg pb-0.5">
            {row.link.label} <ArrowUpRight className="size-4" aria-hidden />
          </a>
          <Link href={`/contact/?interest=${encodeURIComponent(row.interest)}`} className="text-mute transition-colors hover:text-fg">
            도입 문의 →
          </Link>
        </div>
      </div>
      <Reveal>
        <div className="flex items-end overflow-hidden rounded-[2rem] px-6 pt-8 md:px-10 md:pt-12" style={{ background: row.tint }}>
          <div className="w-full overflow-hidden rounded-t-xl border border-b-0 border-black/5 bg-ink shadow-[var(--shadow-float)]">
            <Image src={row.shot.src} alt={row.shot.alt} width={row.shot.width} height={row.shot.height} unoptimized loading="lazy" className="block h-auto w-full" />
          </div>
        </div>
      </Reveal>
    </article>
  );
}

export default function ProductRows() {
  return (
    <section id="products" aria-labelledby="products-title" className="container-x py-20 md:py-28">
      <Eyebrow>Our products</Eyebrow>
      <h2 id="products-title" className="mt-5 max-w-3xl text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-tight tracking-tight">
        업무부터 커머스까지,
        <br />
        일을 맡기는 에이전트
      </h2>
      <div className="mt-14 divide-y divide-line">
        {ROWS.map((row) => (
          <Row key={row.no} row={row} />
        ))}
      </div>
      <p className="text-sm text-mute">제품 화면 시안 · 샘플 데이터. 장사왕·Sprintable은 실제 제품 화면입니다.</p>
    </section>
  );
}
