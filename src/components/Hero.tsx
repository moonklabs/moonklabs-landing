"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import AgentMascot from "@/components/AgentMascot";

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
  report: { label: "보고", className: "text-peach bg-peach/15" },
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

        <div className="hidden lg:flex lg:col-span-2 rounded-2xl bg-cream text-ink p-6 flex-col">
          <div className="flex items-center gap-2.5">
            <AgentMascot still className="w-10 h-10 shrink-0" />
            <div className="leading-tight">
              <span className="block text-xs font-semibold text-violet-700">광고 Agent의 제안</span>
              <span className="block text-[11px] text-zinc-500">방금 전 · 승인 대기</span>
            </div>
          </div>
          <p className="text-lg font-bold leading-snug mt-4 tracking-tight">캠페인 B 예산 30%를 캠페인 A로 옮겨도 될까요?</p>
          <ul className="mt-4 space-y-1.5 text-sm text-zinc-600">
            <li>· 캠페인 B 전환율 3일 연속 하락</li>
            <li>· 캠페인 A ROAS 목표 대비 +38%</li>
            <li>· 예상 추가 마진 +120만원/주</li>
          </ul>
          <div className="mt-auto flex gap-2 pt-6">
            <span className="flex-1 text-center py-2.5 rounded-full border border-black/15 bg-white text-sm font-semibold">보류</span>
            <span className="flex-1 text-center py-2.5 rounded-full bg-ink text-white text-sm font-semibold">승인</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const CARD_GAP = 28;
const INNER_START_SCALE = 0.86;

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  // 0 → 0.6 구간에서 카드가 화면 전체로 확장되고, 헤드라인은 위로 빠지며 사라진다.
  const expand = useTransform(scrollYProgress, (v) => Math.min(v / 0.6, 1));

  // 카드의 시작 위치는 헤드라인 블록(버튼 포함) 바로 아래로 잡는다.
  // 화면이 작아 헤드라인이 길어져도 카드가 버튼을 덮지 않도록 실제 높이를 잰다.
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardTop = useMotionValue(-1);
  const contentShift = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      const sticky = stickyRef.current;
      const title = titleRef.current;
      const content = contentRef.current;
      if (!sticky || !title || !content) return;
      const viewport = sticky.clientHeight;
      const top = Math.min(title.offsetTop + title.offsetHeight + CARD_GAP, viewport - 24);
      cardTop.set(top);
      contentShift.set(top - content.offsetTop * INNER_START_SCALE);
    };
    measure();
    // 마운트 직후에는 motion 요소가 아직 값을 구독하지 않았을 수 있어, 다음 프레임에 한 번 더 알린다.
    const frame = requestAnimationFrame(() => {
      cardTop.set(-1);
      contentShift.set(0);
      measure();
    });
    const observer = new ResizeObserver(measure);
    if (stickyRef.current) observer.observe(stickyRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [cardTop, contentShift]);

  const clipPath = useTransform([expand, cardTop], ([t, top]: number[]) => {
    const k = 1 - t;
    const topInset = top < 0 ? `${58 * k}%` : `${top * k}px`;
    return `inset(${topInset} ${6 * k}% ${-2 * k}% ${6 * k}% round ${40 * k}px)`;
  });
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -160]);
  const titleOpacity = useTransform(scrollYProgress, (v) => 1 - Math.min(v / 0.3, 1));
  const innerScale = useTransform(expand, (t) => INNER_START_SCALE + (1 - INNER_START_SCALE) * t);
  const innerY = useTransform([expand, contentShift], ([t, shift]: number[]) => shift * (1 - t));
  const innerOpacity = useTransform(expand, (t) => 0.6 + 0.4 * t);
  const glowY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  return (
    <section id="top" ref={trackRef} className="relative bg-cream h-[260vh]">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0 bg-[#1E1814]">
          <motion.div aria-hidden style={{ y: glowY }} className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div
              className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[700px]"
              style={{ background: "radial-gradient(ellipse at 35% 40%, rgba(248,185,160,0.28) 0%, transparent 60%), radial-gradient(ellipse at 70% 55%, rgba(124,58,237,0.32) 0%, transparent 65%)", filter: "blur(30px)" }}
            />
          </motion.div>
          <motion.div
            style={{ scale: innerScale, y: innerY, opacity: innerOpacity, transformOrigin: "50% 0%" }}
            className="relative h-full max-w-6xl mx-auto flex items-start lg:items-center pt-16"
          >
            <div ref={contentRef} className="w-full">
              <AgentWorkspace />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={titleRef}
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20 sm:pt-32"
        >
          <div aria-hidden className="pointer-events-none absolute right-3 top-[68px] w-14 sm:right-8 sm:top-24 sm:w-20 lg:right-2 lg:top-28 lg:w-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease }}
            >
              <AgentMascot />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            aria-hidden
            className="pointer-events-none absolute right-[8.5rem] top-[4.5rem] hidden lg:block rounded-2xl rounded-br-sm bg-white px-4 py-2 text-sm font-medium text-ink shadow-[0_8px_24px_-12px_rgba(60,40,10,0.35)] border border-black/5"
          >
            오늘도 제가 먼저 볼게요
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 px-4 py-1.5 rounded-full bg-white border border-black/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
            Agent Commerce
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="hero-title text-ink mt-5"
          >
            일은 에이전트가,
            <br />
            결정은{" "}
            <span className="relative inline-block text-violet-700">
              사장님
              <svg aria-hidden viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute left-0 right-0 -bottom-[0.12em] h-[0.28em] w-full overflow-visible">
                <motion.path
                  d="M3 9C40 3 90 12 197 4"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.9, duration: 0.7, ease }}
                />
              </svg>
            </span>
            이.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 sm:mt-5 text-base sm:text-xl text-zinc-600 leading-relaxed"
          >
            정산·마진·광고·재고를 에이전트가 먼저 살피고 근거와 함께 보고합니다.
            <br /> 돈이 움직이는 결정은 언제나 사장님의 몫이에요.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3"
          >
            <a href="#contact" className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-[15px] font-semibold text-white bg-ink hover:bg-zinc-800 transition-colors">
              도입 상담하기
            </a>
            <a href="#products" className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-[15px] font-semibold text-ink bg-white border border-black/10 hover:bg-white/60 transition-colors">
              제품 살펴보기
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
