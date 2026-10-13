"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type FeedItem = {
  agent: string;
  text: string;
  meta: string;
  tone: "done" | "report" | "approve";
};

const feed: FeedItem[] = [
  { agent: "정산 Agent", text: "3개 채널 정산 데이터 수집·표준화 완료", meta: "상품별 실질 마진 업데이트", tone: "done" },
  { agent: "광고 Agent", text: "캠페인 B 전환 효율 하락 감지", meta: "예산 재분배안 작성 → 보고", tone: "report" },
  { agent: "재고 Agent", text: "인기 SKU 품절 위험 신호 감지", meta: "발주 수량 제안 → 보고", tone: "report" },
  { agent: "셀러", text: "예산 재분배안 승인", meta: "광고 Agent 실행 시작", tone: "approve" },
  { agent: "마진 Agent", text: "수수료 차이로 마진이 역전된 상품 발견", meta: "가격 조정 검토 요청", tone: "report" },
  { agent: "Sprintable", text: "에이전트 4개 작업 조율 · 충돌 0건", meta: "위임 → 보고 → 승인 → 실행", tone: "done" },
];

const toneStyle: Record<FeedItem["tone"], { label: string; className: string }> = {
  done: { label: "완료", className: "text-signal bg-signal/10" },
  report: { label: "보고", className: "text-violet-300 bg-violet-500/15" },
  approve: { label: "승인됨", className: "text-white bg-white/15" },
};

const kpis = [
  { k: "거래액", v: "8,460만원", d: "+20.8%" },
  { k: "실질 마진", v: "18.4%", d: "+2.1%p" },
  { k: "광고 ROAS", v: "412%", d: "-6.3%" },
  { k: "품절 위험 SKU", v: "3개", d: "감지" },
];

function useFeedTick() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 2400);
    return () => window.clearInterval(id);
  }, []);
  return tick;
}

function AgentWorkspace() {
  const tick = useFeedTick();
  const visible = Array.from({ length: 3 }, (_, i) => {
    const index = (tick + i) % feed.length;
    return { ...feed[index], key: tick + i };
  }).reverse();

  return (
    <div className="relative w-full p-5 sm:p-8 lg:p-12 flex flex-col gap-5 text-white">
      <div className="flex items-center gap-3">
        <span className="pulse-dot w-2 h-2 rounded-full bg-signal" />
        <span className="text-sm font-semibold">스토어 운영 에이전트 팀</span>
        <span className="ml-auto text-xs text-zinc-500 font-mono hidden sm:inline">실시간 · 4개 Agent 실행 중</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.k} className="rounded-2xl bg-white/[0.06] border border-white/[0.06] p-4">
            <div className="text-xs text-zinc-400">{kpi.k}</div>
            <div className="text-xl sm:text-2xl font-bold mt-1 tracking-tight">{kpi.v}</div>
            <div className={`text-xs mt-1 ${kpi.d.startsWith("-") ? "text-red-400" : "text-signal"}`}>{kpi.d}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        <ul className="lg:col-span-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3 space-y-2 h-[264px] overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((item) => (
              <motion.li
                key={item.key}
                layout
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease }}
                className="rounded-xl bg-white/[0.04] px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-medium">{item.agent}</span>
                  <span className={`ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full ${toneStyle[item.tone].className}`}>
                    {toneStyle[item.tone].label}
                  </span>
                </div>
                <p className="text-[15px] mt-1 leading-snug font-medium">{item.text}</p>
                <p className="text-xs text-zinc-500 mt-0.5">↳ {item.meta}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="hidden lg:flex lg:col-span-2 rounded-2xl bg-white text-black p-6 flex-col">
          <span className="text-xs font-semibold text-violet-600">승인 요청 · 광고 Agent</span>
          <p className="text-lg font-bold leading-snug mt-3 tracking-tight">캠페인 B 예산 30%를 캠페인 A로 옮길까요?</p>
          <ul className="mt-4 space-y-1.5 text-sm text-zinc-600">
            <li>· 캠페인 B 전환율 3일 연속 하락</li>
            <li>· 캠페인 A ROAS 목표 대비 +38%</li>
            <li>· 예상 추가 마진 +120만원/주</li>
          </ul>
          <div className="mt-auto flex gap-2 pt-6">
            <span className="flex-1 text-center py-2.5 rounded-full border border-black/15 text-sm font-semibold">보류</span>
            <span className="flex-1 text-center py-2.5 rounded-full bg-black text-white text-sm font-semibold">승인</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  // 0 → 0.6 구간에서 카드가 화면 전체로 확장되고, 헤드라인은 위로 빠지며 사라진다.
  const expand = useTransform(scrollYProgress, (v) => Math.min(v / 0.6, 1));
  const clipPath = useTransform(expand, (t) => {
    const k = 1 - t;
    return `inset(${58 * k}% ${6 * k}% ${-2 * k}% ${6 * k}% round ${40 * k}px)`;
  });
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -160]);
  const titleOpacity = useTransform(scrollYProgress, (v) => 1 - Math.min(v / 0.3, 1));
  const innerScale = useTransform(scrollYProgress, [0, 0.6], [0.86, 1]);
  const innerY = useTransform(scrollYProgress, [0, 0.6], ["34%", "0%"]);
  const innerOpacity = useTransform(expand, (t) => 0.6 + 0.4 * t);
  const glowY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  return (
    <section id="top" ref={trackRef} className="relative bg-white h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0 bg-[#0B0B0F]">
          <motion.div aria-hidden style={{ y: glowY }} className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div
              className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[700px]"
              style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.38) 0%, transparent 65%)", filter: "blur(30px)" }}
            />
          </motion.div>
          <motion.div
            style={{ scale: innerScale, y: innerY, opacity: innerOpacity }}
            className="relative h-full max-w-6xl mx-auto flex items-center pt-16"
          >
            <AgentWorkspace />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 sm:pt-32"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 px-4 py-1.5 rounded-full bg-zinc-100"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
            Agent Commerce
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="hero-title text-black mt-5"
          >
            에이전트가 일하는{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-lime-500 bg-clip-text text-transparent">커머스</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-5 text-lg sm:text-xl text-zinc-500 leading-relaxed"
          >
            셀러는 결정하고, 에이전트는 실행합니다.
            <br className="hidden sm:block" /> 정산부터 마진, 광고, 재고까지 장사왕과 Sprintable이 맡습니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a href="#contact" className="px-7 py-3.5 rounded-full text-[15px] font-semibold text-white bg-black hover:bg-zinc-800 transition-colors">
              도입 상담하기
            </a>
            <a href="#products" className="px-7 py-3.5 rounded-full text-[15px] font-semibold text-black bg-zinc-100 hover:bg-zinc-200 transition-colors">
              제품 살펴보기
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
