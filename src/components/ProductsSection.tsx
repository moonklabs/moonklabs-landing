import type { ReactNode } from "react";
import Emphasis from "@/components/Emphasis";
import Reveal from "@/components/Reveal";
import { sellerkingUrl, sprintableUrl } from "@/app/site-config";

function MockFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="w-full rounded-[28px] overflow-hidden border border-white/10 bg-[#2A221C] font-mono text-xs shadow-[0_40px_120px_-40px_rgba(248,185,160,0.35)]">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.08]">
        <span className="w-2 h-2 rounded-full bg-signal" />
        <span className="text-zinc-300 tracking-widest text-[10px]">{title}</span>
        <span className="ml-auto flex gap-1">
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function MarginMock() {
  const rows = [
    { ch: "채널 A", sale: 100, margin: 22 },
    { ch: "채널 B", sale: 100, margin: 14 },
    { ch: "채널 C", sale: 100, margin: 6 },
  ];
  return (
    <MockFrame title="SELLERKING · 실질 마진">
      <div className="text-zinc-500 text-[10px] tracking-widest mb-3">같은 상품 · 같은 판매가 · 다른 정산</div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.ch}>
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>{r.ch}</span>
              <span className={r.margin < 10 ? "text-red-400" : "text-signal"}>마진 {r.margin}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden bg-white/[0.06]">
              <div className="h-full bg-gradient-to-r from-peach to-signal" style={{ width: `${r.margin * 4}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 p-4 rounded-2xl border border-peach/30 bg-peach/10 text-zinc-300 leading-relaxed font-sans text-[13px]">
        <span className="text-peach text-[10px] tracking-widest font-mono block mb-1">◆ AGENT INSIGHT</span>
        채널 C는 수수료·배송비 반영 시 마진이 가장 낮습니다. 가격 정책 검토를 제안합니다.
      </div>
    </MockFrame>
  );
}

function OpsAgentMock() {
  return (
    <MockFrame title="SELLERKING · 운영 AGENT">
      <div className="space-y-2">
        {[
          { a: "광고", t: "캠페인 B · 전환 효율 하락 3일 연속", s: "REPORT" },
          { a: "재고", t: "SKU 0412 · 7일 내 품절 예상", s: "REPORT" },
          { a: "재고", t: "SKU 1180 · 회전율 저하 · 과재고", s: "WATCH" },
          { a: "광고", t: "캠페인 A · 예산 소진 정상", s: "OK" },
        ].map((row) => (
          <div key={row.t} className="flex items-center gap-3 rounded-xl bg-white/[0.05] px-3 py-2.5">
            <span className="text-[10px] text-zinc-500 w-7 shrink-0">{row.a}</span>
            <span className="text-zinc-300 font-sans text-[13px] flex-1">{row.t}</span>
            <span
              className={`text-[9px] tracking-widest px-2 py-0.5 rounded-full border ${
                row.s === "REPORT"
                  ? "text-peach border-peach/40"
                  : row.s === "OK"
                    ? "text-signal border-signal/30"
                    : "text-zinc-400 border-white/15"
              }`}
            >
              {row.s}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <span className="text-zinc-500">제안 2건 · 승인 대기</span>
        <span className="flex gap-2 font-sans">
          <span className="px-3 py-1 rounded-full border border-white/20 text-zinc-300">보류</span>
          <span className="px-3 py-1 rounded-full bg-white text-black font-medium">승인</span>
        </span>
      </div>
    </MockFrame>
  );
}

function OrchestrationMock() {
  const agents = [
    { name: "Planner", x: 50, y: 14 },
    { name: "정산", x: 14, y: 50 },
    { name: "광고", x: 86, y: 50 },
    { name: "재고", x: 30, y: 86 },
    { name: "Reviewer", x: 70, y: 86 },
  ];
  return (
    <MockFrame title="SPRINTABLE · AGENT OS">
      <div className="relative aspect-[4/3] w-full">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {agents.map((a) => (
            <line
              key={a.name}
              x1="50"
              y1="50"
              x2={a.x}
              y2={a.y}
              stroke="rgba(248,185,160,0.6)"
              strokeWidth="0.4"
              className="flow-line"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-3 rounded-2xl bg-cream text-ink text-center font-sans">
          <div className="text-[10px] tracking-widest font-mono">HUMAN</div>
          <div className="text-sm font-bold">최종 승인</div>
        </div>
        {agents.map((a) => (
          <div
            key={a.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-full border border-peach/40 bg-[#1E1814] text-peach text-[11px] whitespace-nowrap"
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
          >
            {a.name}
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

const products = [
  {
    tag: "SELLERKING · 장사왕",
    title: "얼마에 팔았는지보다\n얼마가 남았는지",
    body:
      "플랫폼마다 수수료, 리워드, 정산 주기가 달라 같은 상품도 남는 돈이 다릅니다. 장사왕은 채널별 매출·정산 데이터를 자동으로 수집·표준화하고, 매입가·배송원가를 결합해 상품별·플랫폼별 실질 마진을 보여주는 순이익 자동화 SaaS입니다.",
    points: ["멀티채널 정산 자동 수집·표준화", "상품별·플랫폼별 실질 마진", "특허 받은 통합 정산 관리 기술"],
    href: sellerkingUrl,
    cta: "장사왕 바로가기",
    visual: <MarginMock />,
  },
  {
    tag: "SELLERKING · OPS AGENTS",
    title: "놓치면 손실이 되는 신호를\n에이전트가 먼저",
    body:
      "광고 Agent는 비효율 캠페인을, 재고 Agent는 품절·과재고·회전율 저하를 먼저 감지합니다. 셀러는 대시보드를 들여다보는 대신, 근거가 붙은 제안을 보고 승인만 하면 됩니다.",
    points: ["광고 성과·비효율 신호 감지", "품절·과재고 리스크 예측", "근거와 함께 다음 액션 제안"],
    href: sellerkingUrl,
    cta: "운영 Agent 알아보기",
    visual: <OpsAgentMock />,
  },
  {
    tag: "SPRINTABLE · AI AGENT OS",
    title: "에이전트를 하나의\n팀으로 움직이게",
    body:
      "여러 에이전트가 함께 일하면 다음 병목은 오케스트레이션입니다. Sprintable은 위임 → 보고 → 승인 → 실행 구조로 역할별 에이전트를 조율하고, 최종 승인은 언제나 사람이 쥐도록 설계된 AI Agent OS입니다.",
    points: ["역할별 에이전트 생성·조율", "위임·보고·승인·실행 워크플로우", "사람의 최종 승인 가드레일"],
    href: sprintableUrl,
    cta: "Sprintable 바로가기",
    visual: <OrchestrationMock />,
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-28 sm:py-36 px-6 bg-[#1E1814] text-cream">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <h2 className="section-title text-cream">
            커머스 운영을 맡는
            <br />
            <Emphasis className="text-peach">에이전트 동료</Emphasis>들
          </h2>
          <p className="mt-6 text-lg text-zinc-400">순이익 계산부터 운영 판단, 에이전트 팀 조율까지.</p>
        </Reveal>

        <div className="space-y-28">
          {products.map((p, i) => (
            <div key={p.tag} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="inline-block text-xs font-semibold text-peach bg-peach/15 px-3 py-1 rounded-full">{p.tag}</span>
                <h3 className="font-serif text-cream font-bold mt-5 whitespace-pre-line text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.3] tracking-[-0.03em]">
                  {p.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed mt-6 max-w-xl">{p.body}</p>
                <ul className="mt-7 space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-9 text-sm font-semibold text-ink bg-cream rounded-full px-6 py-3 hover:bg-peach transition-colors"
                >
                  {p.cta} ↗
                </a>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
                {p.visual}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
